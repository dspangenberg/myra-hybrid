<template>
  <div
    :class="
      [
        isActive ? ' border-blue-500 hover:border-blue-600 hover:text-blue-600 text-blue-500 font-bold' : 'border-transparent font-medium hover:border-gray-400 text-gray-400',
        disabled ? 'text-gray-300 cursor-not-allowed hover:border-transparent' : 'cursor-pointer'
      ]"
    class="border-b-2 pb-1 flex items-center"
    @click="changed"
  >
    <slot>
      <span>
        {{ label }}
      </span>
    </slot>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'

const selectedPivot = inject('selectedPivot', null)
const setPivot = inject('setPivot')

const changed = () => {
  if (!props.disabled) {
    setPivot(props.name)
  }
}

const isActive = computed(() => props.name === selectedPivot.value)

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  counter: {
    type: Number,
    default: 0
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>
