<template>
  <form
    action="#"
    class="relative bg-gray-50"
  >
    <div class="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
      <label
        for="description"
        class="sr-only"
      >Description</label>
      <textarea
        id="description"
        rows="2"
        name="description"
        class="block w-full pt-2.5 border-0 py-0 resize-none bg-gray-50 placeholder-gray-500 focus:ring-0 sm:text-sm"
        placeholder="Kein Romane, aber ganze Sätze"
      />

      <!-- Spacer element to match the height of the toolbar -->
      <div aria-hidden="true">
        <div class="py-2">
          <div class="h-9" />
        </div>
        <div class="h-px" />
        <div class="py-2">
          <div class="py-px">
            <div class="h-9" />
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-0 inset-x-px">
      <!-- Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. -->
      <div class="flex flex-nowrap justify-end py-2 px-2 space-x-2 sm:px-3">
        <Listbox
          v-model="assigned"
          as="div"
          class="flex-shrink-0"
        >
          <ListboxLabel class="sr-only">
            Assign
          </ListboxLabel>
          <div class="relative">
            <ListboxButton class="relative inline-flex items-center rounded py-0.5 px-0.5 bg-gray-50 text-xs font-medium text-gray-500 whitespace-nowrap hover:bg-gray-100 sm:px-3">
              <UserCircleIcon
                v-if="assigned.value === null"
                class="flex-shrink-0 h-5 w-5 text-gray-300 sm:-ml-1"
                aria-hidden="true"
              />

              <img
                v-else
                :src="assigned.avatar"
                alt=""
                class="flex-shrink-0 h-5 w-5 rounded-full"
              >

              <span :class="[assigned.value === null ? '' : 'text-gray-900', 'hidden truncate sm:ml-2 sm:block']">{{ assigned.value === null ? 'Zugewiesen' : assigned.name }}</span>
            </ListboxButton>

            <transition
              leave-active-class="transition ease-in duration-100"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions class="absolute right-0 z-10 mt-1 w-52 bg-white shadow max-h-56 rounded-lg py-3 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                <ListboxOption
                  v-for="assignee in assignees"
                  :key="assignee.value"
                  v-slot="{ active }"
                  as="template"
                  :value="assignee"
                >
                  <li :class="[active ? 'bg-gray-100' : 'bg-white', 'cursor-default select-none relative py-2 px-3']">
                    <div class="flex items-center">
                      <img
                        v-if="assignee.avatar"
                        :src="assignee.avatar"
                        alt=""
                        class="flex-shrink-0 h-5 w-5 rounded-full"
                      >
                      <UserCircleIcon
                        v-else
                        class="flex-shrink-0 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span class="ml-3 block font-medium truncate">
                        {{ assignee.name }}
                      </span>
                    </div>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>

        <Listbox
          v-model="labelled"
          as="div"
          class="flex-shrink-0"
        >
          <ListboxLabel class="sr-only">
            Add a label
          </ListboxLabel>
          <div class="relative">
            <ListboxButton class="relative inline-flex items-center rounded py-0.5 px-0.5 bg-gray-50 text-xs font-medium text-gray-500 whitespace-nowrap hover:bg-gray-100 sm:px-3">
              <TagIcon
                :class="[labelled.value === null ? 'text-gray-300' : 'text-gray-500', 'flex-shrink-0 h-5 w-5 sm:-ml-1']"
                aria-hidden="true"
              />
              <span :class="[labelled.value === null ? '' : 'text-gray-900', 'hidden truncate sm:ml-2 sm:block']">{{ labelled.value === null ? 'Label' : labelled.name }}</span>
            </ListboxButton>

            <transition
              leave-active-class="transition ease-in duration-100"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions class="absolute right-0 z-10 mt-1 w-52 bg-white shadow max-h-56 rounded-lg py-3 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                <ListboxOption
                  v-for="label in labels"
                  :key="label.value"
                  v-slot="{ active }"
                  as="template"
                  :value="label"
                >
                  <li :class="[active ? 'bg-gray-100' : 'bg-white', 'cursor-default select-none relative py-2 px-3']">
                    <div class="flex items-center">
                      <span class="block font-medium truncate">
                        {{ label.name }}
                      </span>
                    </div>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>

        <Listbox
          v-model="dated"
          as="div"
          class="flex-shrink-0"
        >
          <ListboxLabel class="sr-only">
            Add a due date
          </ListboxLabel>
          <div class="relative">
            <ListboxButton class="relative inline-flex items-center rounded py-0.5 px-0.5 bg-gray-50 text-xs text-gray-500 whitespace-nowrap hover:bg-gray-100 sm:px-3">
              <CalendarIcon
                :class="[dated.value === null ? 'text-gray-300' : 'text-gray-500', 'flex-shrink-0 h-5 w-5 sm:-ml-1']"
                aria-hidden="true"
              />
              <span :class="[dated.value === null ? '' : 'text-gray-900', 'hidden truncate sm:ml-2 sm:block']">{{ dated.value === null ? 'Fälligkeit' : dated.name }}</span>
            </ListboxButton>

            <transition
              leave-active-class="transition ease-in duration-100"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions class="absolute right-0 z-10 mt-1 w-52 bg-white shadow max-h-56 rounded-lg py-3 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                <ListboxOption
                  v-for="dueDate in dueDates"
                  :key="dueDate.value"
                  v-slot="{ active }"
                  as="template"
                  :value="dueDate"
                >
                  <li :class="[active ? 'bg-gray-100' : 'bg-white', 'cursor-default select-none relative py-2 px-3']">
                    <div class="flex items-center">
                      <span class="block font-medium truncate">
                        {{ dueDate.name }}
                      </span>
                    </div>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
      </div>
      <div class="border-t border-gray-200 px-2 py-2 flex justify-between items-center space-x-3 sm:px-3">
        <div class="flex">
          <button
            type="button"
            class="-ml-2 -my-2 rounded px-3 py-0.5 inline-flex items-center text-left text-gray-400 group"
          >
            <PaperClipIcon
              class="-ml-1 h-4 w-4 mr-2 group-hover:text-gray-500"
              aria-hidden="true"
            />
            <span class="text-sm text-gray-500 group-hover:text-gray-600">Datei anhängen</span>
          </button>
        </div>
        <div class="flex-shrink-0">
          <button
            type="submit"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Notiz hinzufügen
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CalendarIcon, PaperClipIcon, TagIcon, UserCircleIcon } from '@heroicons/vue/solid'

const assignees = [
  { name: 'Unassigned', value: null },
  {
    name: 'Wade Cooper',
    value: 'wade-cooper',
    avatar:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
  // More items...
]
const labels = [
  { name: 'Unlabelled', value: null },
  { name: 'Engineering', value: 'engineering' }
  // More items...
]
const dueDates = [
  { name: 'No due date', value: null },
  { name: 'Today', value: 'today' }
  // More items...
]

export default {
  components: {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
    CalendarIcon,
    PaperClipIcon,
    TagIcon,
    UserCircleIcon
  },
  setup () {
    const assigned = ref(assignees[0])
    const labelled = ref(labels[0])
    const dated = ref(dueDates[0])

    return {
      assignees,
      labels,
      dueDates,
      assigned,
      labelled,
      dated
    }
  }
}
</script>
