<template>
  <div>
    <jet-label
      :label="label"
    />
    <div class="mt-0.5 relative rounded">
      <input
        ref="inputRef"
        class="w-full text-sm font-regular placeholder-gray-400 border border-gray-300 rounded py-1.5 px-1.5 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none "
        :class="[label ? 'mt-0.5' : '']"
        :value="modelValue"
        autocomplete="off"
        :autofocus="autofocus"
        :name="name"
        type="text"
        @input="$emit('update:modelValue', $event.target.value)"
      >
      <div class="absolute inset-y-0 right-0 pr-1.5 pt-0.5 flex items-center">
        <template v-if="showClear || showNow">
          <stormy-icon-button
            v-if="getIcon"
            :icon="getIcon"
            size="sm"
            variant="ghost"
            @click="secondaryActionClicked"
          />
        </template>
        <stormy-icon-button
          icon="tabler-icon-calendar-event"
          size="sm"
          variant="ghost"
          @click="showPicker"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useProp } from '@/composables/useProp.js'
import AirDatepicker from 'air-datepicker'
import 'air-datepicker/air-datepicker.css'
import localeDe from 'air-datepicker/locale/de'
import { DateTime } from 'luxon'

const emit = defineEmits(['update:modelValue'])
const inputRef = ref()
const picker = ref()

const showPicker = () => {
  if (picker.value.visible) {
    return picker.value.hide()
  }
  console.log(picker.value)
  picker.value.startDate = props.modelValue || DateTime.now()
  picker.value.show()
}

onMounted(() => {
  picker.value = new AirDatepicker(inputRef.value, {
    timepicker: true,
    timeFormat: 'HH:mm',
    locale: localeDe,
    buttons: 'today',
    onSelect: (event) => {
      emit('update:modelValue', event.formattedDate)
    },
    showEvent: 'dblclick',
    navTitles: {
      days: 'MMMM yyyy',
      months: 'yyyy',
      years: 'yyyy1 - yyyy2'
    }
  })
})

const getIcon = computed(() => {
  if (props.showClear && props.modelValue) {
    return 'tabler-icon-x'
  }
  if (props.showNow) {
    return 'tabler-icon-player-stop'
  }
  return null
})

const secondaryActionClicked = () => {
  if (getIcon.value === 'tabler-icon-x') {
    emit('update:modelValue', null)
  }
  if (getIcon.value === 'tabler-icon-player-stop') {
    emit('update:modelValue', DateTime.now().toFormat('dd.MM.yyyy HH:mm'))
  }
}

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  name: useProp(String),
  autofocus: useProp(Boolean, false),
  showClear: useProp(Boolean, false),
  showNow: useProp(Boolean, false),
  label: useProp(String)
})

</script>
