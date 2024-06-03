<template>
  <button
    :type="type"
    class="justify-center px-2 py-2 inline-flex active:shadow-md items-center leading-none text-sm rounded text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'submit'
  }
})
</script>
