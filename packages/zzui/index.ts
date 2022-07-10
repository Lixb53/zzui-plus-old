import installer from './defaults'

export * from '@zzui/components'
export * from '@zzui/constants'
export * from '@zzui/hooks'
export * from '@zzui/tokens'
export * from '@zzui/utils'
export { makeInstaller } from './make-installer'

export const instlal = installer.install
export const version = installer.version
export default installer

export { default as dayjs } from 'dayjs'
