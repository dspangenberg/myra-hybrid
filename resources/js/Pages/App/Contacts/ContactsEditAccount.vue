<template>
  <div>
    <jet-form-section v-if="form.is_org === 1">
      <template #title>
        Accounting
      </template>

      <template #description>
        Update your account's profile information and email address.
      </template>

      <template #form>
        <stormy-form-group>
          <div class="col-span-8">
            <jet-input
              id="name"
              v-model="form.ref"
              label="Sonstige/Externe Referenz"
              type="text"
            />
            <div class="space-x-3 inline-flex mt-1">
              <jet-label>
                <jet-checkbox
                  v-model="form.is_debtor"
                  :checked="form.is_debtor == 1"
                />
                <span class="ml-1.5">Debitor
                </span>
              </jet-label>
              <jet-label>
                <jet-checkbox
                  v-model="form.is_creditor"
                  :checked="form.is_creditor == 1"
                />
                <span class="ml-1.5">Kreditor</span>
              </jet-label>
            </div>
          </div>

          <div
            class="col-span-8"
          >
            <jet-input
              v-model="form.debtor_number"
              :disabled="!form.is_debtor"
              label="Debitoren-Nr."
              type="text"
            />
          </div>
          <div
            class="col-span-8"
          >
            <jet-input
              id="name"
              v-model="form.creditor_number"
              :disabled="!form.is_creditor"

              label="Kreditoren-Nr."
              type="text"
            />
          </div>
          <div
            class="col-span-8"
          >
            <jet-select
              v-model="form.payment_deadline_id"
              :options="params.paymentDeadlines"
              label="Zahlungsziel"
            />
            <jet-label class="mt-1.5">
              <jet-checkbox
                v-model="form.has_dunning_block"
                :checked="form.has_dunning_block == 1"
              />
              <span class="ml-1">Mahnsperre</span>
            </jet-label>
          </div>

          <div
            class="col-span-8"
          >
            <jet-select
              v-model="form.tax_id"
              :options="params.taxes"
              label="Steuersatz"
            />
          </div>
          <div
            class="col-span-8"
          >
            <jet-input
              v-model="form.hourly"
              label="Stundensatz (global)"
              type="text"
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

    <jet-form-section v-if="form.is_org === 1">
      <template #title>
        Steuer- und Registerdaten
      </template>

      <template #description>
        Update your account's profile information and email address.
      </template>

      <template #form>
        <stormy-form-group>
          <div class="col-span-8">
            <jet-input
              v-model="form.vat_id"
              label="Umsatzsteuer-ID:"
              type="text"
            />
          </div>
          <div class="col-span-8">
            <jet-input
              id="name"
              v-model="form.register_court"
              label="Registergericht"
              type="text"
            />
          </div>
          <div class="col-span-8">
            <jet-input
              id="name"
              v-model="form.register_number"
              label="Register-Nr."
              type="text"
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

defineProps({
  params: {
    type: Object,
    default: () => {}
  }
})

</script>
