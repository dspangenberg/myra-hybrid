<template>
  <stormy-page-layout title="Bearbeiten">
    <template #org-header>
      <ContactsHeader :contact="contact">
        <template #pivot>
          <stormy-pivot
            v-model="pivot"
            first-item="basedata"
          >
            <stormy-pivot-item
              name="basedata"
            >
              Stammdaten + Kommunikation
            </stormy-pivot-item>

            <stormy-pivot-item
              v-if="contact.is_org"
              name="accounting"
            >
              Account
            </stormy-pivot-item>

            <stormy-pivot-item name="misc">
              Sonstige Daten
            </stormy-pivot-item>
          </stormy-pivot>
        </template>
      </ContactsHeader>
    </template>
    <template #default>
      <div class="md:grid md:grid-cols-3 md:gap-3">
        <div class="col-start-2 mt-3 px-3">
          <stormy-back-link
            :class="form.isDirty ? 'hover:text-red-500' :''"
            :href="detailsLink"
          >
            <span v-if="form.isDirty">
              Zurück und Änderungen verwerfen
            </span>
            <span v-else>
              Zurück
            </span>
          </stormy-back-link>
        </div>
      </div>
      <form @submit.prevent="save">
        <transition
          enter-active-class="ease-in duration-500"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
        >
          <component
            :is="currentPivotComponent"
            :params="{ salutations, titles, companies, taxes, paymentDeadlines, addressCategories, countries, emailCategories, phoneCategories }"
          />
        </transition>
      </form>
    </template>
  </stormy-page-layout>
</template>
<script setup>
import { computed, provide, reactive, ref } from 'vue'

import ContactsHeader from './ContactsHeader.vue'

import ContactsEditBase from './ContactsEditBase.vue'
import ContactsEditAccount from './ContactsEditAccount.vue'
import ContactsEditMisc from './ContactsEditMisc.vue'
import { useForm, usePage } from '@inertiajs/inertia-vue3'

const pivot = ref()

const contact = reactive(usePage().props.value.contact)
const salutations = reactive(usePage().props.value.salutations)
const titles = reactive(usePage().props.value.titles)
const companies = reactive(usePage().props.value.companies)
const taxes = reactive(usePage().props.value.taxes)
const countries = reactive(usePage().props.value.countries)
const addressCategories = reactive(usePage().props.value.addressCategories)
const paymentDeadlines = reactive(usePage().props.value.paymentDeadlines)
const emailCategories = reactive(usePage().props.value.emailCategories)
const phoneCategories = reactive(usePage().props.value.phoneCategories)

const form = useForm(contact)

const detailsLink = computed(() => `/contacts/${contact.id}`)

provide('form', form)

const currentPivotComponent = computed(() => {
  switch (pivot.value) {
    case 'accounting':
      return ContactsEditAccount
    case 'misc':
      return ContactsEditMisc
    default:
      return ContactsEditBase
  }
})

const save = () => {
  form.post('/contacts/' + contact.id)
}
</script>
