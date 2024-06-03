<template>
  <div v-if="contact.phones.length || contact.emails.length">
    <stormy-page-side title="Kommunikation">
      <stormy-dl-item
        v-for="email of contact.emails"
        :key="email.id"
        :label="email.category.name"
        :value="email.email"
      />
      <stormy-dl-item
        v-for="phone of contact.phones"
        :key="phone.id"
        :label="phone.category.name"
        :value="phone.phone"
      />
    </stormy-page-side>
  </div>
</template>
<script setup>

defineProps({
  contact: {
    type: Object,
    default: () => {}
  }
})
</script>
