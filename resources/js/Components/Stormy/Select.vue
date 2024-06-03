<template>
  <div
    v-click-away="closeListbox"
    class="relative"
    @keydown.escape="closeListbox"
  >
    <span class="inline-block w-full rounded-md shadow-sm">
      <button
        ref="buttonRef"
        :aria-expanded="open"
        aria-haspopup="listbox"
        class="relative z-0 w-full py-2 pl-3 pr-10 text-left transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md cursor-default focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-200 focus-within:outline-none sm:text-sm sm:leading-5"
        @click="toggleListboxVisibility()"
        @keydown.down.stop="!open ? toggleListboxVisibility() : ''"
      >
        <span
          v-show="!open"
          :class="{ 'text-gray-500': ! (value in options) }"
          class="block truncate"
          v-text="value in options ? options[value] : placeholder"
        />

        <input
          v-show="open"
          ref="searchRef"
          v-model="search"
          type="search"
          class="w-full h-full fill-gray-500 text-sm px-0 border-0 focus:border-0 focus:outline-none focus:ring-0 py-0 my-0 leading-none"
          @keydown.down.prevent="focusNextOption()"
          @keydown.up.prevent="focusPreviousOption()"
          @keydown.enter.stop="selectOption(focusedOptionIndex)"
        >

        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            class="w-5 h-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M7 7l3-3 3 3m0 6l-3 3-3-3"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </button>
    </span>
    <div
      v-if="open"
      v-cloak
      transition:leave="transition ease-in duration-100"
      transition:leave-start="opacity-100"
      transition:leave-end="opacity-0"
      class="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg"
    >
      <ul
        ref="listboxRef"
        role="listbox"
        :aria-activedescendant="focusedOptionIndex ? name + 'Option' + focusedOptionIndex : null"
        tabindex="-1"
        class="py-1 overflow-auto text-base leading-6 rounded-md shadow-xs max-h-60 focus:outline-none sm:text-sm sm:leading-5"
        @keydown.enter.stop="selectOption()"
        @keyup.up.prevent="focusPreviousOption()"
        @keydown.down.prevent="focusNextOption()"
      >
        <template
          v-for="(key, index) in Object.keys(filteredOptions)"
          :key="index"
        >
          <li
            :id="name + 'Option' + focusedOptionIndex"
            role="option"
            :aria-selected="focusedOptionIndex === index"
            :class="{ 'text-white bg-indigo-600': index === focusedOptionIndex, 'text-gray-900': index !== focusedOptionIndex }"
            class="relative py-2 pl-3 text-gray-900 cursor-default select-none pr-9"
            @click="selectOption(index)"
            @mouseenter="focusedOptionIndex = index"
            @mouseleave="focusedOptionIndex = null"
          >
            <span
              :class="{ 'font-semibold': index === focusedOptionIndex, 'font-normal': index !== focusedOptionIndex }"
              class="block font-normal truncate"
              v-text="Object.values(options)[index]"
            />

            <span
              v-show="key === value"
              :class="{ 'text-white': index === focusedOptionIndex, 'text-indigo-600': index !== focusedOptionIndex }"
              class="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600"
            >
              <svg
                class="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </li>
        </template>

        <div
          v-show="! Object.keys(options).length"
          class="px-3 py-2 text-gray-900 cursor-default select-none"
          v-text="emptyOptionsMessage"
        />
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, nextTick } from 'vue'
import { useProp } from '@/composables/useProp.js'
import { directive as vClickAway } from 'vue3-click-away'

const emit = defineEmits(['update'])

const props = defineProps({
  // value: useProp(String),
  options: useProp(Object),
  emptyOptionsMessage: useProp(String, 'No results match your search.'),
  placeholder: useProp(String, 'Select an option'),
  name: useProp(String)
})

const open = ref(false)
const search = ref('')
const value = ref()
const focusedOptionIndex = ref(null)
const filteredOptions = ref(props.options)

const searchRef = ref()
const listboxRef = ref()
const buttonRef = ref()

watch(search, val => {
  console.log('***')

  /*
  if (!open.value || !value.value) {
    filteredOptions.value = props.options
    return filteredOptions.value
  }
  */
  Object.keys(props.options, key => {
    console.log(key)
  })

  /*
  focusNextOption: function () {
                        if (this.focusedOptionIndex === null) return this.focusedOptionIndex = Object.keys(this.options).length - 1

                        if (this.focusedOptionIndex + 1 >= Object.keys(this.options).length) return

                        this.focusedOptionIndex++

                        this.$refs.listbox.children[this.focusedOptionIndex].scrollIntoView({
                            block: "center",
                        })
                    },
            */
})

const focusNextOption = () => {
  if (focusedOptionIndex.value === null) {
    focusedOptionIndex.value = Object.keys(this.options).length - 1
    return focusedOptionIndex.value
  }
  if (focusedOptionIndex.value + 1 >= Object.keys(props.options).length) return 0
  focusedOptionIndex.value++
}

const focusPreviousOption = () => {
  if (focusedOptionIndex.value === null) {
    focusedOptionIndex.value = 0
    return focusedOptionIndex.value
  }
  if (focusedOptionIndex.value <= 0) return 0
  focusedOptionIndex.value--
}

const closeListbox = () => {
  open.value = false
  focusedOptionIndex.value = false
  search.value = ''
}

const selectOption = (val) => {
  console.log(val)
  if (!open.value) return toggleListboxVisibility()
  value.value = Object.keys(props.options)[val]
  closeListbox()
}

const toggleListboxVisibility = () => {
  if (open.value) return closeListbox()
  focusedOptionIndex.value = Object.keys(props.options).indexOf(value)
  if (focusedOptionIndex.value < 0) focusedOptionIndex.value = 0
  open.value = true
  nextTick(() => {
    searchRef.value.focus()
    /*
    listboxRef.value.children[focusedOptionIndex].scrollIntoView({
      block: 'nearest'
    })
    */
  })
}

</script>
