import { withInstall } from '@zzui/utils'

import ConfigProvider from './src/config-provider'

export const ZzConfigProvider = withInstall(ConfigProvider)
export default ZzConfigProvider

export * from './src/config-provider'
