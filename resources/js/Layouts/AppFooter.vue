<template>
  <div class="text-xs py-2 px-4 text-gray-500 flex justify-between">
    <div>
      <span class="font-medium">
        twiceware/myra
      </span>
      &mdash; Copyright © 2005-{{ currentYear }} by twiceware solutions e. K.
    </div>
    <div class="hidden">
      <span class="bg-red-500" />
      <span class="bg-green-500" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => {
  return new Date().getFullYear()
})

</script>
