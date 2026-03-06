import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: '',
  base: './',
  build: {
    outDir: path.resolve(__dirname, './dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'assets/src/js/main.js'),
    },
  },
  server: {
    cors: true,
    strictPort: true,
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './assets/src'),
    },
  },
});
