<template>
  <span
    :tooltip="tooltipText"
    :position="position"
    style="z-index: 0;"
  ><slot /></span>
</template>

<script>
export default {
  name: 'ToolTip',
  props: {
    tooltipText: {
      type: String,
      default: 'Tooltip text'
    },
    position: {
      default: 'top',
      type: String
    }
  }
}
</script>
