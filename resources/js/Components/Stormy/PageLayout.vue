<template>
  <div class="overflow-hidden h-full w-full flex-col bg-stone-100 flex-1 flex">
    <div class="flex-shrink-1 bg-white border-gray-100 border-t border-b">
      <div class="max-w-5xl mx-auto print:max-w-fit print:mx-0">
        <div class="mx-2">
          <slot name="org-header">
            <stormy-page-header>
              <template #left>
                <slot name="header-left" />
              </template>
              <template #right>
                <slot name="header-right" />
              </template>
              <template #pivot>
                <slot name="header-pivot" />
              </template>
            </stormy-page-header>
          </slot>
        </div>
      </div>
    </div>
    <div
      class="flex-shrink flex overflow-hidden mt-6"
    >
      <div class="max-w-5xl mx-auto flex-1 flex items-center px-3">
        <slot name="full-section">
          <div class="w-1/3">
            <slot name="section-left" />
          </div>
          <div class="flex-1 flex justify-center">
            <slot name="section-center" />
          </div>
          <div class="flex-1 flex justify-end">
            <slot name="section-right" />
          </div>
        </slot>
      </div>
    </div>
    <div class="flex-1 flex overflow-y-auto flex flex-col">
      <div class="flex-1 flex">
        <div class="max-w-5xl mx-auto flex flex-col flex-1 flex space-x-3 print:max-w-[270mm] print:mx-0 !print:text-black">
          <div
            class="mx-2 !print:text-black"
            scroll-region
          >
            <slot />
          </div>
        </div>
      </div>
    </div>
    <Head :title="title" />
  </div>
</template>
<script setup>
import { Head } from '@inertiajs/inertia-vue3'

defineProps({
  title: {
    default: '404',
    type: String
  }
})
</script>
