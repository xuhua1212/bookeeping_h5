/*
 * @Author: xuhua
 * @Date: 2023-02-21 11:34:48
 * @LastEditors: xuhua
 * @LastEditTime: 2023-03-02 16:11:33
 * @FilePath: /bookkeeping_h5/vite.config.js
 * @Description:
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createStyleImportPlugin } from "vite-plugin-style-import";
import path from "path";
import postCssPxToRem from "postcss-pxtorem";
import autoprefixer from "autoprefixer";

const pathResolve = (dir) => path.resolve(__dirname, dir);
const alias = {
  "@": pathResolve("src"),
};
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createStyleImportPlugin({
      libs: [
        {
          libraryName: "zarm",
          esModule: true,
          resolveStyle: (name) => `zarm/es/${name}/style/css`,
        },
      ],
    }),
  ],
  resolve: {
    alias,
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
    open: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:7001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 16,
          propList: ["*"],
          selectorBlackList: [".norem"],
        }),
        autoprefixer({
          overrideBrowserslist: ["Android 4.1", "iOS 7.1", "Chrome > 31", "ff > 31", "ie >= 8"],
          grid: true,
        }),
      ],
    },
    modules: {
      localsConvention: "dashesOnly",
    },
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
      },
    },
  },
});
