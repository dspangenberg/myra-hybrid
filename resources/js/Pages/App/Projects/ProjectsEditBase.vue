<template>
  <div>
    <jet-form-section>
      <template #title>
        Stammdaten
      </template>

      <template #description>
        Update your account's profile information and email address.
      </template>

      <template #form>
        <stormy-form-group>
          <div class="col-span-12">
            <jet-input
              v-model="form.name"
              label="Name"
            />
          </div>
          <div class="col-span-12">
            <jet-input
              v-model="form.website"
              label="Website"
            />
          </div>
          <div class="col-span-12">
            <jet-select
              v-model="form.lead_user_id"
              :options="params.users"
              options-name="fullNameR"
              label="Interne Projektleitung "
            />
          </div>
          <div class="col-span-8">
            <jet-select
              v-model="form.project_category_id"
              :options="params.projectCategories"
              label="Kategorie"
            />
          </div>
          <div class="col-span-4">
            <jet-input
              v-model="form.hourly"
              label="Stundensatz"
            />
          </div>
        </stormy-form-group>
        <stormy-form-group with-border />
      </template>
      <template #actions>
        <jet-action-message
          class="mr-3"
        >
          Saved.
        </jet-action-message>

        <jet-button
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Speichern
        </jet-button>
      </template>
    </jet-form-section>
    <jet-form-section>
      <template #title>
        Auftraggeberdaten
      </template>

      <template #description>
        Update your account's profile information and email address.
      </template>

      <template #form>
        <stormy-form-group>
          <div class="col-span-12">
            <jet-select
              v-model="form.owner_contact_id"
              :options="params.companies"
              label="Auftraggeber"
            />
          </div>
          <div class="col-span-12">
            <jet-select
              v-model="form.manager_contact_id"
              :options="form.owner.contacts"
              options-name="fullNameR"
              label="Verantwortliche:r"
            />
          </div>
          <div class="col-span-12">
            <jet-select
              v-model="form.invoice_contact_id"
              :options="params.companies"
              options-name="fullName"
              label="Kostenträger"
            />
          </div>
        </stormy-form-group>
      </template>
      <template #actions>
        <jet-action-message
          class="mr-3"
        >
          Saved.
        </jet-action-message>

        <jet-button
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Speichern
        </jet-button>
      </template>
    </jet-form-section>
  </div>
</template>
<script setup>
import { inject } from 'vue'

const form = inject('form')
defineEmits(['canceled', 'close'])

defineProps({
  params: {
    type: Object,
    default: () => {}
  }
})

</script>
