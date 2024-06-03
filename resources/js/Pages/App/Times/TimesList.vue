<template>
  <template
    v-for="(value, key) in data"
    :key="key"
  >
    <TimesListGroup
      :ts="key"
      :items="value"
    />
  </template>
  <div class="h-6" />
</template>

<script setup>
import TimesListGroup from './TimesListGroup.vue'

defineProps({
  data: {
    type: Object,
    default: () => {}
  },
  meta: {
    type: Object,
    default: () => {}
  }
})
</script>
