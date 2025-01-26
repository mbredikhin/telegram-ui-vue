// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
  files: ['src/**/*.ts'],
  rules: {
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array',
      },
    ],
  },
});
