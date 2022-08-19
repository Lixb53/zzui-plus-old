import { placements } from '@popperjs/core'
import { buildProps, definePropType } from '@zzui/utils'
import type { Options, Placement } from '@popperjs/core'
import type { ExtractPropTypes, StyleValue } from 'vue'

type ClassObjectType = Record<string, boolean>
type ClassType = string | ClassObjectType | ClassType[]

const POSITIONING_STARTEGIES = ['fixed', 'absolute'] as const
export const usePopperCoreConfigProps = buildProps({
  boundariesPadding: {
    type: Number,
    default: 0,
  },
  fallbackPlacements: {
    type: definePropType<Placement[]>(Array),
    default: () => [],
  },
  gpuAcceleration: {
    type: Boolean,
    default: true,
  },
  offset: {
    type: Number,
    default: 12,
  },
  placement: {
    type: String,
    values: placements,
    default: 'bottom',
  },
  popperOptions: {
    type: definePropType<Partial<Options>>(Object),
    default: () => ({}),
  },
  strategy: {
    type: String,
    values: POSITIONING_STARTEGIES,
    default: 'absolute',
  },
} as const)

export const usePopperContentProps = buildProps({
  ...usePopperCoreConfigProps,
  id: String,
  style: { type: definePropType<StyleValue>([String, Array, Object]) },
  className: { type: definePropType<StyleValue>([String, Array, Object]) },
  effect: {
    type: String,
    default: 'dark',
  },
  visible: Boolean,
  popperClass: {
    type: definePropType<ClassType>([String, Array, Object]),
  },
  popperStyle: {
    type: definePropType<StyleValue>([String, Array, Object]),
  },
  referenceEl: {
    type: definePropType<HTMLElement>(Object),
  },
  triggerTargetEl: {
    type: definePropType<HTMLElement>(Object),
  },
  ariaLabel: {
    type: String,
    default: undefined,
  },
  virtualTriggering: Boolean,
  zIndex: Number,
} as const)

export type UsePopperCoreConfigProps = ExtractPropTypes<typeof usePopperCoreConfigProps>
