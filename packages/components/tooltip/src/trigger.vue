<script lang="ts">
  import { defineComponent, inject, toRef } from 'vue'
  import { ZzPopperTrigger } from '@zzui/components/popper'
  import { useNamespace } from '@zzui/hooks'
  import { composeEventHandlers } from '@zzui/utils'
  import { useTooltipTriggerProps } from './tooltip'
  import { whenTrigger } from './utils'
  import { TOOLTIP_INJECTION_KEY } from './token'

  export default defineComponent({
    name: 'ZzTooltipTrigger',
    components: { ZzPopperTrigger },
    props: useTooltipTriggerProps,
    setup(props) {
      const ns = useNamespace('tooltip')
      const { open, onOpen, onClose, onToggle } = inject(TOOLTIP_INJECTION_KEY, undefined)!

      const stopWhenControlledOrDisabled = () => {
        if (props.disabled) {
          return true
        }
      }

      const trigger = toRef(props, 'trigger')

      const onMouseenter = composeEventHandlers(
        stopWhenControlledOrDisabled,
        whenTrigger(trigger, 'hover', onOpen)
      )

      const onMouseleave = composeEventHandlers(
        stopWhenControlledOrDisabled,
        whenTrigger(trigger, 'hover', onClose)
      )

      const onClick = composeEventHandlers(
        stopWhenControlledOrDisabled,
        whenTrigger(trigger, 'click', (e) => {
          if ((e as MouseEvent).button === 0) {
            onToggle(e)
          }
        })
      )

      const onFocus = composeEventHandlers(
        stopWhenControlledOrDisabled,
        whenTrigger(trigger, 'focus', onOpen)
      )

      const onBlur = composeEventHandlers(
        stopWhenControlledOrDisabled,
        whenTrigger(trigger, 'focus', onClose)
      )

      return {
        ns,
        onMouseenter,
        onMouseleave,
        onClick,
        onFocus,
        onBlur,
        open,
      }
    },
  })
</script>

<template>
  <zz-popper-trigger
    :virtual-ref="virtualRef"
    :virtual-triggering="virtualTriggering"
    :open="open"
    :class="ns.e('trigger')"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
    @click="onClick"
    @focus="onFocus"
    @blur="onBlur"
  >
    <slot />
  </zz-popper-trigger>
</template>
