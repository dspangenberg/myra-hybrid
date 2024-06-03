<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <Listbox
    v-model="selectedItem"
    as="div"
  >
    <div class="relative ml-0.5 mt-0.5">
      <ListboxButton class="relative w-40 bg-transparent border h-8 border-transparent rounded pl-1 pr-10 py-2 text-left cursor-default  focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none sm:text-sm">
        <div class="flex items-center h-full">
          <stormy-icon
            :name="icon"
            class="h-4 w-4 text-gray-500 mx-1 flex-shrinks"
          />
          <span class="flex-1 text-gray-500 block truncate">{{ selectedItem.name }}</span>
        </div>
        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <SelectorIcon
            class="h-4 w-4 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions class="absolute z-10 mt-1  bg-white shadow-lg max-h-60 rounded-md py-1 text-sm ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          <ListboxOption
            v-for="option in options"
            :key="option.id"
            v-slot="{ active, selected }"
            as="template"
            :value="option"
          >
            <li :class="[active ? 'text-white bg-indigo-600' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-8 pr-4']">
              <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                {{ option.name }}
              </span>

              <span
                v-if="selected"
                :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 left-0 flex items-center pl-1.5']"
              >
                <CheckIcon
                  class="h-5 w-5"
                  aria-hidden="true"
                />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'
import { useProp } from '@/composables/useProp.js'

const emit = defineEmits(['update'])

const props = defineProps({
  value: useProp(Number),
  icon: useProp(String),
  options: {
    type: Array,
    default: () => []
  }
})

const selectedItem = ref(props.options.find(item => item.id === props.value))

watch(selectedItem, (value) => {
  emit('update', value.id)
})

</script>
