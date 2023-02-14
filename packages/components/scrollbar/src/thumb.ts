import { buildProps } from '@zzui/zzui'
import type { ExtractPropTypes } from 'vue'
import type thumb from './thumb.vue'

export const thumbProps = buildProps({
  vertical: Boolean,
  size: String,
  move: Number,
  ratio: {
    type: Number,
    required: true,
  },
  always: Boolean,
} as const)

export type ThumbProps = ExtractPropTypes<typeof thumbProps>

export type ThumbInstance = InstanceType<typeof thumb>
