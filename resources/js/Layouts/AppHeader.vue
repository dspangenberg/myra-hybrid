<template>
  <div class="flex-1 flex content-between items-center">
    <div class="flex-shrink-0 items-center">
      <div class="absolute inset-y-0 right-0 flex items-center px-0.5 sm:static sm:inset-auto space-x-4 print:hidden">
        <template v-if="timer">
          <AppTimerWidget
            class="print:hidden"
            :timer="timer"
          />
        </template>
      </div>
    </div>
    <div class="flex-1 flex items-center space-x-2 h-full" />
    <div class="flex-shrink-0 items-center">
      <div class="absolute inset-y-0 right-0 flex items-center px-4 sm:static sm:inset-auto space-x-3">
        <stormy-action-button
          :stroke="1"
          icon="tabler-icon-bell"
          tooltip="Benachrichtigungen"
          svg-class="h-7 w-7 text-stone-400"
        />

        <!-- Profile dropdown -->
        <div>
          <Menu
            as="div"
            class="flex items-center"
          >
            <MenuButton class="bg-white rounded-full  flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500">
              <span class="sr-only">Open user menu</span>
              <span class="rounded-full border border-gray-100">
                <img
                  class="h-8 w-8 rounded-full border-white border-2"
                  :src="getImageUrl('media/ds.jpg')"
                  alt=""
                >
              </span>
            </MenuButton>
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems class="origin-top-left flex flex-col absolute z-10 right-6 mt-2 divide-y divide-gray-200 -ml-4 top-8  w-64 rounded shadow-lg  bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="px-4 py-3">
                  <p class="text-xs">
                    Angemeldet als
                  </p>
                  <p class="text-sm font-medium text-gray-900 truncate pt-0.5">
                    {{ authUser.email }}
                  </p>
                </div>
                <div class="flex flex-col">
                  <stormy-menu-item
                    icon="user"
                    label="Profil"
                    shortcut="Strg + K"
                  />
                  <stormy-menu-item
                    icon="password"
                    label="Kennwort ändern"
                  />
                </div>
                <div class="flex flex-col">
                  <stormy-menu-item
                    href="/auth/logout"
                    icon="log-out"
                    label="Abmelden"
                  />
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { usePage } from '@inertiajs/inertia-vue3'
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'
import AppTimerWidget from './AppTimerWidget.vue'
import { useTemplateFilter } from '@/composables/useTemplateFilter.js'
const authUser = usePage().props.value.auth.user
const timers = usePage().props.value.timers

const { getImageUrl } = useTemplateFilter()

const timer = computed(() => {
  const timerArray = JSON.parse(JSON.stringify(timers)).timers
  if (timerArray && timerArray.length) {
    return timerArray[0]
  }
  return null
})
</script>
