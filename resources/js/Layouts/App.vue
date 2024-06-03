<template>
  <div class="h-screen overflow-hidden flex flex-col w-screen bg-white">
    <div class="flex-1 flex w-screen overflow-hidden">
      <AppSidebar class="print:hidden print:w-0">
        <AppSidebarMenu />
        <template #bottom>
          <stormy-nav-group>
            <stormy-nav-item
              :disabled="true"
              name="Einstellungen"
              icon="tabler-icon-settings"
            />
          </stormy-nav-group>
        </template>
      </AppSidebar>
      <div class="flex-1 flex flex-col print:flex-shrink-0">
        <div class="flex-shrink-1 bg-stone-50 py-1.5 px-2 print:hidden">
          <AppHeader />
        </div>
        <div class="flex-1 overflow-hidden border-gray-100 border-b bg-white flex flex-col justify-between">
          <slot />
        </div>
      </div>
    </div>
    <div class="flex-shrink-1 bg-gray-100 border-gray-200 border-t print:hidden">
      <AppFooter />
    </div>
  </div>
</template>

<script setup>
// import { io } from 'socket.io-client'

import AppSidebar from './AppSidebar.vue'
import AppSidebarMenu from './AppSidebarMenu.vue'
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
/*
const socket = io(import.meta.env.VITE_WS_URL, {})
// client-side
socket.on('connect', () => {
  console.log(socket.id) // x8WIv7-mJelg7on_ALbx
})

socket.on('disconnect', () => {
  console.log(socket.id) // undefined
})

socket.on('news', (data) => {
  console.log(data)
  socket.emit('my other event', { my: 'data' })
})
*/
</script>
