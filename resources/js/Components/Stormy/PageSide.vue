<template>
  <div>
    <div
      v-if="title"
      class="text-xs font-medium px-3.5 py-1 text-gray-500"
    >
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div
      class="flex-0 border-gray-200 bg-white/40 z-10 text-xxs space-y-2 divide-y rounded-md shadow  content-between max-h-fit py-2 border-t"
    >
      <slot />
    </div>
  </div>
</template>
<script setup>
import { useProp } from '@/composables/useProp.js'

defineProps({
  title: useProp(String)
})
</script>
