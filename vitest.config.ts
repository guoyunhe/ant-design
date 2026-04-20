import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

const compileModules = [
  'react-sticky-box',
  'rc-tween-one',
  '@babel',
  '@ant-design/icons',
  '@ant-design/icons/CloseOutlined',
  'countup.js',
  '.pnpm',
  '@asamuzakjp',
  '@rc-component',
  'parse5',
  '@exodus',
  'jsdom',
  '@csstools',
];

const shouldIgnoreSemantic =
  ['dist', 'lib', 'es', 'dist-min'].includes(process.env.LIB_DIR ?? '') ||
  ['1', 'true'].includes(process.env.SKIP_SEMANTIC ?? '');

function getIncludePattern(libDir?: string) {
  if (['dist', 'lib', 'es', 'dist-min'].includes(libDir ?? '')) {
    return ['**/demo.test.{j,t}s?(x)'];
  }

  return ['**/*.test.{j,t}s?(x)'];
}

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
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts', './tests/setupAfterEnv.ts'],
    include: getIncludePattern(process.env.LIB_DIR),
    exclude: [
      '**/node_modules/**',
      '**/_site/**',
      '**/dekko/**',
      '**/node.test.{j,t}s?(x)',
      '**/image.test.{j,t}s',
      ...(shouldIgnoreSemantic ? ['**/*demo-semantic.test.{j,t}s?(x)'] : []),
    ],
    environmentOptions: {
      jsdom: {
        url: 'http://localhost',
      },
    },
    maxWorkers: '50%',
    server: {
      deps: {
        inline: compileModules,
      },
    },
  },
});
