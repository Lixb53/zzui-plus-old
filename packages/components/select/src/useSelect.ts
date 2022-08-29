import { computed, reactive, ref } from 'vue'
import { useNamespace } from '@zzui/hooks'
import type { ComponentPublicInstance } from 'vue'
import type ZzTooltip from '@zzui/components/tooltip'
import type { UseSelectProps } from './select'

export function useSelectStates() {
  return reactive({
    visible: false,
  })
}
type States = ReturnType<typeof useSelectStates>
export const useSelect = (
  props: UseSelectProps,
  states: States,
  ctx: { emit: (arg0: string, arg1: Event) => void }
) => {
  const ns = useNamespace('select')

  const reference = ref<ComponentPublicInstance<{
    focus: () => void
    blur: () => void
    input: HTMLInputElement
  }> | null>(null)
  const tooltipRef = ref<InstanceType<typeof ZzTooltip> | null>(null)
  const selectWrapper = ref<HTMLElement | null>(null)

  const iconComponent = computed(() => (props.remote && props.filterable ? '' : props.suffixIcon))

  const iconReverse = computed(() => ns.is('reverse', !!iconComponent.value && states.visible))

  const handleClose = () => {
    states.visible = false
  }

  const handleFocus = () => {}

  const blur = () => {
    states.visible = false
    reference.value?.blur()
  }

  const handleBlur = (event: Event) => {
    ctx.emit('blur', event)
  }

  const toggleMenu = () => {
    states.visible = !states.visible

    if (states.visible) {
      reference.value?.focus()
    }
  }

  return {
    blur,
    iconComponent,
    iconReverse,
    handleClose,
    handleFocus,
    handleBlur,
    toggleMenu,

    // DOM ref
    reference,
    tooltipRef,
    selectWrapper,
  }
}
