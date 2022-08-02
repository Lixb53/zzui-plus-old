<script lang="ts">
  import { computed, defineComponent, inject } from 'vue'
  import { useNamespace } from '@zzui/hooks'
  import { rowContextKey } from '@zzui/tokens'
  import { isNumber } from '@zzui/utils'
  import { colProps } from './col'
  import type { CSSProperties } from 'vue'

  export default defineComponent({
    name: 'ZzCol',
    props: colProps,
    setup(props) {
      const { gutter } = inject(rowContextKey, { gutter: computed(() => 0) })

      const ns = useNamespace('col')

      const style = computed(() => {
        const styles: CSSProperties = {}
        if (gutter.value) {
          styles.paddingLeft = styles.paddingRight = `${gutter.value / 2}px`
        }

        return styles
      })

      const classes = computed(() => {
        const classes: string[] = []
        const pos = ['span'] as const

        pos.forEach((prop) => {
          const size = props[prop]
          if (isNumber(size)) {
            if (prop === 'span') classes.push(ns.b(`${props[prop]}`))
          }
        })

        if (gutter.value) {
          classes.push(ns.is('guttered'))
        }

        return classes
      })

      return {
        ns,
        style,
        classes,
      }
    },
  })
</script>

<template>
  <component :is="tag" :class="classes" :style="style">
    <slot />
  </component>
</template>

<style lang="scss" scoped></style>
