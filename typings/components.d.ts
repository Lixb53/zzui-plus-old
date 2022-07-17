declare module 'vue' {
  export interface GlobalComponents {
    Zzbutton: typeof import('../packages/zzui')['ZzButton']
    ZzConfigProvider: typeof import('../packages/zzui')['ZzConfigProvider']
    ZzInput: typeof import('../packages/zzui')['ZzInput']
  }
}

declare module '@zzui/build-utils'
export {}
