<template>
  <div v-if="hasErrors">
    <div class="font-medium text-red-600">
      Whoops! Something went wrong.
    </div>

    <ul class="mt-3 list-disc list-inside text-sm text-red-600">
      <li
        v-for="(error, key) in errors"
        :key="key"
      >
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePage } from '@inertiajs/inertia-vue3'

const errors = usePage().props.value.errors

const hasErrors = computed(() => {
  if (errors) {
    // return Object.keys(this.errors).length > 0
    console.log(errors)
  }
  return false
})
</script>
