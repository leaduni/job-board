import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/cms': {
        target: 'https://leaduni-cms.up.railway.app',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/cms/, ''),
      },
    },
  },
})

