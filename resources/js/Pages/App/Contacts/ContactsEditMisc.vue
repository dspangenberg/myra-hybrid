<template>
  <div>
    <div class="px-1">
      <jet-form-section>
        <template #title>
          Steuer- und Registerdaten
        </template>

        <template #description>
          Update your account's profile information and email address.
        </template>

        <template #form>
          <stormy-form-group>
            <div class="col-span-24">
              <jet-input
                v-model="form.note"
                :rows="5"
                label="Bemerkungen:"
                type="textarena"
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
  </div>
</template>
<script setup>
import { inject } from 'vue'

const form = inject('form')

defineEmits(['canceled'])

defineProps({
  params: {
    type: Object,
    default: () => {}
  }
})

</script>
