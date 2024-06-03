<template>
  <label class="block">
    <p
      v-if="label || $slots.label"
      class="block text-sm font-medium text-gray-600 mb-1"
    >
      <slot name="label">
        {{ label }}
      </slot>
    </p>

    <div class="relative">
      <select
        class="appearance-none text-gray-800 w-full text-sm font-regular placeholder-gray-400 border border-gray-300 rounded py-1.5 px-1.5 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none"
        :class="[
          disabled
            ? 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 cursor-not-allowed'
            : 'bg-white dark:bg-gray-900',
          readonly ? 'pointer-events-none' : 'focus:border-primary-500 dark:focus:border-primary-500',
          size === 'sm' ? 'py-1 pl-2' : 'py-2 pl-2',
          {
            'text-gray-400 dark:text-gray-500': value === '' || value === null,
          },
        ]"
        :disabled="disabled"
        :name="name"
        :value="attrs.modelValue"
        v-bind="attrs"
        v-on="listeners"
      >
        <option
          v-if="placeholder"
          disabled
          value=""
        >
          {{ placeholder }}
        </option>
        <slot />
      </select>

    </div>

    <p
      v-if="$slots.error"
      class="text-sm text-danger-500 mt-1"
    >
      <slot name="error" />
    </p>
  </label>
</template>

<script setup>
import { computed, useAttrs, useSlots, ref } from 'vue'

const props = defineProps({
  disabled: {
    default: false,
    type: Boolean
  },
  name: {
    type: String,
    default: null
  },
  label: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: null
  },
  readonly: {
    type: Boolean,
    default: null
  },
  size: {
    default: 'base',
    type: String,
    validator: (value) => ['sm', 'base'].includes(value)
  },
  value: {
    type: [String, Number, Boolean, Object, Array, Function, Date],
    default: null
  }
})

const emit = defineEmits(['blur', 'focus', 'input', 'update:modelValue', 'click'])
const attrs = useAttrs()
const $slots = useSlots()

const listeners = computed(() => {
  return {
    // Ensure that the component works with v-model
    blur: (event) => emit('blur', event),
    focus: (event) => emit('focus', event),
    input: (event) => emit('update:modelValue', event.target.value)
  }
})

const currentType = ref('password')
const input = ref()

</script>
