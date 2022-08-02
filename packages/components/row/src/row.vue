<script lang="ts">
  import { computed, defineComponent, provide } from 'vue'
  import { useNamespace } from '@zzui/hooks'
  import { rowContextKey } from '@zzui/tokens'
  import { rowProps } from './row'
  import type { CSSProperties } from 'vue'

  export default defineComponent({
    name: 'ZzRow',
    props: rowProps,
    setup(props) {
      const ns = useNamespace('row')
      const gutter = computed(() => props.gutter)

      provide(rowContextKey, {
        gutter,
      })

      const defaultClass = computed(() => [ns.b()])

      const style = computed(() => {
        const styles: CSSProperties = {}
        if (!props.gutter) {
          return styles
        }

        styles.marginRight = styles.marginLeft = `-${props.gutter / 2}px`
        return styles
      })

      return {
        ns,
        gutter,
        defaultClass,
        style,
      }
    },
  })
</script>

<template>
  <component :is="tag" :class="defaultClass" :style="style">
    <slot />
  </component>
</template>
