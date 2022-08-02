import { useSizeProp } from '@zzui/hooks'
import { buildProps, definePropType, iconPropType } from '@zzui/utils'

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
})
