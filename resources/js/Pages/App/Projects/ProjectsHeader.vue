<template>
  <stormy-page-header>
    <template #left>
      <div class="flex-1 items-center flex max-w-lg">
        <div>
          <stormy-avatar
            :initials="project.owner.initials"
            :fullname="project.owner.fullName"
            :size="36"
          />
        </div>
        <div class="ml-3">
          <div class="font-semibold text-lg text-gray-700 leading-normal  max-w-lg">
            {{ project.name }}
          </div>
          <div
            class="text-sm mt-0.5 text-gray-500 leading-normal font-medium max-h-fit max-w-lg hover:underline"
          >
            <Link
              :href="ownerLink"
            >
              {{ project.owner.fullName }}
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
const ownerLink = computed(() => `/contacts/${props.project.owner_contact_id}`)

const props = defineProps({
  project: {
    type: Object,
    default: () => {}
  }
})
</script>
