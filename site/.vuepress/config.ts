import { resolve } from 'path'
import { defaultTheme, defineUserConfig, viteBundler } from 'vuepress'
import { codeBlockPlugin } from '@yanyu-fe/vuepress-plugin-code-block'
import vueJsx from '@vitejs/plugin-vue-jsx'

import * as navBar from './configs/navbar'
import * as sideBar from './configs/sidebar'

export default defineUserConfig({
  title: '前端组件库',
  base: process.env.NODE_ENV === 'production' ? '/zzui-plus-old/' : '/',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'zzui',
    },
  },
  lang: 'zh-CN',
  theme: defaultTheme({
    locales: {
      '/': {
        navbar: navBar.zh,
        sidebar: sideBar.zh,
      },
    },
  }),
  bundler: viteBundler({
    viteOptions: {
      plugins: [vueJsx()],
      resolve: {
        alias: {
          '@zzui/zzui': resolve(__dirname, '../../packages/zzui/index.ts'),
          '@zzui/hooks': resolve(__dirname, '../../packages/hooks/index.ts'),
          '@zzui/utils': resolve(__dirname, '../../packages/utils/index.ts'),
          '@zzui/tokens': resolve(__dirname, '../../packages/tokens/index.ts'),
          '@zzui/directives': resolve(__dirname, '../../packages/directives'),
        },
      },
    },
    vuePluginOptions: {
      reactivityTransform: true,
    },
  }),
  plugins: [codeBlockPlugin({})],
})
