import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/', // <<< 關鍵：設定正確的 public 路徑
  plugins: [vue()]
})
