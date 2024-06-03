<template>
  <jet-form-section>
    <template #title>
      E-Mail
    </template>

    <template #description>
      Update your account's profile information and email address.
    </template>

    <template #form>
      <stormy-form-group class="grid grid-cols-24 gap-x-3 gap-y-1">
        <template
          v-for="(item, index) in form.emails"
          :key="index"
        >
          <div class="col-span-16 my-0 py-0">
            <stormy-com-input
              v-model="item.email"
              v-model:type="item.email_category_id"
              icon="tabler-icon-mail"
              :options="params.emailCategories"
            />
          </div>
        </template>
        <div class="col-span-full">
          <stormy-icon-button
            icon="tabler-icon-circle-plus"
            variant="light"
            size="md"
            @click="addEmail"
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
</template>
<script setup>
import { inject } from 'vue'

const form = inject('form')

defineEmits(['canceled', 'close'])

const addEmail = () => {
  form.emails.push({
    id: 0,
    contact_id: form.id,
    email_category_id: 3,
    pos: 99,
    phone: ''
  })
}

defineProps({
  params: {
    type: Object,
    default: () => {}
  }
})

</script>
