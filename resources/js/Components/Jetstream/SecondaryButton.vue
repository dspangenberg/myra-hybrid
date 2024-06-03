<template>
  <button
    :type="type"
    class="inline-flex items-center px-2 py-2 rounded border leading-none active:shadow-md border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 focus:z-10 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  >
    <slot />
  </button>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'button'
    }
  }
})
</script>
