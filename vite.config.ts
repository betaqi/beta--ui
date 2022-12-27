import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({ reactivityTransform: true }),
    vueJsx({}),
    AutoImport({
      imports: ['vue', 'vue/macros'],
      dts: './auto-imports.d.ts',
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-imports.json',
        globalsPropValue: true
      }
    })
  ]
})
