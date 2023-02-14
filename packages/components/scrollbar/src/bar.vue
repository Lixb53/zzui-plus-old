<script lang="ts" setup>
  import { ref } from 'vue'
  import { barProps } from './bar'
  import Thumb from './thumb.vue'
  import { GAP } from './utils'

  const props = defineProps(barProps)

  const moveX = ref(0)
  const moveY = ref(0)

  const handleScroll = (wrap: HTMLDivElement) => {
    if (wrap) {
      const offsetHeight = wrap.offsetHeight - GAP
      const offsetWidth = wrap.offsetWidth - GAP

      moveY.value = ((wrap.scrollTop * 100) / offsetHeight) * props.ratioX
      moveX.value = ((wrap.scrollLeft * 100) / offsetWidth) * props.ratioY
    }
  }

  defineExpose({
    handleScroll,
  })
</script>

<template>
  <thumb :always="always" :move="moveY" :size="height" :ratio="ratioY" vertical />
</template>
