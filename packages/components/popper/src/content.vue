<script lang="ts" setup>
  import {
    computed,
    inject,
    onBeforeMount,
    onMounted,
    provide,
    ref,
    toRefs,
    unref,
    watch,
  } from 'vue'

  import { createPopper } from '@popperjs/core'
  import { isNil } from 'lodash-unified'
  import ZzFocusTrap from '@zzui/components/focus-trap'
  import { useNamespace } from '@zzui/hooks'
  import { POPPER_CONTENT_INJECTION_KEY, POPPER_INJECTION_KEY } from '@zzui/tokens'
  import { isElement } from '@zzui/utils'
  import { usePopperContentEmits, usePopperContentProps } from './content'
  import { buildPopperOptions, unwrapMeasurableEl } from './utils'
  import type { WatchStopHandle } from 'vue'

  defineOptions({
    name: 'ZzPopperContent',
  })

  const emit = defineEmits(usePopperContentEmits)

  const props = defineProps(usePopperContentProps)

  const { role, contentRef, popperInstanceRef, triggerRef } = inject(
    POPPER_INJECTION_KEY,
    undefined
  )!

  const ns = useNamespace('popper')
  const popperContentRef = ref<HTMLElement>()
  const focusStartRef = ref<string | HTMLElement>('first')
  const arrowRef = ref<HTMLElement>()
  const arrowOffset = ref<number>()
  provide(POPPER_CONTENT_INJECTION_KEY, {
    arrowOffset,
    arrowRef,
  })

  const contentZIndex = ref(props.zIndex)
  const trapped = ref<boolean>(false)

  let triggerTargetAriaStopWatch: WatchStopHandle | undefined = undefined

  const computedReference = computed(() =>
    unwrapMeasurableEl(props.referenceEl || unref(triggerRef))
  )

  const contentStyle = computed(() => [{ zIndex: unref(contentZIndex) }, props.popperStyle] as any)
  const contentClass = computed(() => [
    ns.b(),
    ns.is(props.effect),
    ns.is('pure', props.pure),
    props.popperClass,
  ])

  const ariaModal = computed<string | undefined>(() => {
    return role && role.value === 'dialog' ? 'false' : undefined
  })

  const createPopperInstance = ({ referenceEl, popperContentEl, arrowEl }) => {
    const options = buildPopperOptions(props, {
      arrowEl,
      arrowOffset: unref(arrowOffset),
    })
    return createPopper(referenceEl, popperContentEl, options)
  }

  const updatePopper = (shouldUpdateZIndex = true) => {
    unref(popperInstanceRef)?.update()
    shouldUpdateZIndex && (contentZIndex.value = props.zIndex)
  }

  const togglePopperAlive = () => {
    const monitorable = { name: 'eventListeners', enabled: props.visible }
    unref(popperInstanceRef)?.setOptions?.((options) => ({
      ...options,
      modifiers: [...(options.modifiers || []), monitorable],
    }))
    updatePopper(false)
    if (props.visible && props.focusOnShow) {
      trapped.value = true
    } else if (props.visible === false) {
      trapped.value = false
    }
  }

  const onFocusAfterTrapped = () => {
    emit('focus')
  }

  const onFocusAfterReleased = () => {
    focusStartRef.value = 'first'
    emit('blur')
  }
  const onFocusInTrap = (event: FocusEvent) => {
    if (props.visible && !trapped.value) {
      if (event.relatedTarget) {
        ;(event.relatedTarget as HTMLElement)?.focus()
      }
      if (event.target) {
        focusStartRef.value = event.target as typeof focusStartRef.value
      }
      trapped.value = true
    }
  }

  const onFocusoutPrevented = () => {
    if (!props.trapping) {
      trapped.value = false
    }
  }

  const onReleaseRequested = () => {
    trapped.value = false
    emit('close')
  }

  onMounted(() => {
    let updateHandle: WatchStopHandle
    watch(
      computedReference,
      (referenceEl) => {
        updateHandle?.()
        const popperInstance = unref(popperInstanceRef)
        popperInstance?.destroy?.()

        if (referenceEl) {
          const popperContentEl = unref(popperContentRef)!
          contentRef.value = popperContentEl

          popperInstanceRef.value = createPopperInstance({
            referenceEl,
            popperContentEl,
            arrowEl: unref(arrowRef),
          })

          updateHandle = watch(
            () => referenceEl.getBoundingClientRect(),
            () => updatePopper(),
            { immediate: true }
          )
        } else {
          popperInstanceRef.value = undefined
        }
      },
      { immediate: true }
    )

    watch(
      () => props.triggerTargetEl,
      (triggerTargetEl, prevTriggerTargetEl) => {
        triggerTargetAriaStopWatch?.()
        triggerTargetAriaStopWatch = undefined

        const el = unref(triggerTargetEl || popperContentRef.value)
        const prevEl = unref(prevTriggerTargetEl || popperContentRef.value)

        if (isElement(el)) {
          const { ariaLabel, id } = toRefs(props)
          triggerTargetAriaStopWatch = watch(
            [role, ariaLabel, ariaModal, id],
            (watches) => {
              ;['role', 'aria-label', 'aria-modal', 'id'].forEach((key, idx) => {
                isNil(watches[idx]) ? el.removeAttribute(key) : el.setAttribute(key, watches[idx])
              })
            },
            { immediate: true }
          )
        }
        if (isElement(prevEl)) {
          ;['role', 'aria-label', 'aria-modal', 'id'].forEach((key) => {
            prevEl?.removeAttribute(key)
          })
        }
      },
      { immediate: true }
    )

    watch(() => props.visible, togglePopperAlive, { immediate: true })

    watch(
      () =>
        buildPopperOptions(props, {
          arrowEl: unref(arrowRef),
          arrowOffset: unref(arrowOffset),
        }),
      (option) => {
        popperInstanceRef.value?.setOptions(option)
      }
    )
  })

  onBeforeMount(() => {
    triggerTargetAriaStopWatch?.()
    triggerTargetAriaStopWatch = undefined
  })

  defineExpose({
    /**
     * @description popper content element
     */
    popperContentRef,
    /**
     * @description popperjs instance
     */
    popperInstanceRef,
    /**
     * @description method for updating popper
     */
    updatePopper,
    /**
     * @description content Style
     */
    contentStyle,
  })
</script>

<template>
  <div
    ref="popperContentRef"
    :class="contentClass"
    :style="contentStyle"
    tabindex="-1"
    @mouseenter="(e) => $emit('mouseenter', e)"
    @mouseleave="(e) => $emit('mouseleave', e)"
  >
    <zz-focus-trap
      :trapped="trapped"
      :trap-on-focus-in="true"
      :focus-trap-el="popperContentRef"
      :focus-start-el="focusStartRef"
      @focus-after-trapped="onFocusAfterTrapped"
      @focus-after-released="onFocusAfterReleased"
      @focusin="onFocusInTrap"
      @focusout-prevented="onFocusoutPrevented"
      @release-requested="onReleaseRequested"
    >
      <slot />
    </zz-focus-trap>
  </div>
</template>
