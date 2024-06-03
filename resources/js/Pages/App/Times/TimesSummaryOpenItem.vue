<template>
  <td class="px-2 py-2 whitespace-nowrap">
    {{ item.project_name }}
  </td>
  <td class="px-2 py-2 whitespace-nowrap text-right">
    {{ minutes }}
  </td>
  <td class="px-2 py-2 whitespace-nowrap text-right">
    {{ costs }}
  </td>
</template>
<script setup>
import { computed } from 'vue'
import { useProp } from '@/composables/useProp.js'
import { useTemplateFilter } from '@/composables/useTemplateFilter.js'

const { formatDuration, formatCurrency } = useTemplateFilter()

const minutes = computed(() => formatDuration(props.item.minutes))
const costs = computed(() => formatCurrency(props.item.costs))

const props = defineProps({
  item: useProp(Object)
})

</script>
