<script lang="ts">
  import { computed, defineComponent, provide, readonly, ref, toRef, unref, watch } from 'vue'
  import { isUndefined } from 'lodash-unified'
  import { ZzPopper, ZzPopperArrow, usePopperProps } from '@zzui/components/popper'
  import {
    useDelayedToggle,
    useId,
    useModelToggle,
    useModelToggleEmits,
    useModelToggleProps,
    usePopperContainer,
  } from '@zzui/hooks'
  import { debugWarn, isBoolean } from '@zzui/utils'
  import { usePopperArrowProps } from '@zzui/components/popper/src/arrow'
  import ZzTooltipTrigger from './trigger.vue'
  import ZzTooltipContent from './content.vue'
  import { TOOLTIP_INJECTION_KEY } from './token'
  import { useTooltipContentProps, useTooltipProps, useTooltipTriggerProps } from './tooltip'

  export default defineComponent({
    name: 'ZzTooltip',
    components: { ZzPopper, ZzTooltipContent, ZzTooltipTrigger, ZzPopperArrow },
    props: {
      ...usePopperProps,
      ...useModelToggleProps,
      ...useTooltipContentProps,
      ...useTooltipTriggerProps,
      ...usePopperArrowProps,
      ...useTooltipProps,
    },
    emits: [...useModelToggleEmits, 'before-show', 'before-hide', 'show', 'hide', 'open', 'close'],
    setup(props, { emit }) {
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

      const id = useId()
      const popperRef = ref<InstanceType<typeof ZzPopper> | null>(null)
      const contentRef = ref<InstanceType<typeof ZzTooltipContent> | null>(null)

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

      const controlled = computed(() => isBoolean(props.visible))

      provide(TOOLTIP_INJECTION_KEY, {
        controlled,
        id,
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
        onShow: () => {
          emit('show', toggleReason.value)
        },
        onHide: () => {
          emit('hide', toggleReason.value)
        },
        onBeforeShow: () => {
          emit('before-show', toggleReason.value)
        },
        onBeforeHide: () => {
          emit('before-hide', toggleReason.value)
        },
        updatePopper,
      })

      watch(
        () => props.disabled,
        (diabled) => {
          if (diabled && open.value) {
            open.value = false
          }
        }
      )

      const isFocusInsideContent = () => {
        const popperContent: HTMLElement | undefined =
          contentRef.value?.contentRef?.popperContentRef

        return popperContent && popperContent.contains(document.activeElement)
      }

      return {
        compatShowAfter,
        compatShowArrow,
        contentRef,
        popperRef,
        updatePopper,
        isFocusInsideContent,
        open,
        hide,
        onOpen,
        onClose,
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
      :effect="effect"
      :offset="offset"
      :enterable="enterable"
      :popper-class="popperClass"
      :popper-style="popperStyle"
      :placement="placement"
      :popper-options="popperOptions"
      :reference-el="referenceEl"
      :trigger-target-el="triggerTargetEl"
      :show-after="compatShowAfter"
      :strategy="strategy"
      :teleported="teleported"
      :transition="transition"
      :append-to="appendTo"
      :pure="pure"
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
