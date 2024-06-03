<template>
  <li
    class="hover:bg-blue-50 border-transparent border-t hover:first:rounded-t-md !print:text-black"
  >
    <Link
      :href="link"
      preserve-state
      class="block "
    >
      <div class="flex items-center px-4 py-4 sm:px-6 ">
        <div class="min-w-0 flex-1 flex items-center">
          <div class="flex-shrink-">
            <template v-if="isRunning">
              <StatusDot
                :animate="true"
                :size="2"
                color="red"
                class=""
              />
            </template>
            <template v-else>
              <stormy-icon
                v-if="time.is_locked"
                :stroke-width="1"
                name="tabler-icon-alert-circle"
                class="h-7 w-7 text-red-600"
              />
              <stormy-icon
                v-if="!time.is_billable"
                :stroke-width="1"
                name="tabler-icon-circle-off"
                class="h-7 w-7 text-gray-200"
              />
              <template v-else>
                <stormy-icon
                  v-if="time.invoice_id"
                  :stroke-width="1"
                  name="tabler-icon-circle-check"
                  class="h-7 w-7 text-green-600"
                />
                <stormy-icon
                  v-else
                  :stroke-width="1"
                  name="tabler-icon-circle-dot"
                  class="h-7 w-7 text-gray-300"
                />
              </template>
            </template>
          </div>
          <div class="flex min-w-0 flex-1 px-4 md:gap-4 items-center ">
            <div class="w-36">
              <p
                class="text-sm font-semibold text-gray-600 truncate !print:text-black "
              >
                {{ begin }} - {{ end }}
              </p>
              <p
                class="flex mt-1 items-center font-medium text-xs text-gray-500 !print:text-black"
              >
                <span class="truncate">{{ time.category?.name }}</span>
              </p>
            </div>
            <div class="hidden flex-1 md:block text-sm leading-snug w-96">
              <p
                class="text-sm font-semibold text-gray-600 truncate !print:text-black"
              >
                {{ time.project?.name }}
              </p>
              <p
                class="flex mt-1 items-center text-xs text-gray-400 leading-1 print:text-black "
              >
                <span class="truncate print:text-black print:whitespace-normal print:break-words print:text-clip">{{ time.note }}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="flex-shrink-0 flex items-center">
          <div class="mx-6">
            <img
              class="h-5 w-5 rounded-full border"
              :src="getImageUrl('media/ds.jpg')"
              alt=""
            >
          </div>
          <div class="text-right text-sm font-semibold text-gray-600 px-2 w-16">
            <span
              v-if="isRunning"
              class=" text-red-500 "
            >
              {{ runningDuration }}
            </span>
            <span v-else>
              {{ duration }}
            </span>
          </div>
        </div>
        <div class=" items-center pl-2">
          <div>
            <ChevronRightIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </Link>
  </li>
</template>
<script setup>
import { computed, ref } from 'vue'
import { ChevronRightIcon } from '@heroicons/vue/solid'
import { Duration, DateTime, Interval } from 'luxon'
import { useTimestamp } from '@vueuse/core'

import { useTemplateFilter } from '@/composables/useTemplateFilter.js'

const { timestamp, pause, resume } = useTimestamp({ controls: true, interval: 1000 })
const { getImageUrl } = useTemplateFilter()

const link = computed(() => `/times/${props.time.id}`)

const begin = computed(() => {
  return props.time.begin_at.substr(11, 5)
})

const now = computed(() => {
  return DateTime.fromMillis(timestamp.value)
})

const isRunning = computed(() => !props.time.end_at)

const runningDuration = computed(() => {
  if (props.time.end_at) return null

  const start = DateTime.fromFormat(props.time.begin_at, 'dd.MM.yyyy HH:mm')
  const diffInMinutes = now.value.diff(start, 'minute').minutes
  const duration = Duration.fromObject({ minutes: diffInMinutes })
  return duration.toFormat('hh:mm:ss')
})

const end = computed(() => {
  if (!props.time.end_at) return ''
  return props.time.end_at.substr(11, 5)
})

const duration = computed(() => {
  const dur = Duration.fromObject({ minutes: props.time.mins })
  return dur.toFormat('hh:mm')
})

const props = defineProps({
  time: {
    type: Object,
    default: () => {}
  }
})

const time = ref(props.time)
</script>
