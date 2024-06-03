<template>
  <stormy-page-layout title="Zeiten">
    <template #header-left>
      <div class="flex-1 items-center flex">
        <div class="font-bold text-lg text-gray-700 leading-none">
          Zeiten
        </div>
      </div>
    </template>
    <template #header-right>
      <div class="inline-flex space-x-1">
        <stormy-icon-button
          href="/times/add"
          icon="tabler-icon-circle-plus"
          variant="primary"
        />
        <stormy-icon-button
          :href="printLink"
          as="a"
          icon="tabler-icon-printer"
          variant="solid"
          target="_blank"
        />
        <stormy-icon-button
          icon="tabler-icon-dots"
          variant="ghost"
        />
      </div>
    </template>
    <template #header-pivot>
      <stormy-pivot
        v-model="pivot"
        first-item="week"
      >
        <stormy-pivot-item
          name="week"
        >
          Meine Woche
        </stormy-pivot-item>

        <stormy-pivot-item name="open">
          Nicht abgerechnete
        </stormy-pivot-item>

        <stormy-pivot-item name="all">
          Alle
        </stormy-pivot-item>

        <stormy-pivot-item name="billed">
          Abgerechnet
        </stormy-pivot-item>

        <stormy-pivot-item name="not-billable">
          Nicht abrechenbar
        </stormy-pivot-item>
      </stormy-pivot>
    </template>
    <template #full-section>
      <div class="block w-full">
        <div class="flex items-center w-full">
          <stormy-week-select v-model="start" />
          <div class="m-1 space-x-1 inline-flex">
            <stormy-icon-button
              icon="tabler-icon-filter"
              variant="ghost"
            />
          </div>
        </div>
      </div>
    </template>

    <template #default>
      <div class="bg-white text-sm shadow rounded border-t w-ful !print:text-black print:shadow-none print:border-0 mx-1 mb-6">
        <form @submit.prevent="filter">
          <div class="px-6 py-3 grid grid-cols-12 gap-x-3">
            <div class="col-span-3">
              <jet-select
                v-model="form.contact_id"
                :options="accounts"
                options-name="fullNameR"
                label="Account"
              />
            </div>
            <div class="col-span-3">
              <jet-select
                v-model="form.project_id"
                :options="filtedProjects"
                label="Projekt"
              />
            </div>
            <div class="col-span-2">
              <jet-select
                v-model="form.status"
                :options="timeStatus"
                label="Status"
              />
            </div>
            <div class="col-span-2">
              <stormy-date-picker
                v-model="form.beginAt"
                label="Start"
                autofocus
              />
            </div>
            <div class="col-span-2">
              <stormy-date-picker
                v-model="form.endAt"
                label="Ende"
                autofocus
              />
            </div>
          </div>
          <div class="px-6 py-3">
            <Link
              as="Button"
              :href="filterLink"
            >
              Filtern
            </Link>
          </div>
        </form>
      </div>
      <div class="inline-flex w-full space-x-3 px-1 mb-6">
        <div class="bg-white grid shadow rounded grid-cols-8 divide-x w-2/3 !print:text-black print:shadow-none print:border-0">
          <div
            v-for="(day, index) in days"
            :key="day"
            class="py-1"
          >
            <div class="text-sm text-gray-700 text-center py-1 font-bold">
              {{ getDay(index) }}
            </div>
            <div class="text-xs text-gray-400 text-center py-1 px-1">
              {{ day }}
            </div>
          </div>
          <div
            class="py-1 bg-orange-50 rounded-r"
          >
            <div class="text-sm text-gray-700 text-center py-1 font-bold">
              {{ getDay(7) }}
            </div>
            <div class="text-xs text-gray-500 text-center py-1 px-1">
              Woche
            </div>
          </div>
        </div>
      </div>
      <div class="py-6">
        <TimesList
          :data="groupedTimes"
        />
      </div>
    </template>
  </stormy-page-layout>
</template>

<script setup>
import { ref, provide, computed, reactive } from 'vue'
import { useForm, usePage } from '@inertiajs/inertia-vue3'
import TimesList from './Times/TimesList.vue'
import { useTemplateFilter } from '@/composables/useTemplateFilter.js'
import { filter, fromPairs, sumBy } from 'lodash'
import { DateTime } from 'luxon'

const { formatDuration } = useTemplateFilter()
const projects = reactive(usePage().props.value.projects)
const accounts = reactive(usePage().props.value.accounts)
const filters = reactive(usePage().props.value.filters)

const filtedProjects = computed(() => {
  if (form.contact_id) {
    return projects.filter(item => item.owner_contact_id === form.contact_id)
  }
  return projects
})

const pivot = ref()

const days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

const timeStatus = ref([
  {
    id: 1,
    name: 'offen',
    code: 'open'
  },
  {
    id: 2,
    code: 'invoiced',
    name: 'abgerechnet'
  },
  {
    id: 3,
    code: 'notBillable',
    name: 'nicht abrechenbar'
  },
  {
    id: 4,
    code: 'locked',
    name: 'gesperrt'
  }
])

const getDay = (index) => {
  if (index === 7) return formatDuration(sumBy(props.weekdaysTime, 'mins')) || '0:00'
  const day = props.weekdaysTime.find(item => item.day === index)
  if (day && day.mins) {
    return formatDuration(day.mins)
  }
  return '0:00'
}

const statusCode = computed(() => {
  if (filters.status) {
    const item = timeStatus.value.find(item => item.code === filters.status)
    return item.id
  }
  return ''
})

const form = useForm({
  user_id: filters.user_id || 0,
  project_id: filters.project_id || 0,
  time_category_id: filters.time_category_id || 0,
  contact_id: filters.contact_id || 0,
  status: statusCode.value || 0,
  beginAt: filters.beginAt || '',
  endAt: filters.endAt || ''
})
provide('form', form)

const params = computed(() => {
  const { project_id: projectId, status, contact_id: contactId } = form
  const filters = []

  const item = timeStatus.value.find(item => item.id === status)
  const statusCode = item ? item.code : 0

  if (form.beginAt) filters.push(`beginAt=${form.beginAt}`)
  if (form.endAt) filters.push(`endAt=${form.endAt}`)

  if (projectId) filters.push(`project_id=${projectId}`)
  if (statusCode) filters.push(`status=${statusCode}`)
  if (contactId) filters.push(`contact_id=${contactId}`)

  if (!form.beginAt && !form.endAt) {
    filters.push(`year=${start.value.weekYear}`)
    filters.push(`week=${start.value.weekNumber}`)
  }
  return filters
})

const filterLink = computed(() => {
  return `/times/?${params.value.join('&')}`
})

const printLink = computed(() => {
  return `/times/print?${params.value.join('&')}`
})

const props = defineProps({
  groupedTimes: {
    type: Object,
    default: () => {}
  },
  weekdaysTime: {
    type: Array,
    default: () => []
  },
  openTimes: {
    type: Array,
    default: () => []
  },
  startDate: {
    type: [Object, String],
    default: ''
  },
  meta: {
    type: Object,
    default: () => {}
  }
})

const start = ref(DateTime.fromISO(props.startDate))
</script>

<style></style>
