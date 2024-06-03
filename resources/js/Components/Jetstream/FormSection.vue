<template>
  <div class="md:grid md:grid-cols-3 md:gap-3">
    <div class="mt-6">
      <jet-section-title>
        <template #title>
          <slot name="title" />
        </template>
        <template #description>
          <slot name="description" />
        </template>
      </jet-section-title>
    </div>

    <div class="md:mt-0 md:col-span-2 pb-3">
      <div
        class="pt-6 pb-6 bg-white shadow"
        :class="hasActions ? 'sm:rounded-tl-md sm:rounded-tr-md' : 'sm:rounded-md'"
      >
        <div>
          <slot name="form" />
        </div>
      </div>
      <div
        v-if="hasActions"
        class="flex items-center justify-end px-4 py-3 bg-neutral-50 text-right sm:px-6 shadow sm:rounded-bl-md sm:rounded-br-md"
      >
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, useSlots } from 'vue'
import JetSectionTitle from './SectionTitle.vue'
defineEmits(['submitted'])

const hasActions = computed(() => !!$slots.actions)

const $slots = useSlots()
</script>
