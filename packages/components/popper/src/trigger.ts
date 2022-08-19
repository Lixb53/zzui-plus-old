import { buildProps, definePropType } from '@zzui/utils'
import type { Measurable } from '@zzui/tokens'

export const usePopperTriggerProps = buildProps({
  virtualRef: {
    type: definePropType<Measurable>(Object),
  },
  virtualTriggering: Boolean,
  onMouseenter: Function,
  onMouseleave: Function,
  onCLick: Function,
  onKeydown: Function,
  onFocus: Function,
  onBlur: Function,
  onContextmenu: Function,
  id: String,
  open: Boolean,
})

export type PopperTriggerProps = typeof usePopperTriggerProps
