import { provide } from 'vue'
import type { InjectionKey, ObjectDirective, Ref } from 'vue'

type ForwardRefSetter = <T>(el: T) => void

export type FowwardRefInjectionContext = {
  setForwardRef: ForwardRefSetter
}

export const FORWARD_REF_INJECTION_KEY: InjectionKey<FowwardRefInjectionContext> =
  Symbol('ZzForwardRef')

export const useForwardRef = <T>(forwardRef: Ref<T | null>) => {
  const setForwardRef = (el: T) => {
    forwardRef.value = el
  }

  provide(FORWARD_REF_INJECTION_KEY, {
    setForwardRef,
  })
}

export const useForwardRefDirective = (setForwardRef: ForwardRefSetter): ObjectDirective => {
  return {
    mounted(el) {
      setForwardRef(el)
    },
    updated(el) {
      setForwardRef(el)
    },
    unmounted() {
      setForwardRef(null)
    },
  }
}
