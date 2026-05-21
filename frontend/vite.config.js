import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    host: true
  },
  // 不对 .html 文件做 Vite 模块转换，避免注入 @vite/client
  html: {
    inject: false
  }
})
