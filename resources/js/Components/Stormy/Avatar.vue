<template>
  <span
    v-if="initials"
    class="inline-flex items-center justify-center rounded-full"
    :style="style"
  >
    <span
      class="font-semibold text-white"
    >
      {{ initials }}
    </span>
  </span>
</template>
<script>
const colors = ['#00bcf2', '#0078d4', '#002050', '#008272',
  '#bad80a', '#004b1c', '#e3008c', '#b4a0ff', '#5c2d91',
  '#000000', '#d83b01', '#e81123', '#a80000',
  '#e81123', '#5c005c', '#b4a0ff', '#00188f']

function numberFromText (text) {
  // numberFromText("AA");
  const charCodes = text
    .split('') // => ["A", "A"]
    .map(char => char.charCodeAt(0)) // => [65, 65]
    .join('') // => "6565"
  return charCodes
}

export default {
  props: {
    initials: {
      type: String,
      default: ''
    },
    fullname: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 26
    }
  },
  computed: {
    style () {
      return {
        width: this.size + 'px',
        height: this.size + 'px',
        fontSize: (this.size / 2.5) + 'px',
        lineHeight: 1,
        backgroundColor: colors[numberFromText(this.fullname) % colors.length]
      }
    }
  }
}
</script>
