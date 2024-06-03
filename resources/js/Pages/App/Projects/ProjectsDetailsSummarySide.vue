<template>
  <stormy-page-side>
    <div
      v-if="project.category?.name || project.hourly"
      class="grid grid-cols-2 gap-x-3"
    >
      <div v-if="project.category?.name">
        <stormy-dl-item
          label="Kategorie"
          :value="project.category?.name"
        />
      </div>
      <div v-if="project.hourly">
        <stormy-dl-item
          label="Stundensatz"
          :value="hourly"
        />
      </div>
    </div>
    <stormy-dl-item
      label="Website"
      :value="project.website"
      :link="project.website"
    />
    <stormy-dl-item
      v-if="project.manager"
      label="Projektverantwortliche:r"
      :value="project.manager?.fullName"
    />
  </stormy-page-side>
</template>
<script setup>
import { computed } from 'vue'
import { useTemplateFilter } from '@/composables/useTemplateFilter.js'
const { formatCurrency } = useTemplateFilter()

const hourly = computed(() => formatCurrency(props.project.hourly ? props.project.hourly : props.project.owner.hourly))

const props = defineProps({
  project: {
    type: Object,
    default: () => {}
  }
})
</script>
