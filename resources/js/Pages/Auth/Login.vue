<template>
  <div>
    <img
      class="h-12 w-12 rounded-full shadow-md mx-auto"
      :src="getImageUrl('media/tw.png')"
      alt="Workflow"
    >
  </div>
  <div class="mt-6">
    <div>
      <stormy-flash-messages />
      <div class="mt-6">
        <form
          @submit.prevent="login"
        >
          <div class="space-y-2">
            <div>
              <jet-input
                v-model="form.email"
                label="E-Mail-Adresse:"
                type="email"
              />
            </div>
            <div>
              <jet-input
                v-model="form.password"
                label="Kennwort:"
                type="password"
                autocomplete="currrent-password"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="flex-shrink content-center">
                <input
                  id="remember"
                  v-model="form.remember"
                  type="checkbox"
                  class="h-4 w-4 text-blue-600   border-gray-300 rounded focus:border-blue-400 focus:ring-2 focus:ring-blue-200 "
                >
              </div>
              <div class="flex-1 content-center">
                <label
                  for="remember"
                  class="ml-1.5 font-medium text-sm text-gray-600"
                >
                  Angemeldet bleiben
                </label>
              </div>
            </div>

            <div class="text-sm">
              <a
                href="#"
                class="font-medium py-0.5 px-1 text-blue-600 rounded hover:text-blue-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none hover:border-blue-400"
              >
                Kennwort vergessen?
              </a>
            </div>
          </div>

          <div class="-mt-2">
            <button
              type="submit"
              class="w-full mt-6 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 focus:border-white focus:ring-2 focus:ring-blue-200 focus:outline-none"
            >
              Anmelden
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useForm } from '@inertiajs/inertia-vue3'
import { useTemplateFilter } from '@/composables/useTemplateFilter.js'

const form = useForm({
  email: '',
  password: '',
  rembemer: ''
})

const { getImageUrl } = useTemplateFilter()

const login = () => {
  form.post('/auth/login')
}
</script>
