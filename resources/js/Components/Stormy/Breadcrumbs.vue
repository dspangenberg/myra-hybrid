<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <nav
    class="flex my-1.5 items-center mx-3"
    aria-label="Breadcrumb"
  >
    <ol
      role="list"
      class="flex items-center space-x-1"
    >
      <li>
        <div>
          <a
            href="#"
            class="text-gray-400 hover:text-gray-700"
          >
            <stormy-icon
              :stroke-width="1.5"
              name="tabler-icon-gauge"
              class="flex-shrink-0 h-5 w-5"
            />
            <span class="sr-only">Home</span>
          </a>
        </div>
      </li>
      <li
        v-for="page in pages"
        :key="page.name"
      >
        <div class="flex items-center">
          <stormy-icon
            :stroke-width="1.5"
            name="tabler-icon-chevron-right"
            class="flex-shrink-0 h-3 w-3 text-gray-400"
          />
          <a
            :href="page.href"
            class="ml-0.5 text-sm font-medium text-gray-400 leading-none hover:text-gray-700 max-w-xs truncate max-w-36"
            :aria-current="page.current ? 'page' : undefined"
          >{{ page.name }}</a>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const pages = ref([
  { name: 'Accounts + Kontakte', href: '#', current: false },
  { name: 'Deutsche Arbeitsgemeinschaft niedergelassener Ärzte in der Versorgung HIV-Infizierter (dagnä) e.V.', href: '#', current: true },
  { name: 'Bernhard Schmiderer', href: '#', current: true },
  { name: 'Details', href: '#', current: true }
])
</script>
