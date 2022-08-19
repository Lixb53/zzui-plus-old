import { withInstall } from '@zzui/utils'

import Popper from './src/popper.vue'
import ZzPopperTrigger from './src/trigger.vue'
import ZzPopperContent from './src/content.vue'
import ZzPopperArrow from './src/arrow.vue'

export { ZzPopperTrigger, ZzPopperContent, ZzPopperArrow }

export const ZzPopper = withInstall(Popper)
export default ZzPopper

export * from './src/popper'
export * from './src/trigger'
export * from './src/content'
export * from './src/arrow'

export type { Placement, Options } from '@popperjs/core'
export type ZzPopperArrowInstance = InstanceType<typeof ZzPopperArrow>
export type ZzPopperArrowTrigger = InstanceType<typeof ZzPopperTrigger>
export type ZzPopperArrowContent = InstanceType<typeof ZzPopperContent>
