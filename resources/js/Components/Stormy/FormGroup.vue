<template>
  <div
    class="px-6 py-3 last:pb-0 first:pt-0"
    :class="[ withBorder ? 'border-t border-stone-100' : '', grid ? 'grid grid-cols-24 gap-x-3 gap-y-4 ' : '']"
  >
    <slot />
  </div>
</template>
<script setup>
defineProps({
  withBorder: {
    type: Boolean,
    default: false
  },
  grid: {
    type: Boolean,
    default: true
  }
})
</script>
