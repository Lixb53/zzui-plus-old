import { buildProps, definePropType } from '@zzui/utils'
import type Scrollbar from './scrollbar.vue'
import type { ExtractPropTypes, StyleValue } from 'vue'

export const useScrollbarProps = buildProps({
  height: {
    type: [String, Number],
    default: '',
  },
  maxHeight: {
    type: [String, Number],
    default: '',
  },
  tag: {
    type: String,
    default: 'div',
  },
  wrapStyle: {
    type: definePropType<StyleValue>([String, Array, Object]),
    default: '',
  },
  wrapClass: {
    type: [String, Array],
    default: '',
  },
  viewStyle: {
    type: [String, Array, Object],
    default: '',
  },
  viewClass: {
    type: [String, Array],
    default: '',
  },
  native: Boolean,
  minSize: {
    type: Number,
    default: 20,
  },
  always: Boolean,
} as const)

export type ScrollbarProps = ExtractPropTypes<typeof Scrollbar>

export type ScrollbarInstance = InstanceType<typeof Scrollbar>
