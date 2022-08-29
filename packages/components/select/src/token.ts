import type { InjectionKey } from 'vue'

export interface SelectContext {
  props: {
    fitInputWidth?: boolean
  }
  selectWrapper: HTMLElement
}

export const selectKey = 'ZzSelect' as unknown as InjectionKey<SelectContext>
