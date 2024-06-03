<template>
  <div class="text-sm w-full flex space-x-6 v">
    <slot />
  </div>
</template>

<script setup>
import { computed, provide, ref } from 'vue'

const emit = defineEmits(['update:modelValue'])

const selected = ref()

selected.value = computed(() => props.modelValue ? props.modelValue : props.firstItem)

const setPivot = (name) => {
  emit('update:modelValue', name)
}

provide('selectedPivot', selected.value)
provide('setPivot', setPivot)

const props = defineProps({
  firstItem: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    default: ''
  }
})
</script>
