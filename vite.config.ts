import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/ct-helper/',
  plugins: [react()],
  build: {
    outDir: 'dist'
  }
})
