<script lang="ts">
  import {
    computed,
    defineComponent,
    nextTick,
    onMounted,
    ref,
    shallowRef,
    useAttrs as useRawAttrs,
    watch,
  } from 'vue'
  import { CircleClose, Hide as IconHide, View as IconView } from '@element-plus/icons-vue'
  import { isNil } from 'lodash-unified'
  import { useAttrs, useDisabled, useNamespace, useSize } from '@zzui/hooks'
  import { UPDATE_MODEL_EVENT } from '@zzui/constants'
  import { ZzIcon } from '@zzui/components/icon'
  import { debugWarn, isKorean, isObject } from '@zzui/utils'
  import { inputProps } from './input'
  import { calcTextareaHeight } from './utils'
  import type { StyleValue } from 'vue'

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
      const isComposing = ref(false)
      const inputSize = useSize()
      const passwordVisible = ref(false)
      const textareaCalcStyle = shallowRef(props.inputStyle)
      const rawAttrs = useRawAttrs()

      const containerStyle = computed<StyleValue>(() => [
        rawAttrs.style as StyleValue,
        props.inputStyle,
      ])

      const containerAttrs = computed<Record<string, unknown>>(() => {
        const comboBoxAttrs = {}
        if (props.containerRole === 'combobox') {
          comboBoxAttrs['aria-haspopup'] = rawAttrs['aria-haspopup']
          comboBoxAttrs['aria-owns'] = rawAttrs['aria-owns']
          comboBoxAttrs['aria-expanded'] = rawAttrs['aria-expanded']
        }

        return comboBoxAttrs
      })

      const attrs = useAttrs({
        excludeKeys: computed<string[]>(() => {
          return Object.keys(containerAttrs.value)
        }),
      })

      const textareaStyle = computed(
        () =>
          [
            props.inputStyle,
            textareaCalcStyle.value,
            { resize: props.resize },
          ] as unknown as StyleValue
      )

      const input = shallowRef<HTMLInputElement>()
      const textarea = shallowRef<HTMLTextAreaElement>()

      const _ref = computed(() => input.value || textarea.value)

      const passwordIcon = computed(() => (passwordVisible.value ? IconView : IconHide))

      const inputDisabled = useDisabled()

      const nativeInputValue = computed(() =>
        isNil(props.modelValue) ? '' : String(props.modelValue)
      )

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
          !!nativeInputValue.value &&
          (focused.value || hovering.value)
      )

      const isWordLimitVisible = computed(
        () =>
          props.showWordLimit &&
          !!attrs.value.maxlength &&
          (props.type === 'text' || props.type === 'textarea') &&
          !inputDisabled.value &&
          !props.readonly &&
          !props.showPassword
      )

      const textLength = computed(() => Array.from(nativeInputValue.value).length)

      const suffixVisible = computed(
        () =>
          !!slots.suffix ||
          !!props.suffixIcon ||
          showClear.value ||
          props.showPassword ||
          isWordLimitVisible.value
      )

      const resizeTextarea = () => {
        const { type, autosize } = props

        if (type !== 'textarea') return

        if (autosize) {
          const minRows = isObject(autosize) ? autosize.minRows : undefined
          const maxRows = isObject(autosize) ? autosize.maxRows : undefined
          textareaCalcStyle.value = {
            ...calcTextareaHeight(textarea.value!, minRows, maxRows),
          }
        } else {
          textareaCalcStyle.value = {
            minHeight: calcTextareaHeight(textarea.value!).minHeight,
          }
        }
      }

      const setNativeInputValue = () => {
        const input = _ref.value
        if (!input || input.value === nativeInputValue.value) return
        input.value = nativeInputValue.value
      }

      const handleFocus = (event: FocusEvent) => {
        focused.value = true
        emit('focus', event)
      }

      const handleBlur = (event: FocusEvent) => {
        focused.value = false
        emit('blur', event)
      }

      const handleChange = (event: Event) => {
        emit('change', event)
      }

      const handleKeydown = (evt: KeyboardEvent) => {
        emit('keydown', evt)
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

      const blur = () => _ref.value?.blur()

      const handleCompositionstart = (event: CompositionEvent) => {
        emit('compositionstart', event)
        isComposing.value = true
      }
      const handleCompositionupdate = (event: CompositionEvent) => {
        emit('compositionupdate', event)
        const text = (event.target as HTMLInputElement)?.value
        const lastCharacter = text[text.length - 1] || ''
        isComposing.value = !isKorean(lastCharacter)
      }
      const handleCompositionend = (event: CompositionEvent) => {
        emit('compositionend', event)
        if (isComposing.value) {
          isComposing.value = false
          handleInput(event)
        }
      }

      watch(
        () => props.modelValue,
        () => {
          nextTick(() => resizeTextarea())
        }
      )

      watch(nativeInputValue, () => setNativeInputValue())

      watch(
        () => props.type,
        async () => {
          await nextTick()
          setNativeInputValue()
          resizeTextarea()
        }
      )

      onMounted(async () => {
        if (!props.formatter && props.parser) {
          debugWarn('ElInput', 'If you set the parser, you also need to set the formatter.')
        }

        setNativeInputValue()
        await nextTick()
        resizeTextarea()
      })

      return {
        attrs,
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
        blur,
        focus,
        input,
        textarea,
        passwordVisible,
        passwordIcon,
        handlePasswordVisible,
        textareaStyle,
        containerStyle,
        containerAttrs,
        handleChange,
        handleKeydown,
        handleCompositionstart,
        handleCompositionupdate,
        handleCompositionend,
        isWordLimitVisible,
        textLength,
      }
    },
  })
</script>

<template>
  <div
    v-show="type !== 'hidden'"
    v-bind="containerAttrs"
    :class="[getClass, $attrs.class]"
    :style="containerStyle"
    :role="containerRole"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
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
          :id="id"
          ref="input"
          :class="nsInput.e('inner')"
          v-bind="attrs"
          :tableIndex="tableIndex"
          :aria-label="label"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :disabled="inputDisabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :formatter="formatter"
          :parser="parser"
          :placeholder="placeholder"
          :style="inputStyle"
          @compositionstart="handleCompositionstart"
          @compositionupdate="handleCompositionupdate"
          @compositionend="handleCompositionend"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
          @keydown="handleKeydown"
        />
        <span v-if="suffixVisible" :class="nsInput.e('suffix')">
          <span :class="nsInput.e('suffix-inner')">
            <template v-if="!showClear || !showPwdVisible || !isWordLimitVisible">
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
            <span v-if="isWordLimitVisible" :class="nsInput.e('count')">
              <span :class="nsInput.e('count-inner')">
                {{ textLength }} / {{ attrs.maxlength }}
              </span>
            </span>
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
        v-bind="attrs"
        :tableIndex="tableIndex"
        :aria-label="label"
        :style="textareaStyle"
        :disabled="inputDisabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        @compositionstart="handleCompositionstart"
        @compositionupdate="handleCompositionupdate"
        @compositionend="handleCompositionend"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        @keydown="handleKeydown"
      />
      <span v-if="isWordLimitVisible" :class="nsInput.e('count')">
        {{ textLength }} / {{ attrs.maxlength }}
      </span>
    </template>
  </div>
</template>
