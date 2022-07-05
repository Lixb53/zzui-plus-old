declare module 'vue' {
    export interface GlobalComponents {
        Zzbutton: typeof import('../packages/zzui')['ZzButton']
    }
}


declare module '@zzui/build-utils'
export {}