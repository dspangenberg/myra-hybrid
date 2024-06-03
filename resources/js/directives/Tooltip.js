const tooltipDirective = (app) => {
  app.directive('tooltip', {
    mounted (el, binding) {
      init(el, binding)
    },
    updated (el, binding) {
      init(el, binding)
    }
  })
}

function init (el, binding) {
  const position = binding.arg || 'bottom'
  const tooltipText = binding.value || 'Tooltip text'
  el.setAttribute('position', position)
  el.setAttribute('tooltip', tooltipText)
}

export default init
