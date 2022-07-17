import { buildProps } from '@zzui/utils'

export const inputProps = buildProps({
  id: {
    type: String,
    default: undefined,
  },
  disabled: Boolean,
  type: {
    type: String,
    default: 'text',
  },
  placeholder: String,
})
