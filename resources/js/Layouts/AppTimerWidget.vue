<template>
  <div class="space-x-1 flex rounded p-1 border">
    <div class="w-30 ">
      <div class="flex w-16 items-center text-center h-full px-2 mx-auto  font-bold text-sm text-gray-900">
        {{ runningDuration }}
      </div>
    </div>
    <stormy-icon-button
      icon="tabler-icon-player-stop"
      variant="solid"
      size="sm"
    />
    <stormy-icon-button
      icon="tabler-icon-dots-vertical"
      variant="solid"
      size="sm"
    />
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { Duration, DateTime } from 'luxon'
import { useTimestamp } from '@vueuse/core'
import { useProp } from '@/composables/useProp.js'

const { timestamp } = useTimestamp({ controls: true, interval: 1000 })

const now = computed(() => {
  return DateTime.fromMillis(timestamp.value)
})

const runningDuration = computed(() => {
  if (props.timer.end_at) return null

  const start = DateTime.fromFormat(props.timer.begin_at, 'dd.MM.yyyy HH:mm')
  const diffInMinutes = now.value.diff(start, 'minute').minutes
  const duration = Duration.fromObject({ minutes: diffInMinutes })
  return duration.toFormat('hh:mm:ss')
})

const props = defineProps({
  timer: useProp(Object)
})
</script>
