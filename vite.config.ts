import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 为 GitHub Pages 项目页准备，可通过环境变量控制 base
// 例如：VITE_BASE=/your-repo-name/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/io/',
})


