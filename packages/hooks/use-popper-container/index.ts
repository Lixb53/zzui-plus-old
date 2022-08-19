import { onBeforeMount } from 'vue'
import { isClient } from '@vueuse/core'
import { generateId } from '@zzui/utils'

let cachedContainer: HTMLElement

export const POPPER_CONTAINER_ID = `zz-popper-container-${generateId()}`
export const POPPER_CONTAINER_SELECTOR = `#${POPPER_CONTAINER_ID}`

const createContainer = () => {
  const container = document.createElement('div')
  container.id = POPPER_CONTAINER_ID
  document.body.appendChild(container)
  return container
}

export const usePopperContainer = () => {
  onBeforeMount(() => {
    if (!isClient) return

    if (
      process.env.NODE_ENV === 'test' ||
      !cachedContainer ||
      !document.body.querySelector(POPPER_CONTAINER_SELECTOR)
    ) {
      cachedContainer = createContainer()
    }
  })
}
