<template>
  <div class="inline hover:text-gray-700 cursor-pointer my-3 text-gray-400 text-sm font-medium px-3">
    <Link
      v-if="href"
      :href="href"
      class="inline-flex items-center"
      preserve-state
    >
      <stormy-icon
        :stroke-width="2"
        name="tabler-icon-arrow-narrow-left"
        class="w-5 h-5 mr-1"
      />
      <span>
        <slot />
      </span>
    </Link>
    <div
      v-else
      class="inline-flex items-center"
      @click="$emit('canceled')"
    >
      <stormy-icon
        :stroke-width="2"
        name="tabler-icon-arrow-narrow-left"
        class="w-5 h-5 mr-1"
      />
      <span>
        <slot />
      </span>
    </div>
  </div>
</template>
<script setup>
defineEmits(['canceled'])
defineProps({
  href: {
    type: String,
    default: '#'
  }
})
</script>
