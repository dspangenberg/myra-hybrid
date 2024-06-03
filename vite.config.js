import path from 'path'

import copy from 'rollup-plugin-copy'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default ({ command }) => defineConfig({
  base: command === 'serve' ? '' : '/dist/',
  publicDir: 'fake_dir_so_nothing_gets_copied',
  build: {
    manifest: true,
    outDir: 'public/dist',
    rollupOptions: {
      input: 'resources/js/app.js'
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'resources/js/')
    }
  },
  plugins: [
    vue(),
    copy({
      targets: [
        { src: './node_modules/@fontsource/clear-sans/files/*', dest: 'public/fonts' }
      ]
    }),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'resources/svgs')],
      svgoOptions: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
              // customize plugin options
                convertColors: {
                  currentColor: true
                }
              }
            }
          },
          {
            name: 'removeAttrs',
            params: {
              attrs: 'stroke-width'
            }
          }
        ]
      },
      symbolId: 'icon-[dir]-[name]'
    })
  ]
})
