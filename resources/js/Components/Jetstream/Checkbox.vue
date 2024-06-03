<template>
  <jet-label class="item-center">
    <input
      v-model="proxyChecked"
      type="checkbox"
      :value="value"
      class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-indblueigo-200 focus:ring-opacity-50"
    >
    <span
      v-if="label"
      class="ml-1.5"
    >
      {{ label }}
    </span>
  </jet-label>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({

  props: {
    checked: {
      type: [Array, Boolean],
      default: false
    },
    value: {
      default: 1,
      type: [String, Number]
    },
    label: {
      type: String,
      default: ''
    }
  },
  emits: ['update:checked', 'update:modelValue'],

  computed: {
    proxyChecked: {
      get () {
        return this.checked
      },

      set (val) {
        console.log(val)
        val = val === true ? this.value : false
        console.log(val)
        this.$emit('update:modelValue', val)
      }
    }
  }
})
</script>
