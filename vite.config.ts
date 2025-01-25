import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { checker } from 'vite-plugin-checker';

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['umd'],
      fileName: 'index',
      name: 'telegram-ui-vue',
    },
    target: 'esnext',
    outDir: './dist',
  },
  plugins: [
    vue(),
    checker({
      typescript: true,
    }),
  ],
});
