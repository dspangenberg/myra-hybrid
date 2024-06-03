<template>
  <stormy-list-box>
    <template
      v-for="(contact, index) in contacts"
      :key="index"
    >
      <ContactsListItem
        :contact="contact"
      />
    </template>
  </stormy-list-box>
  <stormy-pagination
    :meta="meta"
  />
  <div class="h-6" />
</template>

<script setup>
import ContactsListItem from './ContactsListItem.vue'

defineProps({
  contacts: {
    type: Array,
    default: () => []
  },
  meta: {
    type: Object,
    default: () => {}
  }
})
</script>
