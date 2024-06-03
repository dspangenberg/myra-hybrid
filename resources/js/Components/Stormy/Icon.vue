<template>
  <svg
    :class="$attrs.class"
    aria-hidden="true"
  >
    <use
      :xlink:href="symbolId"
      :stroke-width="strokeWidth"
    />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  strokeWidth: {
    type: Number,
    default: 1.5
  },
  name: {
    type: String,
    required: true
  },
  fill: {
    type: Boolean,
    default: false
  }
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)

</script>
