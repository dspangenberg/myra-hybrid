<template>
  <stormy-page-layout title="Bearbeiten">
    <template #header-left>
      <div class="font-semibold -ml-1 text-lg text-gray-700 leading-normal  max-w-lg">
        Neuer Zeiteintrag
      </div>
    </template>
    <template #header-right>
      <div
        v-if="time"
        class="inline-flex space-x-1"
      >
        <stormy-icon-button
          :disabled="!time.id"
          :href="duplicateLink"
          icon="tabler-icon-copy"
          as="Link"
          variant="ghost"
          :replace="true"
          :only="['time']"
        />
        <stormy-icon-button
          :disabled="!time.id"
          icon="tabler-icon-trash"
          variant="danger"
          @click="trash"
        />
      </div>
    </template>
    <template #default>
      <div class="md:grid md:grid-cols-3 md:gap-3">
        <div class="col-start-2 mt-3 px-3">
          <stormy-back-link
            :class="form.isDirty ? 'hover:text-red-500' :''"
            href="/times"
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
      <form>
        <transition
          enter-active-class="ease-in duration-500"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
        >
          <jet-form-section>
            <template #title>
              Stammdaten
            </template>

            <template #description>
              Update your account's profile information and email address.
            </template>

            <template #form>
              <stormy-form-group>
                <div class="col-span-7">
                  <stormy-date-picker
                    v-model="form.begin_at"
                    label="Start"
                    autofocus
                  />
                  <div class="mt-1 inline-flex space-x-2">
                    <jet-checkbox
                      v-model="form.is_billable"
                      :checked="form.is_billable == 1"
                      :value="1"
                      label="abrechenbar"
                    />
                  </div>
                </div>
                <div class="col-span-7">
                  <stormy-date-picker
                    v-model="form.end_at"
                    show-clear
                    show-now
                    label="Ende"
                  />
                </div>
                <div class="col-span-10">
                  <jet-select
                    v-model="form.project_id"
                    :options="projects"
                    label="Projekt"
                  />
                </div>
                <div class="col-span-24">
                  <jet-input
                    v-model="form.note"
                    :rows="5"
                    autofocus
                    type="textarea"
                    label="Notiz:"
                  />
                </div>

                <div class="col-span-12">
                  <jet-select
                    v-model="form.time_category_id"
                    :options="categories"
                    label="Dienstleistung"
                  />
                  <div class="mt-1 inline-flex space-x-2">
                    <jet-checkbox
                      v-model="form.invoice_id"
                      :checked="!!form.invoice_id"
                      :value="1"
                      label="abgerechnet"
                    />
                    <jet-checkbox
                      v-model="form.is_locked"
                      :checked="form.is_locked == 1"
                      :value="1"
                      label="gesperrt"
                    />
                  </div>
                </div>
                <div class="col-span-12">
                  <jet-select
                    v-model="form.user_id"
                    :options="users"
                    label="Mitarbeiter:in"
                  />
                </div>
              </stormy-form-group>
              <stormy-form-group with-border />
            </template>
            <template #actions>
              <jet-button
                :class="{ 'opacity-25': form.processing }"
                :disabled="form.processing"
                @click="save"
              >
                Speichern
              </jet-button>
            </template>
          </jet-form-section>
        </transition>
      </form>
    </template>
  </stormy-page-layout>
</template>
<script setup>
import { provide, reactive, computed } from 'vue'
import { useForm, usePage } from '@inertiajs/inertia-vue3'
import { DateTime } from 'luxon'

const projects = reactive(usePage().props.value.projects)
const categories = reactive(usePage().props.value.timeCategories)
const users = reactive(usePage().props.value.users)
let time = reactive(usePage().props.value.time)

if (!time) {
  time = {
    begin_at: DateTime.now().toFormat('dd.MM.yyyy HH:mm'),
    end_at: '',
    project_id: null,
    time_category_id: null,
    user_id: null,
    note: ''
  }
}

const form = useForm(time)

provide('form', form)

const duplicateLink = computed(() => `/times/duplicate/${time.id}`)

const trash = async () => {
  await form.delete('/times/' + time.id)
}

const save = async () => {
  if (time.id) {
    await form.post('/times/save/' + time.id)
  } else {
    await form.post('/times/save')
  }
}
</script>
