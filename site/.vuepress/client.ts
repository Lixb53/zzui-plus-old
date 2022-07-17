import { defineClientConfig } from '@vuepress/client'
// @ts-ignore
import zzui from '@zzui/zzui'
import '@zzui/theme-chalk/src/index.scss'
import '@zzui/theme-chalk/src/dark/css-vars.scss'
import './custom.scss'

export default defineClientConfig({
  enhance({ app }) {
    app.use(zzui)
  },
})
