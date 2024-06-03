<template>
  <button
    v-tooltip:bottom.tooltip="tooltip"
    type="button"
    class="bg-transparent h-9 w-9 hover:bg-stone-400 rounded hover:text-gray-500 focus:z-10 focus:outline-none focus:ring-1 focus:border-blue-500"
  >
    <span class="sr-only">{{ tooltip }}</span>
    <stormy-icon
      v-if="icon"
      :stroke-width="strokeWidth"
      :name="icon"
      :class="svgClass"
      class="mx-auto"
    />
  </button>
</template>
<script setup>
defineProps({
  tooltip: { type: String, default: '' },
  icon: { type: String, default: '' },
  color: { type: String, default: 'red' },
  current: { type: Boolean, default: false },
  strokeWidth: { type: Number, default: 1 },
  open: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  animate: { type: Boolean, default: false },
  svgClass: { type: String, default: 'h-7 w-7 text-stone-400' },
  count: { type: String, default: '' }
})
</script>
