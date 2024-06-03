<template>
  <div>
    <jet-label
      :label="label"
    />
    <template v-if="type == 'textarea'">
      <textarea
        class="w-full text-sm form-textarea font-regular placeholder-gray-400 border border-gray-300 rounded py-1.5 px-1.5 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none "
        :value="modelValue"
        :rows="rows"
        :name="name"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </template>
    <template v-else>
      <input
        class="w-full text-sm font-regular placeholder-gray-400 border border-gray-300 rounded py-1.5 px-1.5 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none "
        :class="[label ? 'mt-0.5' : '']"
        :value="modelValue"
        :autocomplete="autocomplete"
        :name="name"
        :type="type"
        @input="$emit('update:modelValue', $event.target.value)"
      >
    </template>
  </div>
</template>
<script setup>

defineEmits(['update:modelValue'])

defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  name: {
    type: String,
    default: 'text'
  },
  rows: {
    type: Number,
    default: 2
  },
  autocomplete: {
    type: String,
    default: 'off'
  },
  label: {
    type: String,
    default: ''
  }
})

</script>
