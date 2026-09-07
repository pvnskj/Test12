import astro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      '.astro/**',
      'dist/**',
      'node_modules/**',
      'public/deep-dives/**',
      'playwright-report/**',
      'test-results/**',
      'backgrounds.js',
    ],
  },
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
];
