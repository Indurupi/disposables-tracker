import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '@assets': path.resolve(__dirname, './client/assets'),
      '@components': path.resolve(__dirname, './client/src/components'),
      '@lib': path.resolve(__dirname, './client/src/lib'),
      '@hooks': path.resolve(__dirname, './client/src/hooks'),
      '@icons': path.resolve(__dirname, './client/src/icons'),
      '@shared': path.resolve(__dirname, './shared'),
    },
  },
  define: {
    'process.env.CLIENT_ONLY': JSON.stringify(true),
  },
  server: {
    port: 3000,
    host: true,
    open: true,
  },
});