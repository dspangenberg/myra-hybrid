<template>
  <div>
    <Link
      :class="[disabled ? 'text-gray-300 cursor-not-allowed' : isActive ? 'bg-stone-200 hover:bg-blue-50 text-gray-600' : 'text-gray-500 hover:bg-stone-200/50 hover:text-gray-600', 'cursor-pointer group flex items-center px-2 py-1.5 text-sm font-medium  rounded-md']"
      :href="href"
      preserve-state
    >
      <stormy-icon
        :name="icon"
        :class="[disabled ? 'text-gray-400' : active ? 'text-gray-600' : 'text-gray-500 group-hover:text-gray-900', 'flex-shrink-0 mr-1.5 h-5 w-5 ']"
        :stroke-width="strokeWidth"
      />
      <span class="truncate">
        {{ name }}
      </span>
      <template
        v-if="!disabled && count"
      >
        <StatusDot
          :animate="animate"
          :color="color"
          class="ml-auto text-right mr-4"
        />
      </template>
    </Link>
    <div
      v-if="!disabled && (active || open)"
      class="text-sm ml-5 my-2 font-normal text-gray-500 space-y-2"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import StatusDot from '@/Components/Mijin/StatusDot.vue'
import { useInertiajs } from '@/composables/useInertiajs'

const props = defineProps({
  name: { type: String, default: '' },
  icon: { type: String, default: '' },
  href: { type: String, default: '#' },
  color: { type: String, default: 'red' },
  active: { type: Boolean, default: false },
  open: { type: Boolean, default: false },
  exact: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  animate: { type: Boolean, default: false },
  count: { type: String, default: '' },
  strokeWidth: { type: Number, default: 1.5 }
})

const { currentRoute, isCurrent, $route } = useInertiajs()

const isActive = computed(() => {
  if (props.href) {
    if (props.exact) {
      return props.href === $route().path
    }
    return props.href === $route().path || $route().path.startsWith(props.href)
  }
  return false
})
</script>
