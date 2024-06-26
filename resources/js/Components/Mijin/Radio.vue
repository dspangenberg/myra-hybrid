<template>
  <div class="inline-flex items-center">
    <div>
      <input
        :id="id"
        v-model="modelValue"
        type="radio"
        :disabled="disabled"
        :name="name"
        :required="required"
        :value="value"
        class="focus-within:border-blue-400 focus-within:ring-2 border-gray-300 focus-within:ring-blue-200 focus-within:outline-none w-3 h-3"
      >
    </div>
    <div>
      <label
        :for="id"
        class="ml-1 text-sm leading-none text-gray-700 mr-2 border-transparent"
      >
        {{ label }}
      </label>
    </div>
  </div>
</template>
<script setup>
import { computed, useAttrs, useSlots, nextTick } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  bordered: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  label: {
    type: [String, Number, Boolean],
    default: ''
  },
  id: {
    type: String,
    default: null
  },
  options: {
    type: [String, Number, Boolean, Function, Object, Array],
    default: null
  },
  required: {
    type: Boolean,
    default: false
  },
  value: {
    type: [String, Number, Boolean, Function, Object, Array],
    default: null
  }
})

const emit = defineEmits(['blur', 'focus', 'change', 'update:modelValue'])

const handleChange = () => {
  nextTick(() => emit('change', modelValue.value))
}

const attrs = useAttrs()
const $slots = useSlots()
const checked = computed(() => props.modelValue === props.value)

const modelValue = computed({
  get () {
    return props.modelValue
  },
  set (val) {
    emit('update:modelValue', val)
  }
})

</script>
