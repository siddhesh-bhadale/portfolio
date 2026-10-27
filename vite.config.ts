import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // This repository is deployed at the /portfolio/ GitHub Pages subpath.
  // Set VITE_BASE_PATH=/ for root/custom-domain deployment if needed.
  base: process.env.VITE_BASE_PATH || '/portfolio/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    modules: {
      // Readable class names in dev, hashed in production.
      generateScopedName:
        process.env.NODE_ENV === 'production'
          ? '[hash:base64:6]'
          : '[name]__[local]',
    },
  },
  build: {
    target: 'es2020',
    sourcemap: false,
  },
});
