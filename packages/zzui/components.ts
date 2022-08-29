import { ZzButton } from '@zzui/components/button'
import { ZzConfigProvider } from '@zzui/components/config-provider'
import { ZzInput } from '@zzui/components/input'
import { ZzIcon } from '@zzui/components/icon'
import { ZzRow } from '@zzui/components/row'
import { ZzCol } from '@zzui/components/col'
import { ZzPopper } from '@zzui/components/popper'
import { ZzTooltip } from '@zzui/components/tooltip'
import { ZzSelect } from '@zzui/components/select'

import type { Plugin } from 'vue'

export default [
  ZzButton,
  ZzConfigProvider,
  ZzInput,
  ZzIcon,
  ZzRow,
  ZzCol,
  ZzPopper,
  ZzTooltip,
  ZzSelect,
] as Plugin[]
