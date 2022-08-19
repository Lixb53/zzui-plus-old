<script lang="ts" setup>
  import { inject, onMounted, watch } from 'vue'
  import { isElement } from 'lodash-unified'
  import { ZzOnlyChild } from '@zzui/components/slot'
  import { POPPER_INJECTION_KEY } from '@zzui/tokens'
  import { useForwardRef } from '@zzui/hooks'
  import { usePopperTriggerProps } from './trigger'

  defineOptions({
    name: 'ZzPopperTrigger',
    inheritAttrs: false,
  })

  const props = defineProps(usePopperTriggerProps)

  const { triggerRef } = inject(POPPER_INJECTION_KEY, undefined)!

  useForwardRef(triggerRef)

  onMounted(() => {
    watch(
      () => triggerRef.value,
      (el, preEl) => {
        if (isElement(el)) {
          ;[
            'onMouseenter',
            'onMouseleave',
            'onClick',
            'onKeydown',
            'onFocus',
            'onBlur',
            'onContextmenu',
          ].forEach((eventName) => {
            const handler = props[eventName]
            if (handler) {
              ;(el as HTMLElement).addEventListener(eventName.slice(2).toLowerCase(), handler)
              ;(preEl as HTMLElement)?.removeEventListener?.(
                eventName.slice(2).toLowerCase(),
                handler
              )
            }
          })
        }
      },
      { immediate: true }
    )
  })
</script>

<template>
  <zz-only-child v-if="!virtualTriggering" v-bind="$attrs">
    <slot />
  </zz-only-child>
</template>
