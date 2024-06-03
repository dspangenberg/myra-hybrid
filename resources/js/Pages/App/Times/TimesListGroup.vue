<template>
  <div>
    <div class=" text-sm text-blue-400 py-1.5 font-semibold !print:text-black print:shadow-none print:border-0">
      <div class="flex items-center px-4 sm:px-6 ">
        <div class="min-w-0 flex-1 flex items-center">
          <div class="flex-shrink-0 w-8" />
          <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4 items-center">
            <div>
              <p
                class="text-sm font-bold text-gray-500 truncate"
              >
                {{ date }}
              </p>
            </div>
          </div>
        </div>
        <div class="text-sm text-right mr-10 text-gray-500 font-semibold ">
          {{ sum }}
        </div>
      </div>
    </div>
    <stormy-list-box class="mb-6 !print:text-black print:shadow-none print:border-0">
      <template
        v-for="time of items"
        :key="time.id"
      >
        <TimesListItem :time="time" />
      </template>
    </stormy-list-box>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { DateTime, Duration } from 'luxon'
import TimesListItem from './TimesListItem.vue'
import { sumBy } from 'lodash'

const date = computed(() => {
  const d = DateTime.fromISO(props.ts).setLocale('de')
  return d.toFormat('ccc dd. MMM yyyy')
})

const sum = computed(() => {
  const sum = sumBy(props.items, 'mins')
  const dur = Duration.fromObject({ minutes: sum })
  return dur.toFormat('hh:mm')
})

const props = defineProps({
  ts: {
    type: String,
    default: ''
  },
  items: {
    type: Array,
    default: () => []
  }
})
</script>
