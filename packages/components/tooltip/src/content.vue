<script lang="ts">
  import { computed, defineComponent, inject, onBeforeUnmount, ref, unref } from 'vue'
  import { onClickOutside } from '@vueuse/core'
  import { ZzPopperContent } from '@zzui/components/popper'

  import { composeEventHandlers } from '@zzui/utils'
  import { useTooltipContentProps } from './tooltip'
  import { TOOLTIP_INJECTION_KEY } from './token'

  export default defineComponent({
    name: 'ZzTooltipContent',
    components: { ZzPopperContent },
    props: useTooltipContentProps,
    setup(props) {
      const contentRef = ref<InstanceType<typeof ZzPopperContent> | null>(null)
      const destroyed = ref(false)

      const {
        controlled,
        id,
        open,
        trigger,
        onOpen,
        onClose,
        onShow,
        onHide,
        onBeforeShow,
        onBeforeHide,
      } = inject(TOOLTIP_INJECTION_KEY, undefined)!

      const persistentRef = computed(() => {
        if (process.env.NODE_ENV === 'test') {
          return true
        }

        return props.persistent
      })

      onBeforeUnmount(() => {
        destroyed.value = true
      })

      const shouldRender = computed(() => {
        return unref(persistentRef) ? true : unref(open)
      })

      const shouldShow = computed(() => {
        return props.disabled ? false : unref(open)
      })

      const contentStyle = computed(() => (props.style ?? {}) as any)

      const ariaHidden = computed(() => !unref(open))

      const onTransitionLeave = () => {
        onHide()
      }

      const stopWhenControlled = () => {
        if (unref(controlled)) return true
      }

      const onContentEnter = composeEventHandlers(stopWhenControlled, () => {
        if (props.enterable && unref(trigger) === 'hover') {
          onOpen()
        }
      })

      const onContentLeave = composeEventHandlers(stopWhenControlled, () => {
        if (unref(trigger) === 'hover') {
          onClose()
        }
      })

      const onBeforeEnter = () => {
        contentRef.value?.updatePopper?.()
        onBeforeShow?.()
      }

      const onBeforeLeave = () => {
        onBeforeHide?.()
      }

      const onAfterShow = () => {
        onShow()
        stopHandle = onClickOutside(
          computed(() => {
            return contentRef.value?.popperContentRef
          }),
          () => {
            if (unref(controlled)) return
            const $trigger = unref(trigger)
            if ($trigger !== 'hover') {
              onClose()
            }
          }
        )
      }

      const onBlur = () => {
        if (!props.virtualTriggering) {
          onClose()
        }
      }

      let stopHandle: ReturnType<typeof onClickOutside>

      return {
        id,
        contentRef,
        destroyed,
        shouldRender,
        shouldShow,
        open,
        onBlur,
        onClose,
        onContentEnter,
        onContentLeave,
        onBeforeEnter,
        ariaHidden,
        stopHandle,
        contentStyle,
        onTransitionLeave,
        onBeforeLeave,
        onAfterShow,
      }
    },
  })
</script>

<template>
  <teleport :disabled="!teleported" :to="appendTo">
    <transition
      :name="transition"
      @before-enter="onBeforeEnter"
      @before-leave="onBeforeLeave"
      @after-leave="onTransitionLeave"
      @after-enter="onAfterShow"
    >
      <zz-popper-content
        v-if="shouldRender"
        v-show="shouldShow"
        :id="id"
        ref="contentRef"
        v-bind="$attrs"
        :aria-label="ariaLabel"
        :aria-hidden="ariaHidden"
        :offset="offset"
        :placement="placement"
        :popper-options="popperOptions"
        :strategy="strategy"
        :effect="effect"
        :enterable="enterable"
        :popper-class="popperClass"
        :popper-style="[popperStyle, contentStyle]"
        :reference-el="referenceEl"
        :trigger-target-el="triggerTargetEl"
        :visible="shouldShow"
        @mouseenter="onContentEnter"
        @mouseleave="onContentLeave"
        @blur="onBlur"
        @close="onClose"
      >
        <template v-if="!destroyed">
          <slot />
        </template>
      </zz-popper-content>
    </transition>
  </teleport>
</template>
