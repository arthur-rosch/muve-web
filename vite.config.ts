import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    host: true,
  },
  build: {
    outDir: 'dist', // Certifique-se de que a pasta de saída seja 'dist'
    sourcemap: false, // Desabilita source maps em produção para evitar arquivos grandes
    minify: 'terser', // Usa Terser para minificação mais agressiva
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Cria divisão de código (code splitting) para bibliotecas grandes
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'], // Pré-otimiza essas dependências importantes
  },
})
