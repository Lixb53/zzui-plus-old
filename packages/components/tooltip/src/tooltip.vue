<script lang="ts">
  import { computed, defineComponent, provide, readonly, ref, toRef, unref } from 'vue'
  import { isUndefined } from 'lodash-unified'
  import { ZzPopper, ZzPopperArrow, usePopperProps } from '@zzui/components/popper'
  import { useDelayedToggle, useModelToggle, usePopperContainer } from '@zzui/hooks'
  import { debugWarn, isBoolean } from '@zzui/utils'
  import { usePopperArrowProps } from '@zzui/components/popper/src/arrow'
  import ZzTooltipTrigger from './trigger.vue'
  import ZzTooltipContent from './content.vue'
  import { TOOLTIP_INJECTION_KEY } from './token'
  import { useTooltipContentProps, useTooltipProps, useTooltipTriggerProps } from './tooltip'
  import type { ZzPopperContent } from '@zzui/components/popper'

  export default defineComponent({
    name: 'ZzTooltip',
    components: { ZzPopper, ZzTooltipContent, ZzTooltipTrigger, ZzPopperArrow },
    props: {
      ...usePopperProps,
      ...useTooltipProps,
      ...useTooltipTriggerProps,
      ...useTooltipContentProps,
      ...usePopperArrowProps,
    },
    setup(props) {
      usePopperContainer()

      const compatShowAfter = computed(() => {
        if (!isUndefined(props.openDelay)) {
          debugWarn(
            'ZzTooltip',
            'open-delay is about to be deprecated in the next major version, please use `show-after` instead'
          )
        }

        return props.openDelay || (props.showAfter as number)
      })

      const compatShowArrow = computed(() => {
        if (!isUndefined(props.visibleArrow)) {
          debugWarn(
            'ZzTooltip',
            '`visible-arrow` is about to be deprecated in the next major version, please use `show-arrow` instead'
          )
        }

        return isBoolean(props.visibleArrow) ? props.visibleArrow : props.showArrow
      })

      const popperRef = ref<InstanceType<typeof ZzPopper> | null>(null)
      const contentRef = ref<InstanceType<typeof ZzPopperContent> | null>(null)

      const updatePopper = () => {
        const popperComponent = unref(popperRef)
        if (popperComponent) {
          popperComponent.popperInstanceRef?.update()
        }
      }

      const open = ref(false)
      const toggleReason = ref<Event | undefined>(undefined)

      const { show, hide } = useModelToggle({
        indicator: open,
        toggleReason,
      })

      const { onOpen, onClose } = useDelayedToggle({
        showAfter: compatShowAfter,
        hideAfter: toRef(props, 'hideAfter'),
        open: show,
        close: hide,
      })

      provide(TOOLTIP_INJECTION_KEY, {
        open: readonly(open),
        trigger: toRef(props, 'trigger'),
        onOpen: (event?: Event) => {
          onOpen(event)
        },
        onClose: (event?: Event) => {
          onClose(event)
        },
        onToggle: (event?: Event) => {
          if (unref(open)) {
            onClose(event)
          } else {
            onOpen(event)
          }
        },
        updatePopper,
      })

      return {
        compatShowAfter,
        compatShowArrow,
        contentRef,
        popperRef,
        updatePopper,
      }
    },
  })
</script>

<template>
  <zz-popper ref="popperRef" :role="role">
    <zz-tooltip-trigger
      :disabled="disabled"
      :trigger="trigger"
      :virtual-ref="virtualRef"
      :virtual-triggering="virtualTriggering"
    >
      <slot v-if="$slots.default" />
    </zz-tooltip-trigger>
    <zz-tooltip-content
      ref="contentRef"
      :aria-label="ariaLabel"
      :content="content"
      :disabled="disabled"
      :offset="offset"
      :popper-class="popperClass"
      :popper-style="popperStyle"
      :placement="placement"
      :popper-options="popperOptions"
      :reference-el="referenceEl"
      :trigger-target-el="triggerTargetEl"
      :show-after="compatShowAfter"
    >
      <slot name="content">
        <span v-if="rawContent" v-html="content" />
        <span v-else> {{ content }} </span>
      </slot>
      <zz-popper-arrow v-if="compatShowArrow" :arrow-offset="arrowOffset" />
    </zz-tooltip-content>
  </zz-popper>
</template>

<style lang="scss" scoped></style>
