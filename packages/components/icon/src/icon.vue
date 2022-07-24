<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useNamespace } from '@zzui/hooks'
  import { addUnit, isUnDef } from '@zzui/utils'
  import { iconProps } from './icon'
  import type { CSSProperties } from 'vue'

  export default defineComponent({
    name: 'ZzIcon',
    inheritAttrs: false,
    props: iconProps,
    setup(props) {
      const ns = useNamespace('icon')
      const style = computed<CSSProperties>(() => {
        if (!props.size && !props.color) return {}

        return {
          fontSize: isUnDef(props.size) ? undefined : addUnit(props.size),
          '--color': props.color,
        }
      })

      return {
        ns,
        style,
      }
    },
  })
</script>

<template>
  <i :class="ns.b()" :style="style" v-bind="$attrs">
    <slot />
  </i>
</template>

<style lang="scss" scoped></style>
