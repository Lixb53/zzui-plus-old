import { useSizeProp } from '@zzui/hooks'
import { buildProps, definePropType, iconPropType, mutable } from '@zzui/utils'
import type { StyleValue } from 'vue'

export type InputAutoSize = { minRows?: number; maxRows?: number } | boolean

export const inputProps = buildProps({
  id: {
    type: String,
    default: undefined,
  },
  size: useSizeProp,
  disabled: Boolean,
  type: {
    type: String,
    default: 'text',
  },
  placeholder: String,
  modelValue: {
    type: definePropType<string | number | null | undefined>([String, Number, Object]),
    default: '',
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
  autosize: {
    type: definePropType<InputAutoSize>([Boolean, Object]),
    default: false,
  },
  containerRole: {
    type: String,
    default: undefined,
  },
  resize: {
    type: String,
    values: ['none', 'both', 'horizontal', 'vertial'],
  },
  prefixIcon: {
    type: iconPropType,
    default: '',
  },
  suffixIcon: {
    type: iconPropType,
    default: '',
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  formatter: {
    type: Function,
  },
  parser: {
    type: Function,
  },
  showPassword: {
    type: Boolean,
    default: false,
  },
  showWordLimit: {
    type: Boolean,
    default: false,
  },
  inputStyle: {
    type: definePropType<StyleValue>([Object, Array, String]),
    default: () => mutable({} as const),
  },
  label: {
    type: String,
    default: undefined,
  },
  tableIndex: {
    type: [String, Number],
    default: 0,
  },
})
