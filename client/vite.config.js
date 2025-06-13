import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  return {
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          editor: resolve(__dirname, 'pages/editor/index.html'),
          submit: resolve(__dirname, 'pages/submit/index.html'),
          dynamic: resolve(__dirname, 'pages/dynamic/index.html'),
          richtext: resolve(__dirname, 'pages/richtext/index.html'),
        },
      },
      outDir: resolve('../static/dist'),
      emptyOutDir: true,
    },
  }
});
