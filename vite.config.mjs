import { defineConfig } from 'vite'
import path from 'path';
import inject from '@rollup/plugin-inject';

export default defineConfig({
  root: '.',
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html',
        gallery: './gallery.html'
      }
    },
    cssCodeSplit: true,
    cssMinify: true
  },
  plugins: [
    inject({
      $: 'jquery',
      jQuery: 'jquery',
    })
  ],
  optimizeDeps: {
    include: ['jquery']
  },
});