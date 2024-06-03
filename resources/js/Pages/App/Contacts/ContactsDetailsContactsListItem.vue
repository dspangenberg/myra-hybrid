<template>
  <li class="hover:bg-blue-50 border-transparent border-t hover:first:rounded-t-md">
    <Link
      :href="link"
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
              <p class="text-base font-medium text-gray-600 truncate">
                {{ contact.fullNameR }}
              </p>
              <p
                v-if="contact.department || contact.position"
                class="flex mt-1 items-center text-sm text-gray-400"
              >
                <span class="truncate">{{ contact.position }} {{ contact.department }}</span>
              </p>
            </div>
            <div class="md:block">
              <div>
                <p
                  v-if="contact.emails.length"
                  class="text-sm text-gray-500"
                >
                  {{ contact.emails[0].email }}
                </p>
                <p
                  v-if="contact.phones.length"
                  class="text-sm text-gray-500"
                >
                  {{ contact.phones[0].phone }}
                </p>
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

const link = computed(() => `/contacts/${props.contact.id}`)

const props = defineProps({
  contact: {
    type: Object,
    default: () => {}
  }
})
</script>
