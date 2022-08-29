declare module 'vue' {
  export interface GlobalComponents {
    Zzbutton: typeof import('../packages/zzui')['ZzButton']
    ZzConfigProvider: typeof import('../packages/zzui')['ZzConfigProvider']
    ZzInput: typeof import('../packages/zzui')['ZzInput']
    ZzIcon: typeof import('../packages/zzui')['ZzIcon']
    ZzSelect: typeof import('../packages/zzui')['ZzSelect']
  }
}

export {}
