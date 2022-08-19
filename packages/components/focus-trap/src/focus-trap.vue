<script lang="ts">
  import { defineComponent } from 'vue'
  import type { PropType } from 'vue'

  export default defineComponent({
    name: 'ZzFocusTrap',
    inheritAttrs: false,
    props: {
      loop: Boolean,
      trappend: Boolean,
      focusTralEl: Object as PropType<HTMLElement>,
      focusStartEl: {
        type: [Object, String] as PropType<'container' | 'first' | HTMLElement>,
        default: 'first',
      },
    },
    setup() {},
  })
</script>

<template>
  <slot />
</template>

<style lang="scss" scoped></style>
