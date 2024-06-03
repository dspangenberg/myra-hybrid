<template>
  <span>
    <slot />
    <pre>
      {{ hasContent }}
    </pre>
  </span>
</template>

<script setup>
import { computed, useSlots, Comment } from 'vue'

const hasContent = computed(() => {
  if ($slots.default) {
    const items = $slots.default() // .find(item => item.type !== Comment)
    console.log(items)
    return items.count
  }
  return true
})

const $slots = useSlots()
</script>
