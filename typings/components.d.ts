declare module 'vue' {
  export interface GlobalComponents {
    Zzbutton: typeof import('../packages/zzui')['ZzButton']
    ZzConfigProvider: typeof import('../packages/zzui')['ZzConfigProvider']
  }
}

declare module '@zzui/build-utils'
export {}
