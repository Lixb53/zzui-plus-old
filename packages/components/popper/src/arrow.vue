<script lang="ts" setup>
  import { inject, onBeforeMount, watch } from 'vue'
  import { useNamespace } from '@zzui/hooks'
  import { POPPER_CONTENT_INJECTION_KEY } from '@zzui/tokens'
  import { usePopperArrowProps } from './arrow'

  defineOptions({
    name: 'ZzPopperArrow',
    inheritAttrs: false,
  })

  const props = defineProps(usePopperArrowProps)

  const ns = useNamespace('popper')
  const { arrowOffset, arrowRef } = inject(POPPER_CONTENT_INJECTION_KEY, undefined)!

  watch(
    () => props.arrowOffset,
    (val) => {
      arrowOffset.value = val
    }
  )

  onBeforeMount(() => {
    arrowRef.value = undefined
  })

  defineExpose({
    /**
     * @description Arrow element
     */
    arrowRef,
  })
</script>

<template>
  <span id="arrow" ref="arrowRef" :class="ns.e('arrow')" data-popper-arrow="" />
</template>
