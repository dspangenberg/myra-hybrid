<template>
  <stormy-page-layout title="Accounts + Kontakte">
    <template #header-left>
      <div class="flex-1 items-center flex">
        <div class="font-bold text-lg text-gray-700 leading-none">
          Projekte
        </div>
      </div>
    </template>
    <template #header-right>
      <div class="flex-1 items-center  flex  justify-end">
        <button
          type="button"
          class=" px-2 py-2 inline-flex items-center leading-none text-sm font-medium rounded text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          @click="modalOpen=true"
        >
          <stormy-icon
            :stroke-width="2"
            name="tabler-icon-circle-plus"
            class="w-4 h-4 text-white mr-1"
          />
          <span>
            Neues Projekt
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
          Favoriten
        </stormy-pivot-item>

        <stormy-pivot-item name="all">
          Alle
        </stormy-pivot-item>

        <stormy-pivot-item name="internal">
          Intern
        </stormy-pivot-item>

        <stormy-pivot-item name="debitors">
          Archiviert
        </stormy-pivot-item>
      </stormy-pivot>
    </template>

    <template #default>
      <div class="flex flex-col overflow-hidden mb-6">
        <div v-if="projects?.data?.length">
          <stormy-list-box>
            <template
              v-for="(project, index) in projects.data"
              :key="index"
            >
              <ProjectsListItem
                :project="project"
              />
            </template>
          </stormy-list-box>
          <stormy-pagination
            :meta="meta"
          />
        </div>
        <div
          v-else
          class="text-center"
        >
          <svg
            class="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              vector-effect="non-scaling-stroke"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">
            No projects
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            Get started by creating a new project.
          </p>
          <div class="mt-6">
            <button
              type="button"
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <stormy-icon
                :stroke-width="2"
                name="tabler-icon-circle-plus"
                class="w-5 h-5 -ml-1 mr-2"
              />
              New Project
            </button>
          </div>
        </div>
      </div>

      <ProjectsCreateModal
        :open="modalOpen"
        :params="{ projectCategories, companies }"
        @cancel="modalOpen=false"
      />
    </template>
  </stormy-page-layout>
</template>

<script setup>
import { ref, reactive, provide } from 'vue'
import ProjectsCreateModal from './Projects/ProjectsCreateModal.vue'
import ProjectsListItem from './Projects/ProjectsListItem.vue'
import { useForm, usePage } from '@inertiajs/inertia-vue3'

const pivot = ref()
const modalOpen = ref(false)

const projectCategories = reactive(usePage().props.value.projectCategories)
const companies = reactive(usePage().props.value.companies)

const form = useForm({
  name: '',
  owner_contact_id: 0,
  project_category_id: 0
})
provide('form', form)

defineProps({
  projects: {
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
