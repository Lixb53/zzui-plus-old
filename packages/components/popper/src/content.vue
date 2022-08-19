<script lang="ts" setup>
  import { computed, inject, onMounted, provide, ref, toRefs, unref, watch } from 'vue'

  import { createPopper } from '@popperjs/core'
  import { isElement, isNil } from 'lodash-unified'
  import ZzFocusTrap from '@zzui/components/focus-trap'
  import { useNamespace } from '@zzui/hooks'
  import { POPPER_CONTENT_INJECTION_KEY, POPPER_INJECTION_KEY } from '@zzui/tokens'
  import { usePopperContentProps } from './content'
  import { buildPopperOptions, unwrapMeasurableEl } from './utils'
  import type { WatchStopHandle } from 'vue'

  defineOptions({
    name: 'ZzPopperContent',
  })

  const props = defineProps(usePopperContentProps)
  const { role, contentRef, popperInstanceRef, triggerRef } = inject(
    POPPER_INJECTION_KEY,
    undefined
  )!

  const ns = useNamespace('popper')
  const popperContentRef = ref<HTMLElement>()
  const contentZIndex = ref(props.zIndex)
  const arrowRef = ref<HTMLElement>()
  const arrowOffset = ref<number>()
  provide(POPPER_CONTENT_INJECTION_KEY, {
    arrowOffset,
    arrowRef,
  })

  let triggerTargetAriaStopWatch: WatchStopHandle | undefined = undefined

  const contentClass = computed(() => [ns.b(), ns.is(props.effect)])

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

  const computedReference = computed(() =>
    unwrapMeasurableEl(props.referenceEl || unref(triggerRef))
  )

  const togglePopperAlive = () => {
    const monitorable = { name: 'eventLiseners', enabled: props.visible }
    unref(popperInstanceRef)?.setOptions?.((options) => ({
      ...options,
      modifiers: [...(options.modifiers || []), monitorable],
    }))
    updatePopper(false)
  }

  onMounted(() => {
    let updateHandle: WatchStopHandle
    watch(
      computedReference,
      (referenceEl) => {
        console.log(referenceEl, arrowRef.value)

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
            [role, ariaLabel, id],
            (watches) => {
              ;['role', 'aria-label', 'id'].forEach((key, idx) => {
                isNil(watches[idx]) ? el.removeAttribute(key) : el.setAttribute(key, watches[idx])
              })
            },
            { immediate: true }
          )
        }
        if (isElement(prevEl)) {
          ;['role', 'aria-label', 'id'].forEach((key) => {
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
</script>

<template>
  <div ref="popperContentRef" :class="contentClass">
    <zz-focus-trap>
      <slot />
    </zz-focus-trap>
  </div>
</template>
