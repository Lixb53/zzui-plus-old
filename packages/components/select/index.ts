import { withInstall, withNoopInstall } from '@zzui/utils'

import Select from './src/select.vue'
import Option from './src/option.vue'

export const ZzSelect = withInstall(Select, {
  Option,
})
export default ZzSelect
export const ZzOption = withNoopInstall(Option)

export * from './src/token'
