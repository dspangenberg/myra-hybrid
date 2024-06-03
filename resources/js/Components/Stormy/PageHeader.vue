<template>
  <div class="flex-1 flex flex-col justify-between px-1 min-h-34 max-h-34">
    <div class="flex-grow flex justify-self-center items-center justify-between py-6">
      <slot name="left" />
      <div class="print-hidden">
        <slot name="right" />
      </div>
    </div>
    <div
      v-if="hasPivot"
      class="justify-self-end flex-shrink max-h-6 select-none print-hidden print:hidden"
    >
      <slot name="pivot" />
    </div>
  </div>
</template>
<script setup>
import { computed, useSlots } from 'vue'

const $slots = useSlots()
const hasPivot = computed(() => $slots.pivot)

</script>
