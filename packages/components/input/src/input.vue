<script lang="ts">
  import { computed, defineComponent, ref } from 'vue'
  import { useDisabled, useNamespace } from '@zzui/hooks'
  import { inputProps } from './input'

  export default defineComponent({
    name: 'ZzInput',
    props: inputProps,
    setup(props, { emit }) {
      const nsInput = useNamespace('input')
      const nsTextarea = useNamespace('textarea')
      const focused = ref(false)
      const inputDisabled = useDisabled()

      const getClass = computed(() => [
        props.type === 'textarea' ? nsTextarea.b() : nsInput.b(),
        nsInput.is('disabled', inputDisabled.value),
      ])

      const handleFocus = (event: FocusEvent) => {
        focused.value = true
        emit('focus', event)
      }

      const handleBlur = (event: FocusEvent) => {
        focused.value = false
        emit('blur', event)
      }

      return {
        nsInput,
        nsTextarea,
        focused,
        getClass,
        handleFocus,
        handleBlur,
        inputDisabled,
      }
    },
  })
</script>

<template>
  <div :class="getClass">
    <template v-if="type !== 'textarea'">
      <div :class="[nsInput.e('wrapper'), nsInput.is('focus', focused)]">
        <input
          :class="nsInput.e('inner')"
          :type="type"
          :disabled="inputDisabled"
          :placeholder="placeholder"
          @focus="handleFocus"
          @blur="handleBlur"
        />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
