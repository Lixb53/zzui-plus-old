<script lang="ts">
  import { computed, defineComponent, inject, onMounted, ref } from 'vue'
  import { useNamespace } from '@zzui/hooks'
  import { selectKey } from './token'

  export default defineComponent({
    name: 'ZzSelectDropdown',
    setup() {
      const ns = useNamespace('select')

      const select = inject(selectKey)!

      // computed
      const isFitInputWidth = computed(() => select.props.fitInputWidth)

      const minWidth = ref('')

      function updateMinWidth() {
        minWidth.value = `${select.selectWrapper?.getBoundingClientRect().width}px`
      }

      onMounted(() => {
        console.log(select.selectWrapper?.getBoundingClientRect())

        updateMinWidth()
      })

      return {
        ns,
        minWidth,
        isFitInputWidth,
      }
    },
  })
</script>

<template>
  <div
    :class="[ns.b('dropdown')]"
    :style="{ [isFitInputWidth ? 'width' : 'minWidth']: minWidth, width: minWidth }"
  >
    <slot />
  </div>
</template>
