<template>
  <div class="bg-transparent pl-4 pr-1 py-3 flex items-center justify-between">
    <div
      v-if="meta.total > 0"
      class="flex-1 flex justify-between sm:hidden"
    >
      <component
        :is="prevPage ? 'inertia-link' : 'button'"
        :href="prevPage"
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
      >
        Previous
      </component>
      <component
        :is="nextPage ? 'inertia-link' : 'button'"
        :href="nextPage"
        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
      >
        Next
      </component>
    </div>
    <p
      v-else
      class="sm:hidden text-sm leading-5 text-gray-700 mb-0"
    >
      No results found <span class="font-mono">¯\_(ツ)_/¯</span>
    </p>

    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p
          v-if="meta.total > 0"
          class="text-sm leading-5 text-gray-700 mb-0"
        >
          Zeige
          <span class="font-medium">{{ meta.from }}</span>
          bis
          <span class="font-medium">{{ meta.to }}</span>
          von
          <span class="font-medium">{{ meta.total }}</span>
          Datensätzen
        </p>
        <p
          v-else
          class="text-sm leading-5 text-gray-700 mb-0"
        >
          No results found <span class="font-mono">¯\_(ツ)_/¯</span>
        </p>
      </div>
      <div>
        <nav
          v-if="pageLinks.length > 1"
          class="relative z-0 inline-flex shadow-sm"
        >
          <component
            :is="prevPage ? 'inertia-link' : 'button'"
            :href="prevPage"
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
            aria-label="Previous"
          >
            <svg
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </component>

          <component
            :is="link.label ? 'inertia-link' : 'span'"
            v-for="link in pageLinks"
            :key="link.url"
            :href="link.url"
            class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 transition ease-in-out duration-200"
            :class="{
              'bg-blue-50 hover:bg-gray-50': link.active,
              'hover:bg-gray-100 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700': link.label
            }"
          >
            {{ link.label || '...' }}
          </component>

          <component
            :is="nextPage ? 'inertia-link' : 'button'"
            :href="nextPage"
            class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
            aria-label="Next"
          >
            <svg
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </component>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { range } from 'lodash'
import qs from 'qs'

// https://gist.github.com/grantholle/cb3682735ff4a0c27ab795a6cb89d152

export default {
  props: {
    meta: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    pageLinks () {
      const pageLimit = 7
      const parsed = qs.parse(window.location.search.substr(1))

      console.log(range(1, this.meta.last_page + 1))

      const pageRange = range(1, this.meta.last_page + 1).map(page => {
        parsed.page = page

        const pPage = this.meta.range.find(item => item.page === page)

        return {
          label: page,
          url: pPage.url,
          active: pPage.isActive
        }
      })

      return pageRange.length > pageLimit
        ? this.trimPageRange(pageRange)
        : pageRange
    },

    prevPage () {
      return this.meta.previous_page_url
    },

    nextPage () {
      return this.meta.next_page_url
    }
  },

  methods: {
    trimPageRange (pageRange) {
      // If it's the first or last page, just get the beginning and end
      if (this.meta.current_page < 3 || this.meta.current_page > pageRange.length - 2) {
        const beginning = pageRange.slice(0, 3)
        beginning.push({ url: '#' })
        const end = pageRange.slice(pageRange.length - 3)

        return beginning.concat(end)
      }

      const first = pageRange.slice(0, 1)
      first.push({ url: '#' })

      const middle = pageRange.slice(this.meta.current_page - 2, this.meta.current_page + 1)
      middle.push({ url: '#1' })

      const last = pageRange.slice(pageRange.length - 1)

      return first.concat(middle, last)
    }
  }
}
</script>
