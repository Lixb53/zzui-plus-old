import { withInstall } from '@zzui/utils'

import Popper from './src/popper.vue'
import ZzPopperTrigger from './src/trigger.vue'
import ZzPopperContent from './src/content.vue'
import ZzPopperArrow from './src/arrow.vue'

export { ZzPopperTrigger, ZzPopperContent, ZzPopperArrow }

export const ZzPopper = withInstall(Popper)

export default ZzPopper

export * from './src/popper'
