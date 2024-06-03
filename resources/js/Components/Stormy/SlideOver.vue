<template>
  <TransitionRoot
    as="template"
    :show="isOpen"
  >
    <Dialog
      as="div"
      class="fixed inset-0 overflow-hidden"
      @close="$emit('closed')"
    >
      <div class="absolute inset-0 overflow-hidden">
        <DialogOverlay class="absolute inset-0" />

        <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <TransitionChild
            as="template"
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enter-from="translate-x-full"
            enter-to="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leave-from="translate-x-0"
            leave-to="translate-x-full"
          >
            <div class="w-screen max-w-md">
              <div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
                <div class="min-h-0 flex-1 flex flex-col py-6 overflow-y-scroll">
                  <div class="px-4 sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle class="text-lg font-medium text-gray-900">
                        Panel title
                      </DialogTitle>
                      <div class="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          @click="$emit('closed')"
                        >
                          <span class="sr-only">Close panel</span>
                          <XIcon
                            class="h-6 w-6"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="mt-6 relative flex-1 px-4 sm:px-6">
                    <slot />
                  </div>
                </div>
                <div class="flex-shrink-0 px-4 py-4 flex justify-end">
                  <button
                    type="button"
                    class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    @click="$emit('closed')"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script setup>
import { computed, ref, defineEmits } from 'vue'

import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XIcon } from '@heroicons/vue/outline'

defineEmits(['closed'])

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})
</script>
