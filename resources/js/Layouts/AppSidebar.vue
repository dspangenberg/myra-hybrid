<template>
  <div class="flex flex-col w-64 select-none border-r border-gray-100">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div class="flex flex-col h-0 flex-1 bg-stone-100 bg-opacity-75">
      <div class="flex-1 flex flex-col overflow-y-auto ">
        <div class="flex-shrink-0 flex  pt-6 pb-2.5">
          <a
            class="focus:border-red-50 focus:ring-1 focus:ring-offset-2 rounded-full focus:ring-gray-200 focus:outline-none mx-auto"
            href="#"
          >
            <img
              class="h-10 w-10 mx-auto rounded-full shadow-md "
              :src="getImageUrl('media/tw.png')"
              alt="Workflow"
            >
          </a>
        </div>
        <div class="mx-auto w-full px-2 py-4">
          <div class="bg-white dark:bg-gray-900 relative pointer-events-auto">
            <button
              type="button"
              class="hidden ring-1 ring-gray-900/10 bg-white w-full lg:flex items-center text-sm leading-6 text-gray-400 rounded  py-1.5 pl-2 pr-3 focus:ring-blue-200 focus:outline-none "
            >
              <stormy-icon
                :stroke="1"
                name="tabler-icon-search"
                class="h-4 w-4 mr-3 flex-none"
              />
              Suchen...

              <span class="ml-auto pl-3 flex-none text-sm font-semibold">⌘K</span>
            </button>
          </div>
        </div>
        <div class="">
          <nav
            class="divide-stone-200/50 border-stone-200/50 divide-y space-y border-b"
            aria-label="Sidebar"
          >
            <slot />
          </nav>
        </div>
      </div>
      <div class="flex-shrink-0">
        <nav
          class="divide-stone-200/50 border-stone-200/50 divide-y space-y pt-1 border-t"
          aria-label="Sidebar"
        >
          <slot name="bottom" />
        </nav>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useTemplateFilter } from '@/composables/useTemplateFilter.js'
const { getImageUrl } = useTemplateFilter()

</script>
