<template>
  <stormy-page-layout title="Dashboard">
    <template #header-left>
      <div class="flex-1 items-center flex">
        <div class="font-bold text-lg text-gray-700 leading-none">
          Willkommen zurück, Danny!
        </div>
      </div>
    </template>
    <template #section-right>
      <div class="pt-6 flex content-between">
        <div class="flex-1" />
        <div>
          <span class="relative z-0 inline-flex shadow-sm rounded-md">
            <button
              type="button"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-1 focus:border-blue-500"
            >
              <stormy-icon
                name="tabler-icon-list-details"
                class="w-4 h-4"
              />
            </button>
            <button
              type="button"
              class="-ml-px relative inline-flex items-center px-2 py-2 border border-gray-300 bg-blue-100 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-1 focus:border-blue-500"
            >
              <stormy-icon
                name="tabler-icon-layout-grid"
                class="w-4 h-4"
              />
            </button>
            <button
              type="button"
              class="-ml-px relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-1 focus:border-blue-500"
            >
              <stormy-icon
                name="tabler-icon-layout-kanban"
                class="w-4 h-4"
              />
            </button>
            <button
              type="button"
              class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-1 focus:border-blue-500"
            >
              <stormy-icon
                name="tabler-icon-calendar-event"
                class="w-4 h-4"
              />
            </button>
          </span>
        </div>
      </div>
    </template>
    <template #default>
      xxx
    </template>
  </stormy-page-layout>
</template>
