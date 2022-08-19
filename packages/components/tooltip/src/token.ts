import type { Trigger } from './tooltip'
import type { InjectionKey, Ref } from 'vue'

export type ZzTooltipInjectionContext = {
  controlled: Ref<boolean>
  id: Ref<string>
  open: Ref<boolean>
  trigger: Ref<Trigger | Trigger[]>
  onOpen: (e?: Event) => void
  onClose: (e?: Event) => void
  onToggle: (e?: Event) => void
  onShow: () => void
  onHide: () => void
  onBeforeShow: () => void
  onBeforeHide: () => void
  updatePopper: () => void
}

export const TOOLTIP_INJECTION_KEY: InjectionKey<ZzTooltipInjectionContext> = Symbol('zzTooltip')
