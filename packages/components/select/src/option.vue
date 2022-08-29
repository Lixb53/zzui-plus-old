<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'
  import { useNamespace } from '@zzui/hooks'

  export default defineComponent({
    name: 'ZzOption',
    props: {},
    setup() {
      const ns = useNamespace('select')

      const states = reactive({
        index: -1,
        visible: true,
        hover: false,
      })

      const { visible } = toRefs(states)

      return {
        visible,
        ns,
      }
    },
  })
</script>

<template>
  <li v-show="visible" :class="[ns.be('dropdown', 'item')]">
    <slot>
      <span>select-option</span>
    </slot>
  </li>
</template>

<style lang="scss" scoped></style>
