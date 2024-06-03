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
        <template v-if="form.is_org === 1">
          <stormy-form-group>
            <div class="col-span-2 flex items-center mt-2 -ml-1.5">
              <stormy-avatar-button />
            </div>
            <div class="col-span-22">
              <jet-input
                v-model="form.name"
                label="Name"
                type="text"
              />
            </div>
          </stormy-form-group>
          <stormy-form-group with-border>
            <div class="col-span-12">
              <jet-input
                v-model="form.short_name"
                label="Kurzname"
                type="text"
              />
            </div>
            <div class="col-span-12">
              <jet-input
                v-model="form.website"
                label="Website"
                type="text"
              />
            </div>
          </stormy-form-group>
        </template>
        <template v-else>
          <stormy-form-group>
            <div class="col-span-2 flex items-center mt-2 -ml-1.5">
              <stormy-avatar-button />
            </div>
            <div class="col-span-3">
              <jet-select
                v-model="form.salutation_id"
                :options="params.salutations"
                label="Anrede"
              />
            </div>
            <div class="col-span-4">
              <jet-select
                v-model="form.title_id"
                :options="params.titles"
                label="Titel"
              />
            </div>

            <div class="col-span-7">
              <jet-input
                v-model="form.first_name"
                label="Vorname"
              />
            </div>

            <div class="col-span-8">
              <jet-input
                v-model="form.name"
                label="Name"
              />
            </div>
          </stormy-form-group>
          <stormy-form-group with-border>
            <div class="col-span-full">
              <jet-select
                v-model="form.company_id"
                :disabled="true"
                :options="params.companies"
                label="Firma"
              />
            </div>
            <div class="col-span-12">
              <jet-input
                v-model="form.department"
                label="Abteilung"
                type="text"
                autocomplete="off"
              />
            </div>
            <div class="col-span-12">
              <jet-input
                v-model="form.position"
                label="Position"
                type="text"
                autocomplete="off"
              />
            </div>
          </stormy-form-group>
        </template>
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

    <ContactsEditBasePhone
      :params="params"
    />

    <ContactsEditBaseEmail
      :params="params"
    />

    <jet-button
      type="button"
      @click="modalOpen=true"
    >
      Modal
    </jet-button>
    <jet-dialog-modal
      :show="modalOpen"
      :closeable="true"
      @close="modalOpen=false"
    >
      <template #title>
        Anschrift hinzufügen
      </template>
      <template #content>
        <div class="grid grid-cols-24 gap-x-3 gap-y-4">
          <div class="col-span-7">
            <jet-select
              v-model="form.ref"
              :options="params.addressCategories"
              label="Kategorie"
            />
          </div>
          <div class="col-span-17">
            <jet-input
              v-model="form.ref0"
              label="Anschrift"
              :rows="2"
              type="textarena"
            />
          </div>
          <div class="col-start-8 col-span-3 -mt-4">
            <jet-select
              v-model="form.ref1"
              options-name="iso_code"
              :options="params.countries"
            />
          </div>
          <div class="col-span-4 -mt-4">
            <jet-input
              v-model="form.ref2"
              :rows="2"
              type="text"
            />
          </div>
          <div class="col-span-10 -mt-4">
            <jet-input
              v-model="form.ref3"
              :rows="2"
              type="text"
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
          <jet-button>
            Speichern
          </jet-button>
        </div>
      </template>
    </jet-dialog-modal>
  </div>
</template>
<script setup>
import { inject, ref } from 'vue'
import ContactsEditBasePhone from './ContactsEditBasePhone.vue'
import ContactsEditBaseEmail from './ContactsEditBaseEmail.vue'

const form = inject('form')
const modalOpen = ref(false)

defineEmits(['canceled', 'close'])

defineProps({
  params: {
    type: Object,
    default: () => {}
  }
})

</script>
