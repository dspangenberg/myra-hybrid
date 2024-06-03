<template>
  <li class="hover:bg-blue-50 border-transparent border-t hover:first:rounded-t-md">
    <Link
      :href="link"
      preserve-state
      class="block "
    >
      <div class="flex items-center px-4 py-4 sm:px-6 ">
        <div class="min-w-0 flex-1 flex items-center">
          <div class="flex-shrink-0">
            <stormy-avatar
              :initials="contact.initials"
              :fullname="contact.fullName"
              :size="28"
            />
          </div>
          <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4 items-center">
            <div>
              <p class="text-base font-semibold text-gray-600 truncate">
                {{ contact.fullNameR }}
              </p>
              <p
                v-if="contact.company?.fullName"
                class="flex mt-1 items-center font-medium text-sm text-gray-400"
              >
                <span class="truncate">{{ contact.company?.fullName }}</span>
              </p>
            </div>
            <div class="hidden md:block">
              <div>
                <p class="text-sm text-gray-900" />
                <p class="mt-2 flex items-center text-sm text-gray-500" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <ChevronRightIcon
            class="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  </li>
</template>
<script setup>
import { computed } from 'vue'
import { ChevronRightIcon } from '@heroicons/vue/solid'

const link = computed(() => `contacts/${props.contact.id}`)

const props = defineProps({
  contact: {
    type: Object,
    default: () => {}
  }
})
</script>
