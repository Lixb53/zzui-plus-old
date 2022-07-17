import { computed, unref } from 'vue'
import { buildProp } from '@zzui/utils'
import { componentSizes } from '@zzui/constants'
import { useProp } from '../use-prop'
import type { MaybeRef } from '@vueuse/core'

export const useSizeProp = buildProp({
  type: String,
  values: componentSizes,
  required: false,
} as const)

export const useDisabled = (fallBack?: MaybeRef<boolean | undefined>) => {
  const disabled = useProp<boolean>('disabled')

  return computed(() => disabled.value || unref(fallBack) || false)
}
