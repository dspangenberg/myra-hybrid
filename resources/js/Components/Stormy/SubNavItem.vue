<template>
  <div>
    <a
      :class="[disabled ? 'text-gray-300 !cursor-not-allowed' : current ? 'font-regular' : 'text-gray-500 hover:underline', 'rounded focus:border-blue-400 focus:ring-1 focus:ring-blue-200 focus:outline-none cursor-pointer group flex items-center px-4 py-2rounded-md']"
      :aria-current="current ? 'page' : undefined"
      href="#"
    >
      <span class="truncate hover:underline">
        {{ name }}
      </span>
      <span
        v-if="!disabled && badge"
        class="ml-auto text-right font-normal text-sm"
      >
        {{ badge }}
      </span>
    </a>
    <div :class="[withSep ? 'space-y-1 border-b border-gray-100 pb-2 ml-3' : '']" />
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import StatusDot from '@/Components/Mijin/StatusDot.vue'

defineProps({
  name: { type: String, default: '' },
  icon: { type: String, default: '' },
  badgeColor: { type: String, default: 'red' },
  withSep: { type: Boolean, default: false },
  current: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  badgeAnimate: { type: Boolean, default: false },
  badge: { type: String, default: '' }
})

</script>
