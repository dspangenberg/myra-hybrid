<template>
  <div>
    <jet-label
      :label="label"
    />
    <select
      :value="modelValue"
      :disabled="disabled"
      :class="[disabled ? 'bg-gray-50' : 'bg-white', label ? 'mt-0.5' : '']"
      class="truncate pr-6 appearance-none w-full text-sm font-regular placeholder-gray-400 border border-gray-300 rounded py-1.5 px-1.5 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none"
      @input="$emit('update:modelValue', parseInt($event.target.value))"
    >
      <option :value="defaultValue">
        ({{ label }})
      </option>
      <option
        v-for="(item, index) in options"
        :key="index"
        :value="item[optionsValue]"
        :selected="item[optionsValue] == modelValue"
      >
        {{ item[optionsName] }}
      </option>
    </select>
  </div>
</template>
<script setup>
import { useProp } from '@/composables/useProp.js'
defineEmits(['update:modelValue'])

defineProps({
  modelValue: useProp([String, Number]),
  label: useProp(String),
  disabled: useProp(Boolean),
  code: useProp(String),
  optionsValue: useProp(String, 'id'),
  optionsName: useProp(String, 'name'),
  options: useProp(Array),
  defaultValue: useProp([String, Number], 0)
})

</script>
