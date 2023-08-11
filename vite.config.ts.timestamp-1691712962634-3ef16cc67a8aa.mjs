// vite.config.ts
import { defineConfig } from "file:///E:/projects/h5-editor-vue3/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/projects/h5-editor-vue3/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
import VueSetupExtend from "file:///E:/projects/h5-editor-vue3/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";
import AutoImport from "file:///E:/projects/h5-editor-vue3/node_modules/unplugin-auto-import/dist/vite.js";
import { ElementPlusResolver } from "file:///E:/projects/h5-editor-vue3/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import Components from "file:///E:/projects/h5-editor-vue3/node_modules/unplugin-vue-components/dist/vite.mjs";
import Icons from "file:///E:/projects/h5-editor-vue3/node_modules/unplugin-icons/dist/vite.mjs";
var __vite_injected_original_dirname = "E:\\projects\\h5-editor-vue3";
var vite_config_default = defineConfig(({ command, mode }) => {
  return {
    plugins: [
      VueSetupExtend(),
      vue(),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      AutoImport({
        dts: "src/auto-imports.d.ts",
        imports: ["vue"],
        resolvers: [ElementPlusResolver()]
      }),
      Icons({
        autoInstall: true,
        compiler: "vue3"
      })
    ],
    resolve: {
      alias: {
        vue: "vue/dist/vue.esm-bundler.js",
        "@": resolve(__vite_injected_original_dirname, "./src"),
        "@utils": resolve(__vite_injected_original_dirname, "./src/utils"),
        "@components": resolve(__vite_injected_original_dirname, "./src/components")
      }
    }
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
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxwcm9qZWN0c1xcXFxoNS1lZGl0b3ItdnVlM1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxccHJvamVjdHNcXFxcaDUtZWRpdG9yLXZ1ZTNcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L3Byb2plY3RzL2g1LWVkaXRvci12dWUzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXG5pbXBvcnQgVnVlU2V0dXBFeHRlbmQgZnJvbSAndml0ZS1wbHVnaW4tdnVlLXNldHVwLWV4dGVuZCdcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCBwb3N0Q3NzVG9WaWV3cG9pbnQgZnJvbSAncG9zdGNzcy1weC10by12aWV3cG9ydCdcbmltcG9ydCBJY29ucyBmcm9tIFwidW5wbHVnaW4taWNvbnMvdml0ZVwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUgfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHBsdWdpbnM6IFtcbiAgICAgIFZ1ZVNldHVwRXh0ZW5kKCksXG4gICAgICB2dWUoKSxcbiAgICAgIENvbXBvbmVudHMoe1xuICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldXG4gICAgICB9KSxcbiAgICAgIEF1dG9JbXBvcnQoe1xuICAgICAgICBkdHM6ICdzcmMvYXV0by1pbXBvcnRzLmQudHMnLFxuICAgICAgICBpbXBvcnRzOiBbJ3Z1ZSddLFxuICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldXG4gICAgICB9KSxcbiAgICAgIEljb25zKHtcbiAgICAgICAgYXV0b0luc3RhbGw6IHRydWUsXG4gICAgICAgIGNvbXBpbGVyOiBcInZ1ZTNcIixcbiAgICAgIH0pLFxuICAgIF0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgdnVlOiAndnVlL2Rpc3QvdnVlLmVzbS1idW5kbGVyLmpzJyxcbiAgICAgICAgJ0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgICAgICdAdXRpbHMnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL3V0aWxzJyksXG4gICAgICAgICdAY29tcG9uZW50cyc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvY29tcG9uZW50cycpXG4gICAgICB9LFxuICAgIH0sXG4gICAgLy8gY3NzOiB7XG4gICAgLy8gICBwb3N0Y3NzOiB7XG4gICAgLy8gICAgIHBsdWdpbnM6IFtcbiAgICAvLyAgICAgICBwb3N0Q3NzVG9WaWV3cG9pbnQoe1xuICAgIC8vICAgICAgICAgdmlld3BvcnRXaWR0aDogMTkyMCwgLy8gXHU4QkJFXHU4QkExXHU3QTNGXHU4OUM2XHU1M0UzXHU1QkJEXHU1RUE2XG4gICAgLy8gICAgICAgICB1bml0UHJlY2lzaW9uOiA2LCAvLyBcdThGNkNcdTYzNjJcdTU0MEVcdTRGRERcdTc1NTlcdTc2ODRcdTdDQkVcdTVFQTZcbiAgICAvLyAgICAgICAgIHVuaXRUb0NvbnZlcnQ6ICdweCcsIC8vIFx1OTcwMFx1ODk4MVx1OEY2Q1x1NjM2Mlx1NzY4NFx1NTM1NVx1NEY0RFxuICAgIC8vICAgICAgICAgcHJvcExpc3Q6IFsnKiddLFxuICAgIC8vICAgICAgICAgdmlld3BvcnRVbml0OiAndncnLCAvLyBcdTVFMENcdTY3MUJcdTRGN0ZcdTc1MjhcdTc2ODRcdTg5QzZcdTUzRTNcdTUzNTVcdTRGNERcbiAgICAvLyAgICAgICAgIGZvbnRWaWV3cG9ydFVuaXQ6ICd2dycgLy8gXHU1QjU3XHU0RjUzXHU0RjdGXHU3NTI4XHU3Njg0XHU4OUM2XHU1M0UzXHU1MzU1XHU0RjREXG4gICAgLy8gICAgICAgfSlcbiAgICAvLyAgICAgXVxuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1EsU0FBUyxvQkFBb0I7QUFDblMsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsZUFBZTtBQUN4QixPQUFPLG9CQUFvQjtBQUMzQixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDJCQUEyQjtBQUNwQyxPQUFPLGdCQUFnQjtBQUV2QixPQUFPLFdBQVc7QUFSbEIsSUFBTSxtQ0FBbUM7QUFXekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxTQUFTLEtBQUssTUFBTTtBQUNqRCxTQUFPO0FBQUEsSUFDTCxTQUFTO0FBQUEsTUFDUCxlQUFlO0FBQUEsTUFDZixJQUFJO0FBQUEsTUFDSixXQUFXO0FBQUEsUUFDVCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxNQUNuQyxDQUFDO0FBQUEsTUFDRCxXQUFXO0FBQUEsUUFDVCxLQUFLO0FBQUEsUUFDTCxTQUFTLENBQUMsS0FBSztBQUFBLFFBQ2YsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsTUFDbkMsQ0FBQztBQUFBLE1BQ0QsTUFBTTtBQUFBLFFBQ0osYUFBYTtBQUFBLFFBQ2IsVUFBVTtBQUFBLE1BQ1osQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUs7QUFBQSxRQUNMLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsUUFDL0IsVUFBVSxRQUFRLGtDQUFXLGFBQWE7QUFBQSxRQUMxQyxlQUFlLFFBQVEsa0NBQVcsa0JBQWtCO0FBQUEsTUFDdEQ7QUFBQSxJQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBZUY7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
