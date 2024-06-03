<template>
  <div class="flex-0 border-gray-200 bg-white/40 z-10 text-xxs space-y-2 divide-y rounded-md shadow  content-between max-h-fit border-t w-1/3">
    <table class="min-w-full">
      <tbody class="divide-y divide-gray-200 text-xxs">
        <tr
          v-for="(item, index) in items"
          :key="index"
        >
          <Item :item="item" />
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { useProp } from '@/composables/useProp.js'
import Item from './TimesSummaryOpenItem.vue'

defineProps({
  items: useProp(Array)
})

</script>
