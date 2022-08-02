import { computed, ref, unref } from 'vue'
import { buildProp } from '@zzui/utils'
import { componentSizes } from '@zzui/constants'
import { useProp } from '../use-prop'
import type { componentSize } from '@zzui/constants'
import type { MaybeRef } from '@vueuse/core'

export const useSizeProp = buildProp({
  type: String,
  values: componentSizes,
  required: false,
} as const)

export const useSize = (
  fallback?: MaybeRef<componentSize | undefined>,
  ignore: Partial<Record<'prop' | 'form' | 'formItem' | 'global', boolean>> = {}
) => {
  const emptyRef = ref(undefined)

  const size = ignore.prop ? emptyRef : useProp<componentSize>('size')
  // const globalConfig = ignore.global ? emptyRef : useGlobalConfig('size')

  return computed((): componentSize => size.value || unref(fallback) || '')
}

export const useDisabled = (fallBack?: MaybeRef<boolean | undefined>) => {
  const disabled = useProp<boolean>('disabled')

  return computed(() => disabled.value || unref(fallBack) || false)
}
