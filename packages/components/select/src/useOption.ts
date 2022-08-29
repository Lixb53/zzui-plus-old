import { inject } from 'vue'
import { selectKey } from './token'

export function useOption(props, states) {
  // inject
  const select = inject(selectKey)

  return {
    select,
  }
}
