declare module 'vue' {
  export interface GlobalComponents {
    ZzButton: typeof import('zzui')['ZzButton']
    ZzConfigProvider: typeof import('zzui')['ZzConfigProvider']
    ZzInput: typeof import('zzui')['ZzInput']
    ZzIcon: typeof import('zzui')['ZzIcon']
    ZzSelect: typeof import('zzui')['ZzSelect']
  }
}

export {}
