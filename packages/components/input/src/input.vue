<script lang="ts">
  import { computed, defineComponent, ref } from 'vue'
  import { CircleClose } from '@element-plus/icons-vue'
  import { useDisabled, useNamespace, useSize } from '@zzui/hooks'
  import { UPDATE_MODEL_EVENT } from '@zzui/constants'
  import { ZzIcon } from '@zzui/components/icon'
  import { inputProps } from './input'

  type TargetElement = HTMLInputElement | HTMLTextAreaElement
  export default defineComponent({
    name: 'ZzInput',
    components: { ZzIcon, CircleClose },
    inheritAttrs: false,
    props: inputProps,
    setup(props, { emit, slots }) {
      const nsInput = useNamespace('input')
      const nsTextarea = useNamespace('textarea')
      const focused = ref(false)
      const hovering = ref(false)
      const inputSize = useSize()

      const inputDisabled = useDisabled()

      const getClass = computed(() => [
        props.type === 'textarea' ? nsTextarea.b() : nsInput.b(),
        nsInput.m(inputSize.value),
        nsInput.is('disabled', inputDisabled.value),
        {
          [nsInput.b('group')]: slots.prepend || slots.append,
          [nsInput.bm('group', 'prepend')]: slots.prepend,
          [nsInput.bm('group', 'append')]: slots.append,
          [nsInput.m('prefix')]: slots.prefix || props.prefixIcon,
          [nsInput.m('suffix')]: slots.suffix || props.suffixIcon || props.clearable,
        },
      ])

      const showClear = computed(
        () =>
          props.clearable &&
          !inputDisabled.value &&
          !props.readonly &&
          (focused.value || hovering.value)
      )

      const suffixVisible = computed(() => !!slots.suffix || !!props.suffixIcon || showClear.value)

      const handleFocus = (event: FocusEvent) => {
        focused.value = true
        emit('focus', event)
      }

      const handleBlur = (event: FocusEvent) => {
        focused.value = false
        emit('blur', event)
      }

      const handleInput = (event: Event) => {
        const { value } = event?.target as TargetElement

        emit(UPDATE_MODEL_EVENT, value)
        emit('input', value)
      }

      const handleMouseEnter = (evt: MouseEvent) => {
        hovering.value = true
        emit('mouseenter', evt)
      }
      const handleMouseLeave = (evt: MouseEvent) => {
        hovering.value = false
        emit('mouseleave', evt)
      }

      const clear = () => {
        emit(UPDATE_MODEL_EVENT, '')
        emit('clear')
        emit('input', '')
      }

      return {
        nsInput,
        nsTextarea,
        focused,
        getClass,
        handleFocus,
        handleBlur,
        handleInput,
        inputSize,
        inputDisabled,
        showClear,
        suffixVisible,
        handleMouseEnter,
        handleMouseLeave,
        clear,
      }
    },
  })
</script>

<template>
  <div :class="getClass" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" :class="nsInput.be('group', 'prepend')">
        <slot name="prepend" />
      </div>
      <div :class="[nsInput.e('wrapper'), nsInput.is('focus', focused)]">
        <div v-if="$slots.prefix || prefixIcon" :class="nsInput.e('prefix')">
          <span :class="nsInput.e('prefix-inner')">
            <slot name="prefix" />
            <zz-icon v-if="prefixIcon" :class="nsInput.e('icon')">
              <component :is="prefixIcon" />
            </zz-icon>
          </span>
        </div>
        <input
          :class="nsInput.e('inner')"
          :type="type"
          :disabled="inputDisabled"
          :placeholder="placeholder"
          @focus="handleFocus"
          @blur="handleBlur"
          @input="handleInput"
        />
        <span v-if="suffixVisible" :class="nsInput.e('suffix')">
          <span :class="nsInput.e('suffix-inner')">
            <template v-if="!showClear">
              <slot name="suffix" />
              <zz-icon v-if="suffixIcon" :class="nsInput.e('icon')">
                <component :is="suffixIcon" />
              </zz-icon>
            </template>
            <zz-icon
              v-if="showClear"
              :class="[nsInput.e('icon'), nsInput.e('clear')]"
              @mousedown.prevent
              @click="clear"
            >
              <circle-close />
            </zz-icon>
          </span>
        </span>
      </div>
      <!-- append slot -->
      <div v-if="$slots.append" :class="nsInput.be('group', 'append')">
        <slot name="append" />
      </div>
    </template>
    <template v-else>
      <textarea
        :class="nsTextarea.e('inner')"
        :disabled="inputDisabled"
        :placeholder="placeholder"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
