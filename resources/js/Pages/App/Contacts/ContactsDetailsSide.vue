<template>
  <stormy-page-side>
    <div
      v-if="(contact.is_org) && debtorNumber || contact.short_name"
      class="grid grid-cols-2 gap-x-3"
    >
      <div v-if="debtorNumber">
        <stormy-dl-item
          label="Kunden-Nr."
          :value="debtorNumber"
        />
      </div>
      <div>
        <stormy-dl-item
          label="Kurzname"
          :value="contact.short_name"
        />
      </div>
    </div>
    <stormy-dl-item
      label="Website"
      :value="contact.website"
      :link="contact.website"
    />
    <stormy-dl-item
      label="Abteilung"
      :value="contact.department"
    />
    <stormy-dl-item
      label="Position"
      :value="contact.position"
    />
    <stormy-dl-item
      dd-class="whitespace-pre-line lining-nums slashed-zero tabular-nums"
      label="Notiz"
      :value="contact.note"
    />
  </stormy-page-side>
</template>
<script setup>
import { computed } from 'vue'
import { useTemplateFilter } from '@/composables/useTemplateFilter.js'

const { formatAccounId } = useTemplateFilter()

const debtorNumber = computed(() => formatAccounId(props.contact.debtor_number))

const props = defineProps({
  contact: {
    type: Object,
    default: () => {}
  }
})
</script>
