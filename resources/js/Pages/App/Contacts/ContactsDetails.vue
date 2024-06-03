<template>
  <stormy-page-layout title="Kontaktdetails">
    <template #org-header>
      <ContactsHeader :contact="contact">
        <template #pivot>
          <stormy-pivot
            v-model="pivot"
            first-item="history"
          >
            <stormy-pivot-item name="history">
              Historie
            </stormy-pivot-item>

            <stormy-pivot-item
              v-if="contact.is_org"
              :counter="contact.contacts?.length"
              name="contacts"
            >
              Kontakte
            </stormy-pivot-item>

            <stormy-pivot-item
              name="projects"
            >
              Projekte
            </stormy-pivot-item>

            <stormy-pivot-item
              v-if="contact.is_org"
              disabled
              name="contracts"
            >
              Verträge
            </stormy-pivot-item>

            <stormy-pivot-item
              v-if="contact.is_org"
              name="account"
            >
              Account + Fakturierung
            </stormy-pivot-item>

            <stormy-pivot-item
              disabled
              name="documents"
            >
              Dokumente
            </stormy-pivot-item>
          </stormy-pivot>
        </template>

        <template
          #right
        >
          <div class="flex-1 items-center flex  justify-end space-x-2">
            <stormy-icon-button
              :href="editLink"
              icon="tabler-icon-pencil"
              variant="primary"
              size="md"
            />
            <stormy-icon-button
              icon="tabler-icon-user-plus"
              variant="ghost"
              size="md"
            />
            <Menu
              as="div"
              class="relative inline-block text-left z-10"
            >
              <div>
                <MenuButton
                  :class="getClasses"
                  class="inline-flex items-center "
                >
                  <stormy-icon
                    name="tabler-icon-dots"
                    class="text-neutral-900"
                    :class="getIconSize"
                  />
                </MenuButton>
              </div>

              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                  <div class="flex flex-col">
                    <stormy-menu-item
                      icon="tabler-icon-printer"
                      label="Drucken"
                      shortcut="Strg + P"
                    />
                    <stormy-menu-item
                      icon="tabler-icon-archive"
                      label="Archivieren"
                    />
                  </div>
                  <div class="flex flex-col">
                    <stormy-menu-item
                      :danger="true"
                      icon="tabler-icon-trash"
                      label="Löschen"
                    />
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </template>
      </ContactsHeader>
    </template>

    <template
      #section-right
    >
      <div class="hidden">
        <span
          class="shadow-sm rounded-md "
        >
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
      </div>
    </template>
    <template #default>
      <stormy-back-link
        href="/contacts"
      >
        Zurück zur Auswahlliste
      </stormy-back-link>
      <transition
        enter-active-class="ease-in duration-500"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
      >
        <component
          :is="currentPivot"
          :contact="contact"
        />
      </transition>
    </template>
  </stormy-page-layout>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'
import { usePage } from '@inertiajs/inertia-vue3'
import { useButton } from '@/composables/useButton.js'
import ContactsDetailsHistory from './ContactsDetailsHistory.vue'
import ContactsDetailsContacts from './ContactsDetailsContacts.vue'
import ContactsDetailsProjects from './ContactsDetailsProjects.vue'

import ContactsHeader from './ContactsHeader.vue'

const { getIconSize, getClasses } = useButton({
  variant: 'ghost',
  size: 'md'
})

const contact = reactive(usePage().props.value.contact)

const editLink = computed(() => `/contacts/${contact.id}/edit`)

const pivot = ref()

const currentPivot = computed(() => {
  switch (pivot.value) {
    case 'contacts':
      return ContactsDetailsContacts
    case 'projects':
      return ContactsDetailsProjects
    default:
      return ContactsDetailsHistory
  }
})

</script>

<style></style>
