import { computed } from 'vue'

export function useButton (props) {
  const variants = {
    outline: 'shadow-sm border border-neutral-200 rounded relative text-neutral-900 bg-transparent hover:bg-neutral-100 hover:border-neutral-300  focus:border-transparent focus:outline-none focus:ring-2 ring-offset-white focus:ring-blue-500 active:bg-neutral-200',
    primary: 'shadow-sm border border-transparent rounded relative text-white bg-blue-600 hover:bg-blue-500  focus:border-white focus:outline-none focus:ring-2 ring-offset-white focus:ring-blue-500 active:bg-blue-700',
    solid: 'shadow-sm border border-neutral-200 rounded relative text-neutral-900 bg-neutral-100 hover:bg-neutral-100 hover:border-neutral-300  focus:border-transparent focus:outline-none focus:ring-2 ring-offset-white focus:ring-blue-500 active:bg-neutral-200',
    light: 'shadow-sm border border-transparent rounded relative text-neutral-900 bg-neutral-100 hover:bg-neutral-200 hover:border-transparent  focus:border-transparent focus:outline-none focus:ring-2 ring-offset-white focus:ring-blue-500 active:bg-neutral-300',
    ghost: 'border border-transparent rounded text-center text-neutral-900 bg-transparent hover:bg-neutral-100 hover:border-neutral-300 focus:outline-none focus:ring-2 ring-offset-white focus:ring-blue-500 active:bg-neutral-200',
    danger: 'border border-transparent rounded text-center text-neutral-900 bg-transparent hover:bg-neutral-100 hover:text-red-600 hover:border-red-300 focus:outline-none focus:ring-2 ring-offset-white focus:ring-red-500 active:bg-neutral-200 focus:text-red-600',
    disabled: 'border-transparent rounded text-center text-neutral-400 cursor-not-allowed'
  }

  const sizes = {
    lg: 'leading-5 h-10 w-10',
    md: 'leading-5 h-8 w-8',
    sm: 'leading-5 h-6 w-6'
  }

  const iconSizes = {
    lg: 'h-6 w-6 ',
    sm: 'h-4 w-4',
    md: 'h-5 h-5'
  }

  const getClasses = computed(() => getVariant.value + ' ' + getSize.value)
  const getVariant = computed(() => props.disabled ? variants.disabled : variants[props.variant])
  const getSize = computed(() => sizes[props.size])
  const getIconSize = computed(() => iconSizes[props.size])

  return { getClasses, getIconSize }
}
