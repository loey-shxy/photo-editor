import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import postCssToViewpoint from 'postcss-px-to-viewport'
import Icons from "unplugin-icons/vite";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      VueSetupExtend(),
      vue(),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      AutoImport({
        dts: 'src/auto-imports.d.ts',
        imports: ['vue'],
        resolvers: [ElementPlusResolver()]
      }),
      Icons({
        autoInstall: true,
        compiler: "vue3",
      }),
    ],
    resolve: {
      alias: {
        vue: 'vue/dist/vue.esm-bundler.js',
        '@': resolve(__dirname, './src'),
        '@utils': resolve(__dirname, './src/utils'),
        '@components': resolve(__dirname, './src/components')
      },
    },
    // css: {
    //   postcss: {
    //     plugins: [
    //       postCssToViewpoint({
    //         viewportWidth: 1920, // 设计稿视口宽度
    //         unitPrecision: 6, // 转换后保留的精度
    //         unitToConvert: 'px', // 需要转换的单位
    //         propList: ['*'],
    //         viewportUnit: 'vw', // 希望使用的视口单位
    //         fontViewportUnit: 'vw' // 字体使用的视口单位
    //       })
    //     ]
    //   }
    // }
  }
})
