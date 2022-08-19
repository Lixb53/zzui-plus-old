<script lang="ts">
  import { computed, defineComponent, inject, onBeforeUnmount, ref, unref } from 'vue'
  import { ZzPopperContent } from '@zzui/components/popper'

  import { useTooltipContentProps } from './tooltip'
  import { TOOLTIP_INJECTION_KEY } from './token'

  export default defineComponent({
    name: 'ZzTooltipContent',
    components: { ZzPopperContent },
    props: useTooltipContentProps,
    setup(props) {
      const destroyed = ref(false)

      const { open } = inject(TOOLTIP_INJECTION_KEY, undefined)!

      const persistentRef = computed(() => {
        if (process.env.NODE_ENV === 'test') {
          return true
        }

        return props.persistent
      })

      onBeforeUnmount(() => {
        destroyed.value = true
      })

      const shouldRender = computed(() => {
        return unref(persistentRef) ? true : unref(open)
      })

      const shouldShow = computed(() => {
        return props.disabled ? false : unref(open)
      })

      return {
        destroyed,
        shouldRender,
        shouldShow,
      }
    },
  })
</script>

<template>
  <teleport :disabled="!teleported" :to="appendTo">
    <transition :name="transition">
      <zz-popper-content v-if="shouldRender" v-show="shouldShow" ref="contentRef" v-bind="$attrs">
        <template v-if="!destroyed">
          <slot />
        </template>
      </zz-popper-content>
    </transition>
  </teleport>
</template>
