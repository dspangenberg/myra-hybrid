<template>
  <div
    v-if="value"
    class="pt-2 first:pt-1 px-4"
  >
    <dl v-if="type === 'v'">
      <dt
        :class="dtClass"
        class="text-gray-400 text-xxs"
      >
        {{ label }}
      </dt>
      <dd
        :class="ddClass"
        class="mt-0.5  text-gray-900"
      >
        <p class="leading-snug text-xs font-medium">
          <slot>
            <template v-if="link">
              <a
                :href="link"
                target="_blank"
                class="hover:underline"
              >
                {{ value }}
              </a>
            </template>
            <template v-else>
              {{ value }}
            </template>
          </slot>
        </p>
      </dd>
    </dl>
    <div
      v-else
      class="grid grid-cols-3 gap-x-1 gap-y-4"
    >
      <div
        :class="dtClass"
        class="text-gray-400 truncat"
      >
        {{ label }}
      </div>
      <div
        :class="ddClass"
        class="col-span-2 text-gray-600 font-semibold"
      >
        <slot>
          <template v-if="link">
            <a
              :href="link"
              target="_blank"
              class="hover:underline"
            >
              {{ value }}
            </a>
          </template>
          <template v-else>
            {{ value }}
          </template>
        </slot>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number, Boolean, null],
    required: true
  },
  link: {
    type: String,
    default: ''
  },
  forceEmpty: {
    type: Boolean,
    default: false
  },
  dtClass: {
    type: String,
    default: ''
  },
  ddClass: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'v',
    validator: (value) => ['v', 'h'].includes(value)
  }
})
</script>
