/*
 * @Description:
 * @Autor: hhao
 * @Date: 2020-08-20 19:42:57
 * @LastEditors: hhao
 * @LastEditTime: 2020-09-04 15:57:05
 */
import { defineConfig } from 'umi';
import { resolve } from 'path';

export default defineConfig({
  history: { type: 'hash' },
  dva: {
    skipModelValidate: true,
    immer: true,
  },
  //hash路由
  hash: false,
  //生成hash文件名
  publicPath: './',
  ignoreMomentLocale: true,
  targets: {
    ie: 11,
  },
  autoprefixer: {
    browsers: ['> 1%', 'last 2 versions', 'not ie <= 10'],
  },

  nodeModulesTransform: {
    type: 'none',
  },

  chunks: ['umi'],

  headScripts: [{ src: 'Cesium.js', defer: true }],
  links: [{ rel: 'stylesheet', href: './Widgets/widgets.css' }],
  copy: ['node_modules/cesium/Build/Cesium'],

  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        {
          path: '/u3d',
          component: './index',
        },
        {
          path: '/',
          component: './globe/index',
        },
        {
          path: '/globe',
          component: './globe/index',
        },
        {
          path: '/page2',
          component: './page2/index',
        },
        {
          path: '/page3',
          component: './page3/index',
        },
      ],
    },
  ],

  alias: {
    '@': resolve(__dirname, './src'), // 解析出一个当前目录下的同级src的绝对路径
    '@/utils': resolve(__dirname, './src/utils'),
    '@/services': resolve(__dirname, './src/services'),
    '@/assets': resolve(__dirname, './src/assets'),
    '@/components': resolve(__dirname, './src/components'),
    '@/layouts': resolve(__dirname, './src/layouts'),
    '@/config': resolve(__dirname, './src/config'),
    '@/pages': resolve(__dirname, './src/pages'),
  },

  proxy: {
    '/userapi': {
      target: 'http://120.78.81.139:8099/smart_construction_ims',
      changeOrigin: true,
      pathRewrite: {
        '^/userapi': '',
      },
    },
  },
});
