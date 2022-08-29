import { ArrowUp } from '@element-plus/icons-vue'
import { buildProps } from '@zzui/utils'
import type { Component, ExtractPropTypes, PropType } from 'vue'

export const useSelectEmits = ['focus', 'blur']

export const useSelectProps = buildProps({
  id: String,
  placeholder: String,
  multiple: Boolean,
  remote: Boolean,
  filterable: Boolean,
  suffixIcon: {
    type: [String, Object] as PropType<string | Component>,
    default: ArrowUp,
  },
  fitInputWidth: {
    type: Boolean,
    default: false,
  },
  effect: {
    type: String as PropType<'light' | 'dark' | string>,
    default: 'light',
  },
} as const)

export type UseSelectProps = ExtractPropTypes<typeof useSelectProps>
