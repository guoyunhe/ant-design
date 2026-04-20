import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: [
      { find: /\.(css|less)$/, replacement: 'identity-obj-proxy' },
      { find: /^antd$/, replacement: '/components/index.ts' },
      { find: /^antd\/es\/(.*)$/, replacement: '/components/$1' },
      { find: /^antd\/lib\/(.*)$/, replacement: '/components/$1' },
      { find: /^antd\/locale\/(.*)$/, replacement: '/components/locale/$1' },
    ],
  },
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setup.ts', './tests/setupAfterEnv.ts'],
    include: ['**/check-site.{j,t}s'],
    exclude: ['**/node_modules/**', '**/_site/**'],
    maxWorkers: '50%',
  },
});
