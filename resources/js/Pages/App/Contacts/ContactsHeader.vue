<template>
  <stormy-page-header>
    <template #left>
      <div class="flex-1 items-center flex max-w-lg">
        <div>
          <stormy-avatar
            :initials="contact.initials"
            :fullname="contact.fullName"
            :size="36"
          />
        </div>
        <div class="ml-3">
          <div class="font-semibold text-lg text-gray-700 leading-normal  max-w-lg">
            {{ contact.fullName }}
          </div>
          <div
            v-if="contact?.company"
            class="text-sm mt-0.5 text-gray-500 leading-normal font-medium max-h-fit max-w-lg hover:underline"
          >
            <Link
              :href="companyLink"
            >
              {{ contact.company.fullName }}
            </Link>
          </div>
        </div>
      </div>
    </template>
    <template #right>
      <slot name="right" />
    </template>
    <template #pivot>
      <slot name="pivot" />
    </template>
  </stormy-page-header>
</template>
<script setup>
import { computed } from 'vue'
const companyLink = computed(() => `/contacts/${props.contact.company_id}`)

const props = defineProps({
  contact: {
    type: Object,
    default: () => {}
  }
})
</script>
