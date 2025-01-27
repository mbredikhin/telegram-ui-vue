import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { checker } from 'vite-plugin-checker';
import path, { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
  },
});
