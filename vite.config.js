import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  server: { port: 3000 },
  preview: {
    port: 3333,
    strictPort: true,
    host: '0.0.0.0',
  },
  build: { sourcemap: true },
  css: { devSourcemap: true },

  resolve: {
    alias: {
      '@src': '/src/',
      '@components': '/src/components/',
      '@pages': '/src/pages/',
      '@utils': '/src/utils/',
      '@services': '/src/services/',
      '@assets': '/src/assets/',
      '@styles': '/src/assets/styles',
      '@hooks': '/src/hooks/',
      '@store': '/src/store/',
      '@api': '/src/api/',
      '@Models': '/src/Models/',
      '@translation': '/src/translation/',
      '@print': '/src/print/',
      '@reports': '/src/reports/',
      '@views': '/src/views/',
    },
  },
});
