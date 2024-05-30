import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import macrosPlugin from 'vite-plugin-babel-macros';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'docs',
  },
  resolve: {},
  plugins: [
    macrosPlugin(),
    react({
      jsxImportSource: '@emotion/react',
    }),
  ],
  base: '/aft-admin/',
});
