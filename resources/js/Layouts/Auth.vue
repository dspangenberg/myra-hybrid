<template>
  <div class="min-h-full flex flex-row-reverse h-screen">
    <div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 overflow-hidden overflow-y-auto">
      <div class="mx-auto w-full max-w-sm lg:w-96 flex-col items-start">
        <slot />
      </div>
    </div>
    <div class="hidden lg:block relative w-0 flex-1 border-r border-gray-300">
      <img
        class="absolute h-full w-full object-cover"
        :src="getImageUrl('media/Bonn.jpg')"
        alt=""
      >
    </div>
  </div>
</template>
<script setup>
import { useTemplateFilter } from '@/composables/useTemplateFilter.js'
const { getImageUrl } = useTemplateFilter()
</script>
