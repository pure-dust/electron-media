require('dotenv').config({ path: join(__dirname, '.env') });

import { join, resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import electron from 'vitejs-plugin-electron';
import iconfont from './plugins/plugin-iconfont';

export default defineConfig(({ /* development | production */ mode }) => ({
  plugins: [vue(), electron(), iconfont()].filter(Boolean),
  root: resolve(__dirname, 'src/render'),
  base: '/',
  iconfont: ['//at.alicdn.com/t/font_2613851_qf2knv5dw7l.js'],
  server: {
    port: +process.env.PORT,
    proxy: {
      '/api': {
        target: 'http://localhost:3355',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    fs: {
      strict: false,
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/render'),
      '@src': resolve(__dirname, 'src'),
      '@root': __dirname,
      '@main': resolve(__dirname, 'src/main'),
    },
  },
  define: { APP_ENV: `'${mode}'` },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/render/styles/_handle.scss";',
      },
    },
  },
}));
