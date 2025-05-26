import { defineConfig, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { checker } from 'vite-plugin-checker';
import path, { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import svgLoader from 'vite-svg-loader';
import pkg from './package.json';
import dts from 'vite-plugin-dts';
import { argv } from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig(() => {
  const isStoriesBuild = argv[1].includes('storybook');

  return {
    plugins: [
      vue(),
      checker({
        typescript: true,
      }),
      svgLoader(),
      ...(isStoriesBuild
        ? []
        : [
            dts({
              tsconfigPath: 'tsconfig.app.json',
              cleanVueFileName: true,
              rollupTypes: true,
              include: [path.resolve(__dirname, './src')],
            }),
          ]),
    ],
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
    },
    build: {
      minify: false,
      target: 'esnext',
      sourcemap: true,
      outDir: './dist',
      lib: {
        name: 'telegram-ui-vue',
        fileName: 'index',
        entry: resolve(__dirname, 'src/index.ts'),
        formats: ['es'],
      },
      rollupOptions: {
        external: [...Object.keys(pkg.dependencies ?? {})],
      },
    },
  } as UserConfig;
});
