<script lang="ts">
  import { computed, defineComponent, nextTick, onMounted, ref, shallowRef, watch } from 'vue'
  import { CircleClose, Hide as IconHide, View as IconView } from '@element-plus/icons-vue'
  import { isNil } from 'lodash-unified'
  import { useDisabled, useNamespace, useSize } from '@zzui/hooks'
  import { UPDATE_MODEL_EVENT } from '@zzui/constants'
  import { ZzIcon } from '@zzui/components/icon'
  import { debugWarn } from '@zzui/utils'
  import { inputProps } from './input'

  type TargetElement = HTMLInputElement | HTMLTextAreaElement
  export default defineComponent({
    name: 'ZzInput',
    components: { ZzIcon, CircleClose, IconHide, IconView },
    inheritAttrs: false,
    props: inputProps,
    setup(props, { emit, slots }) {
      const nsInput = useNamespace('input')
      const nsTextarea = useNamespace('textarea')
      const focused = ref(false)
      const hovering = ref(false)
      const inputSize = useSize()
      const passwordVisible = ref(false)

      const input = shallowRef<HTMLInputElement>()
      const textarea = shallowRef<HTMLTextAreaElement>()

      const _ref = computed(() => input.value || textarea.value)

      const passwordIcon = computed(() => (passwordVisible.value ? IconView : IconHide))

      const inputDisabled = useDisabled()

      const nativeInputValue = computed(() =>
        isNil(props.modelValue) ? '' : String(props.modelValue)
      )

      const setNativeInputValue = () => {
        const input = _ref.value
        if (!input || input.value === nativeInputValue.value) return
        input.value = nativeInputValue.value
      }

      const getClass = computed(() => [
        props.type === 'textarea' ? nsTextarea.b() : nsInput.b(),
        nsInput.m(inputSize.value),
        nsInput.is('disabled', inputDisabled.value),
        {
          [nsInput.b('group')]: slots.prepend || slots.append,
          [nsInput.bm('group', 'prepend')]: slots.prepend,
          [nsInput.bm('group', 'append')]: slots.append,
          [nsInput.m('prefix')]: slots.prefix || props.prefixIcon,
          [nsInput.m('suffix')]:
            slots.suffix || props.suffixIcon || props.clearable || passwordVisible.value,
        },
      ])

      const showClear = computed(
        () =>
          props.clearable &&
          !inputDisabled.value &&
          !props.readonly &&
          !!nativeInputValue.value &&
          (focused.value || hovering.value)
      )

      const showPwdVisible = computed(
        () =>
          props.showPassword &&
          !inputDisabled.value &&
          !props.readonly &&
          (!!nativeInputValue.value || focused.value)
      )

      const suffixVisible = computed(
        () => !!slots.suffix || !!props.suffixIcon || showClear.value || props.showPassword
      )

      const handleFocus = (event: FocusEvent) => {
        focused.value = true
        emit('focus', event)
      }

      const handleBlur = (event: FocusEvent) => {
        focused.value = false
        emit('blur', event)
      }

      const handleInput = async (event: Event) => {
        let { value } = event?.target as TargetElement

        if (props.formatter) {
          value = props.parser ? props.parser(value) : value
          value = props.formatter(value)
        }

        if (value === nativeInputValue.value) return

        emit(UPDATE_MODEL_EVENT, value)
        emit('input', value)

        await nextTick()
        setNativeInputValue()
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

      const handlePasswordVisible = () => {
        passwordVisible.value = !passwordVisible.value
        focus()
      }

      const focus = async () => {
        // see: https://github.com/ElemeFE/element/issues/18573
        await nextTick()
        _ref.value?.focus()
      }

      watch(nativeInputValue, () => setNativeInputValue())

      onMounted(() => {
        if (!props.formatter && props.parser) {
          debugWarn('ElInput', 'If you set the parser, you also need to set the formatter.')
        }

        setNativeInputValue
      })

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
        showPwdVisible,
        suffixVisible,
        handleMouseEnter,
        handleMouseLeave,
        clear,
        input,
        textarea,
        passwordVisible,
        passwordIcon,
        handlePasswordVisible,
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
          ref="input"
          :class="nsInput.e('inner')"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :disabled="inputDisabled"
          :formatter="formatter"
          :placeholder="placeholder"
          @focus="handleFocus"
          @blur="handleBlur"
          @input="handleInput"
        />
        <span v-if="suffixVisible" :class="nsInput.e('suffix')">
          <span :class="nsInput.e('suffix-inner')">
            <template v-if="!showClear || !showPwdVisible">
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
            <zz-icon
              v-if="showPwdVisible"
              :class="[nsInput.e('icon'), nsInput.e('password')]"
              @click="handlePasswordVisible"
            >
              <component :is="passwordIcon" />
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
        ref="textarea"
        :class="nsTextarea.e('inner')"
        :disabled="inputDisabled"
        :placeholder="placeholder"
      />
    </template>
  </div>
</template>
