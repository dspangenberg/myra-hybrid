<template>
  <stormy-page-layout title="Bearbeiten">
    <template #org-header>
      <ProjectsHeader :project="project">
        <template #pivot>
          <stormy-pivot
            v-model="pivot"
            first-item="basedata"
          >
            <stormy-pivot-item
              name="basedata"
            >
              Stammdaten
            </stormy-pivot-item>
          </stormy-pivot>
        </template>
      </ProjectsHeader>
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
            :params="{ contacts, companies, projectCategories, users }"
          />
        </transition>
      </form>
    </template>
  </stormy-page-layout>
</template>
<script setup>
import { computed, provide, reactive, ref } from 'vue'
import { useForm, usePage } from '@inertiajs/inertia-vue3'
import ProjectsHeader from './ProjectsHeader.vue'
import ProjectsEditBase from './ProjectsEditBase.vue'

const pivot = ref()

const project = reactive(usePage().props.value.project)
const projectCategories = reactive(usePage().props.value.projectCategories)
const companies = reactive(usePage().props.value.companies)
const contacts = reactive(usePage().props.value.contacts)
const users = reactive(usePage().props.value.users)

const form = useForm(project)

const detailsLink = computed(() => `/projects/${project.id}`)

provide('form', form)

const currentPivotComponent = computed(() => {
  switch (pivot.value) {
    default:
      return ProjectsEditBase
  }
})

const save = () => {
  form.post('/projects/' + project.id)
}
</script>
