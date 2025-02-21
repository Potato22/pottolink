import { defineConfig } from 'vite'
import path from 'path';

export default defineConfig({
  root: '.',
  base: './',
  resolve: {
    alias: {
      'jquery': path.resolve(__dirname, 'node_modules/jquery/dist/jquery.min.js')
    }
  },
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