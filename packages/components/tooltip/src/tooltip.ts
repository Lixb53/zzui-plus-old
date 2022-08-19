import { usePopperContentProps } from '@zzui/components/popper/src/content'
import { usePopperTriggerProps } from '@zzui/components/popper/src/trigger'
import { POPPER_CONTAINER_SELECTOR, useDelayedToggleProps, useNamespace } from '@zzui/hooks'
import { buildProps, definePropType } from '@zzui/utils'

const ns = useNamespace('tooltip')

const triggers = ['hover', 'focus', 'click', 'contextmenu'] as const
export type Trigger = typeof triggers[number]

export const useTooltipContentProps = buildProps({
  ...useDelayedToggleProps,
  ...usePopperContentProps,
  appendTo: {
    type: definePropType<string | HTMLElement>([String, Object]),
    default: POPPER_CONTAINER_SELECTOR,
  },
  content: {
    type: String,
    default: '',
  },
  rawContent: {
    type: Boolean,
    default: false,
  },
  disabled: Boolean,
  persistent: Boolean,
  ariaLabel: String,
  teleported: {
    type: Boolean,
    default: true,
  },
  transition: {
    type: String,
    default: `${ns.namespace.value}-fade-in-linear`,
  },
  visible: {
    type: definePropType<boolean | null>(Boolean),
    default: null,
  },
} as const)

export const useTooltipTriggerProps = buildProps({
  ...usePopperTriggerProps,
  disabled: Boolean,
  trigger: {
    type: definePropType<Trigger | Trigger[]>([String, Array]),
    default: 'hover',
  },
})

export const useTooltipProps = buildProps({
  openDelay: {
    type: Number,
  },
  visibleArrow: {
    type: Boolean,
    default: undefined,
  },
  hideAfter: {
    type: Number,
    default: 200,
  },
  showArrow: {
    type: Boolean,
    default: true,
  },
})
