<template>
  <MenuItem v-slot="{ active }">
    <a
      :href="href"
      :class="[active ? 'bg-gray-100' : '', danger ? 'hover:bg-red-100 !hover:text-red-600' : '', 'w-full flex items-center rounded-sm px-2 py-2 text-sm text-gray-700']"
    >
      <div class="flex-shrink-0 items-center">
        <div class="w-7">
          <stormy-icon
            v-if="icon"
            :name="icon"
            class="w-5 h-5  text-gray-500"
          />
        </div>
      </div>
      <div class="flex-1 text-left text-gray-800">
        <slot>
          {{ label }}
        </slot>
      </div>
      <div class="flex-shrink-0 items-center">
        <slot name="shortcut">
          <span class="ml-auto pl-3 flex-none text-sm text-gray-400">
            {{ shortcut }}
          </span>
        </slot>
      </div>
    </a>
  </MenuItem>
</template>
<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

defineProps({
  color: { type: String, default: 'gray' },
  icon: { type: String, default: '' },
  href: { type: String, default: '#' },
  label: { type: String, default: '' },
  shortcut: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  danger: { type: Boolean, default: false }
})

</script>
