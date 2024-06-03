<template>
  <div>
    <div class="mt-0.5 relative group">
      <div class="absolute left-0 top-0 flex items-center">
        <stormy-rich-select
          :icon="icon"
          :value="type"
          :options="options"
          @update="$emit('update:type', $event)"
        />
      </div>
      <div class="inner-flex items-center">
        <input
          type="text"
          class="focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none inline-block w-[24rem] text-gray-900 placeholder-gray-300 pl-[10.2rem] pr-8 sm:text-sm border-gray-300 rounded-md"
          placeholder="+1 (555) 987-6543"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
        >
        <span class="absolute text-transparent focus-within:text-gray-500  group-hover::text-gray-500 left-[21.1rem] top-[0.29rem] inner-flex items-center ml-4">
          <stormy-icon-button
            icon="tabler-icon-trash"
            variant="light"
            size="sm"
          />
        </span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useProp } from '@/composables/useProp.js'

defineEmits(['update:modelValue', 'update:type'])

defineProps({
  modelValue: useProp(String, ''),
  icon: useProp(String, ''),
  type: useProp(Number, 0),
  options: useProp(Array)
})

</script>
