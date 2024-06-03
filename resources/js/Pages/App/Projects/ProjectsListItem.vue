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
              v-if="project?.owner"
              :initials="project.owner.initials"
              :fullname="project.owner.fullName"
              :size="28"
            />
          </div>
          <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-7 md:gap-4 items-center">
            <div class="col-span-3">
              <p class="text-base font-semibold text-gray-600 truncate">
                {{ project.name }}
              </p>
              <p
                class="flex mt-1 text-left font-medium text-sm text-gray-400"
              >
                <span class="truncate">{{ project?.owner?.fullName }}</span>
              </p>
            </div>

            <div class="hidden md:block col-span-2">
              <p
                v-if="project.category?.name"
                class=" mt-1 font-medium text-xs text-gray-400"
              >
                <span class="truncate">{{ project.category?.name }}</span>
              </p>
              <p class="mt-2  text-sm text-gray-500" />
            </div>

            <div class="text-right text-sm text-red-500">
              {{ openTime }}
            </div>
            <div class="text-right justify-self-end">
              <ChevronRightIcon
                class="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  </li>
</template>
<script setup>
import { computed } from 'vue'
import { ChevronRightIcon } from '@heroicons/vue/solid'
import { useTemplateFilter } from '@/composables/useTemplateFilter.js'

const { formatDuration } = useTemplateFilter()
const link = computed(() => `projects/${props.project.id}`)

const openTime = computed(() => {
  if (props.project.times.length) {
    return formatDuration(props.project.times[0].mins)
  } else {
    return ''
  }
})

const props = defineProps({
  project: {
    type: Object,
    default: () => {}
  }
})
</script>
