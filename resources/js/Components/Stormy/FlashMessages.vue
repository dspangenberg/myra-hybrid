<template>
  <div class="">
    <div
      v-if="$page.props.flash.success && show"
      class="mb-8 flex items-center justify-between bg-green-400 rounded"
    >
      <div class="flex items-center">
        <svg
          class="ml-4 mr-2 flex-shrink-0 w-4 h-4 fill-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <polygon points="0 11 2 9 7 14 18 3 20 5 7 18" />
        </svg>
        <div class="py-4 text-white text-sm font-medium">
          {{ $page.props.flash.success }}
        </div>
      </div>
      <button
        type="button"
        class="group mr-2 p-2"
        @click="show = false"
      >
        <svg
          class="block w-3 h-3 fill-green-800 group-hover:fill-white"
          xmlns="http://www.w3.org/2000/svg"
          width="235.908"
          height="235.908"
          viewBox="278.046 126.846 235.908 235.908"
        >
          <path
            d="M506.784 134.017c-9.56-9.56-25.06-9.56-34.62 0L396 210.18l-76.164-76.164c-9.56-9.56-25.06-9.56-34.62 0-9.56 9.56-9.56 25.06 0 34.62L361.38 244.8l-76.164 76.165c-9.56 9.56-9.56 25.06 0 34.62 9.56 9.56 25.06 9.56 34.62 0L396 279.42l76.164 76.165c9.56 9.56 25.06 9.56 34.62 0 9.56-9.56 9.56-25.06 0-34.62L430.62 244.8l76.164-76.163c9.56-9.56 9.56-25.06 0-34.62z"
          />
        </svg>
      </button>
    </div>
    <div
      v-if="$page.props.flash.error && show"
      class="rounded-md bg-red-50 p-2 border border-red-200 my-6 relative"
    >
      <div class="absolute -right-1 top-0">
        <button
          type="button"
          class="group mr-2 p-2"
          @click="show = false"
        >
          <svg
            class="block w-2 h-2 fill-red-800 group-hover:fill-red-200"
            xmlns="http://www.w3.org/2000/svg"
            width="235.908"
            height="235.908"
            viewBox="278.046 126.846 235.908 235.908"
          >
            <path
              d="M506.784 134.017c-9.56-9.56-25.06-9.56-34.62 0L396 210.18l-76.164-76.164c-9.56-9.56-25.06-9.56-34.62 0-9.56 9.56-9.56 25.06 0 34.62L361.38 244.8l-76.164 76.165c-9.56 9.56-9.56 25.06 0 34.62 9.56 9.56 25.06 9.56 34.62 0L396 279.42l76.164 76.165c9.56 9.56 25.06 9.56 34.62 0 9.56-9.56 9.56-25.06 0-34.62L430.62 244.8l76.164-76.163c9.56-9.56 9.56-25.06 0-34.62z"
            />
          </svg>
        </button>
      </div>

      <div class="flex items-center">
        <div class="flex-shrink-0">
          <XCircleIcon
            class="h-7 w-7 text-red-400"
            aria-hidden="true"
          />
        </div>

        <div class="flex-1 flex flex-col pl-2">
          <h3 class="text-sm font-semibold text-red-800">
            {{ $page.props.flash.error.title }}
          </h3>
          <div class="mt-1.5 text-sm text-red-700 font-medium">
            {{ $page.props.flash.error.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, reactive } from 'vue'
import { usePage } from '@inertiajs/inertia-vue3'
import { XCircleIcon } from '@heroicons/vue/solid'

const show = ref(true)
const flash = reactive(usePage().props.value.flash)

watch(flash, (val) => {
  show.value = true
})

</script>
