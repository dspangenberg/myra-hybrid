<template>
  <div class="block">
    <div class="flex w-fit justify-between items-center my-1 overflow-hidden border-gray-200 rounded-md  dark:bg-gray-700 dark:border-gray-600">
      <div class="m-1">
        <stormy-icon-button
          :href="prevLink"
          icon="tabler-icon-chevron-left"
          variant="ghost"
        />
      </div>
      <div
        class="flex items-center px-0.5 text-sm leading-none font-bold text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:text-gray-50"
      >
        {{ formatedStartOfWeek }} - {{ formatedEndOfWeek }}
      </div>
      <div class="m-1">
        <stormy-icon-button
          :href="nextLink"
          :disabled="!canNext"
          icon="tabler-icon-chevron-right"
          variant="ghost"
        />
      </div>
      <div class="m-1">
        <stormy-icon-button
          :href="thisWeekLink"
          icon="tabler-icon-calendar"
          variant="ghost"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { useProp } from '@/composables/useProp.js'
import { toRefs, computed } from 'vue'
import { DateTime } from 'luxon'

const props = defineProps({
  modelValue: {
    type: Object,
    default: DateTime.now()
  },
  format: useProp(String, 'dd. MMM yyyy'),
  nextMode: useProp(String, 'day')
})

const { modelValue } = toRefs(props)

const startOfWeek = computed(() => modelValue.value.startOf('week'))
const endOfWeek = computed(() => modelValue.value.endOf('week'))
const week = computed(() => modelValue.value.weekNumber)
const year = computed(() => modelValue.value.year)

const formatedStartOfWeek = computed(() => startOfWeek.value.setLocale('de').toFormat(props.format))
const formatedEndOfWeek = computed(() => endOfWeek.value.setLocale('de').toFormat(props.format))

const thisWeekLink = computed(() => {
  const today = DateTime.now()
  return `/times?year=${today.weekYear}&week=${today.weekNumber}`
})

const canNext = computed(() => {
  const today = DateTime.now()
  if (today.year === year.value && today.weekNumber <= week.value) {
    return false
  }
  return true
})

const nextLink = computed(() => {
  const nextWeek = endOfWeek.value.plus(7, 'days')
  return `/times?year=${nextWeek.weekYear}&week=${nextWeek.weekNumber}`
})

const prevLink = computed(() => {
  const prevWeek = startOfWeek.value.minus(7, 'days')
  return `/times?year=${prevWeek.weekYear}&week=${prevWeek.weekNumber}`
})

</script>
