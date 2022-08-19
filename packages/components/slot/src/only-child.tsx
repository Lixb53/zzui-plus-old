import { Comment, Fragment, Text, cloneVNode, defineComponent, inject, withDirectives } from 'vue'

import { FORWARD_REF_INJECTION_KEY, useForwardRefDirective } from '@zzui/hooks'
import { NOOP, debugWarn, isObject } from '@zzui/utils'

import type { Ref, VNode } from 'vue'

const NAME = 'ZzOnlyChild'

export const OnlyChild = defineComponent({
  name: NAME,
  setup(_, { slots, attrs }) {
    const forwardRefInjection = inject(FORWARD_REF_INJECTION_KEY)
    const forwardRefDirective = useForwardRefDirective(forwardRefInjection?.setForwardRef ?? NOOP)

    return () => {
      const defaultSlot = slots.default?.(attrs)
      if (!defaultSlot) return null

      if (defaultSlot.length > 1) {
        debugWarn(NAME, 'requires exact only one valid child.')
        return null
      }

      const firstLegitNode = findFirstLegitChild(defaultSlot)
      if (!firstLegitNode) {
        debugWarn(NAME, 'no valid child node found')
        return null
      }

      return withDirectives(cloneVNode(firstLegitNode!, attrs), [[forwardRefDirective]])
    }
  },
})

function findFirstLegitChild(node: VNode[] | undefined): VNode | null {
  if (!node) return null
  const children = node as VNode[]
  for (const child of children) {
    if (isObject(child)) {
      switch (child.type) {
        case Comment:
          continue
        case Text:
          return wrapTextContent(child)
        case 'svg':
          return wrapTextContent(child)
        case Fragment:
          return findFirstLegitChild(child.children as VNode[])
        default:
          return child
      }
    }
    return wrapTextContent(child)
  }
  return null
}

function wrapTextContent(s: string | VNode) {
  return <span class='zz-only-child__content'>{s}</span>
}

export type OnlyChildExpose = {
  forwardRef: Ref<HTMLElement>
}
