<script lang="ts">
  import { defineComponent, inject, ref, toRef, unref } from 'vue'
  import { ZzPopperTrigger } from '@zzui/components/popper'
  import { useNamespace } from '@zzui/hooks'
  import { composeEventHandlers } from '@zzui/utils'
  import { useTooltipTriggerProps } from './tooltip'
  import { whenTrigger } from './utils'
  import { TOOLTIP_INJECTION_KEY } from './token'
  import type { OnlyChildExpose } from '@zzui/components/slot'

  export default defineComponent({
    name: 'ZzTooltipTrigger',
    components: { ZzPopperTrigger },
    props: useTooltipTriggerProps,
    setup(props) {
      const ns = useNamespace('tooltip')
      const { controlled, id, open, onOpen, onClose, onToggle } = inject(
        TOOLTIP_INJECTION_KEY,
        undefined
      )!

      const triggerRef = ref<OnlyChildExpose | null>(null)

      const stopWhenControlledOrDisabled = () => {
        if (unref(controlled) || props.disabled) {
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

      const onContextMenu = composeEventHandlers(
        stopWhenControlledOrDisabled,
        whenTrigger(trigger, 'contextmenu', (e: Event) => {
          e.preventDefault()
          onToggle(e)
        })
      )

      // const onKeydown = composeEventHandlers(stopWhenControlledOrDisabled, (e: KeyboardEvent) => {
      //   const { code } = e
      //   if (props.triggerKeys.includes(code)) {
      //     e.preventDefault()
      //     onToggle(e)
      //   }
      // })

      return {
        id,
        ns,
        onContextMenu,
        onMouseenter,
        onMouseleave,
        onClick,
        onFocus,
        onBlur,
        open,
        triggerRef,
      }
    },
  })
</script>

<template>
  <zz-popper-trigger
    :id="id"
    :virtual-ref="virtualRef"
    :open="open"
    :virtual-triggering="virtualTriggering"
    :class="ns.e('trigger')"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
    @contextmenu="onContextMenu"
    @click="onClick"
    @focus="onFocus"
    @blur="onBlur"
  >
    <slot />
  </zz-popper-trigger>
</template>
