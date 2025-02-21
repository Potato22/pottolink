import { css } from 'jquery';
import { defineConfig } from 'vite';

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
  }
});