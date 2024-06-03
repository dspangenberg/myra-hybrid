<template>
  <label class="block font-medium text-sm text-gray-700 mb-1">
    <slot>{{ label }}</slot>
  </label>
</template>
<script setup>
defineProps({
  label: {
    type: String,
    default: ''
  }
})
</script>
