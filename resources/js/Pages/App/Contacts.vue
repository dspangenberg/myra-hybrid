<template>
  <stormy-page-layout title="Accounts + Kontakte">
    <template #header-left>
      <div class="flex-1 items-center flex">
        <div class="font-bold text-lg text-gray-700 leading-none">
          Accounts + Kontakte
        </div>
      </div>
    </template>
    <template #header-right>
      <div class="flex-1 items-center  flex  justify-end">
        <button
          type="button"
          class=" px-2 py-2 inline-flex items-center leading-none text-sm font-medium rounded text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <stormy-icon
            :stroke-width="2"
            name="tabler-icon-circle-plus"
            class="w-4 h-4 text-white mr-1"
          />
          <span>
            Neuer Account/Kontakt
          </span>
        </button>
      </div>
    </template>
    <template #header-pivot>
      <stormy-pivot
        v-model="pivot"
        first-item="favorites"
      >
        <stormy-pivot-item
          name="favorites"
        >
          Accounts
        </stormy-pivot-item>

        <stormy-pivot-item name="all">
          Alle
        </stormy-pivot-item>

        <stormy-pivot-item name="debitors">
          Debitoren
        </stormy-pivot-item>

        <stormy-pivot-item name="creditors">
          Kreditoren
        </stormy-pivot-item>
      </stormy-pivot>
    </template>
    <template #section-right>
      <span class="relative z-0 shadow-sm rounded-md">
        <button
          type="button"
          class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-1 focus:border-blue-500"
        >
          <stormy-icon
            name="tabler-icon-list-details"
            class="w-4 h-4"
          />
        </button>
        <button
          type="button"
          class="-ml-px relative inline-flex items-center px-2 py-2 border border-gray-300 bg-blue-100 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-1 focus:border-blue-500"
        >
          <stormy-icon
            name="tabler-icon-layout-grid"
            class="w-4 h-4"
          />
        </button>
        <button
          type="button"
          class="-ml-px relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-1 focus:border-blue-500"
        >
          <stormy-icon
            name="tabler-icon-layout-kanban"
            class="w-4 h-4"
          />
        </button>
        <button
          type="button"
          class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-1 focus:border-blue-500"
        >
          <stormy-icon
            name="tabler-icon-calendar-event"
            class="w-4 h-4"
          />
        </button>
      </span>
    </template>
    <template #default>
      <div class="flex flex-col overflow-hidden">
        <ContactsList
          :contacts="contacts.data"
          :meta="meta"
        />
      </div>
    </template>
  </stormy-page-layout>
</template>

<script setup>
import { ref } from 'vue'
import ContactsList from './Contacts/ContactsList.vue'

const pivot = ref()

defineProps({
  contacts: {
    type: Object,
    default: () => {}
  },
  meta: {
    type: Object,
    default: () => {}
  }
})

</script>

<style></style>
