import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    host: true,
  },
  build: {
    outDir: 'dist', // Certifique-se de que a pasta de saída é 'dist'
  },
})