<template>
  <jet-dialog-modal
    :show="open"
    :closeable="true"
    @close="$emit('cancel')"
  >
    <template #title>
      Neues Projekt
    </template>
    <template #content>
      <div class="grid grid-cols-24 gap-x-3 gap-y-4">
        <div class="col-span-full">
          <jet-input
            v-model="form.name"
            label="Bezeichnung"
            type="text"
          />
        </div>
        <div class="col-span-12">
          <jet-select
            v-model="form.project_category_id"
            :options="params.projectCategories"
            label="Kategorie"
          />
        </div>
        <div class="col-span-12">
          <jet-select
            v-model="form.owner_contact_id"
            :options="params.companies"
            label="Account"
          />
        </div>
      </div>
    </template>
    <template #footer>
      <div class="space-x-2">
        <jet-secondary-button
          @click="modalOpen=false"
        >
          Abbrechen
        </jet-secondary-button>
        <jet-button
          @click="save"
        >
          Speichern
        </jet-button>
      </div>
    </template>
  </jet-dialog-modal>
</template>
<script setup>
import { initCustomFormatter, inject, reactive } from 'vue'
import { useProp } from '@/composables/useProp.js'

const reset = () => {
  form.value = {
    name: '',
    owner_contact_id: 0,
    project_category_id: 0
  }
}

const emit = defineEmits(['cancel'])
const form = inject('form')

defineProps({
  open: useProp(Boolean, false),
  params: useProp(Object)
})

const save = () => {
  form.post('/projects/')
  reset()
  emit('cancel')
}

</script>
