<template>
  <label class="block">
    <p
      v-if="$slots.default || label"
      class="block text-sm font-medium text-gray-600 mb-1"
    >
      <slot>
        {{ label }}
      </slot>
    </p>
    <div class="flex">
      <div
        v-if="$slots.prefix"
        :class="[
          'flex-none rounded-l-form bg-gray-50 border-l border-t border-b border-gray-300 px-2 text-gray-800 leading-tight dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400',
          {
            // size
            'py-1': size === 'sm',
            'py-2': size === 'base',
          }
        ]"
      >
        <slot name="prefix" />
      </div>

      <div class="relative flex-grow">
        <span
          v-if="$slots.icon"
          class="flex items-center w-5 h-5 text-gray-500 absolute my-auto ml-2 inset-y-0 left-0"
          :class="[{
            'mr-1': $slots.default && !props.iconRight,
            'ml-1': $slots.default && props.iconRight,
          }]"
        >
          <slot name="icon" />
        </span>

        <input
          ref="input"
          class="w-full text-sm font-regular placeholder-gray-400 border border-gray-300 rounded py-1.5 px-1.5 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          :autocomplete="autocomplete"
          :class="[
            $slots.icon ? 'pl-8' : 'pl-2',
            disabled ? 'bg-gray-200 dark:bg-gray-800 cursor-not-allowed' : 'bg-white dark:bg-gray-900',
            type === 'password' ? 'pr-8' : 'pr-2',
            {
              // size
              'py-1': size === 'sm',
              'py-2': size === 'base',
              // status
              'border-gray-300 dark:border-gray-700': !status,
              'border-danger-500': status === 'error',
              'border-success-500': status === 'success',
              // focus
              'focus:border-primary-500 dark:focus:border-primary-500': !readonly,
              // suffix and prefix
              'rounded-l-form': !$slots.prefix,
              'rounded-r-form': !$slots.suffix,
            }
          ]"
          :disabled="disabled"
          :max="max"
          :maxlength="maxlength"
          :min="min"
          :minlength="minlength"
          :name="name"
          :placeholder="placeholder"
          :readonly="readonly"
          :type="type"
          :value="attrs.modelValue"
          v-bind="attrs"
          @input="$emit('update:modelValue', $event.target.value)"
        >

        <template
          v-if="toggleIcon && type === 'password'"
        >
          <stormy-icon
            :stroke="1"
            :name="currentType === 'password' ? 'eye' : 'eye-off'"
            class="text-gray-600 dark:text-gray-300 w-5 h-5 absolute my-auto mr-2 inset-y-0 right-0 cursor-pointer"
            @click="togglePasswordVisibility"
          />
        </template>
      </div>

      <div
        v-if="$slots.suffix"
        :class="[
          'flex-none rounded-r-form bg-gray-50 border-t border-r border-b border-gray-300 px-2 text-gray-600 leading-tight dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400',
          {
            // size
            'py-1': size === 'sm',
            'py-2': size === 'base',
          }
        ]"
      >
        <slot name="suffix" />
      </div>
    </div>

    <p
      v-if="$slots.error"
      class="text-sm text-danger-500 mt-1"
    >
      <slot name="error" />
    </p>

    <p
      v-if="$slots.success"
      class="text-sm text-success-500 mt-1"
    >
      <slot name="success" />
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
  toggleIcon: {
    default: false,
    type: Boolean
  },
  max: {
    type: Number,
    default: null
  },
  maxlength: {
    type: Number,
    default: null
  },
  min: {
    type: Number,
    default: null
  },
  minlength: {
    type: Number,
    default: null
  },
  name: {
    type: String,
    default: null
  },
  autocomplete: {
    type: String,
    default: 'off'
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
  status: {
    default: null,
    type: String,
    validator: (value) => ['error', 'success'].includes(value)
  },
  type: {
    type: String,
    default: 'text'
  },
  value: {
    type: [String, Number],
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
    input: (event) => emit('input', event.target.value)
  }
})

const currentType = ref('password')
const input = ref()

const togglePasswordVisibility = () => {
  currentType.value = currentType.value === 'password' ? 'text' : 'password'
  input.value.setAttribute('type', currentType.value)
}

</script>
