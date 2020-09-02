/*
 * @Description: 
 * @Autor: hhao
 * @Date: 2020-08-20 19:42:57
 * @LastEditors: hhao
 * @LastEditTime: 2020-09-02 18:49:59
 */
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  history: { type: 'hash' },
 
  routes: [
    {
      path: '/', 
      component: '../layouts/index',
      routes: [
        {
          path: '/index',
          component: './index'
        },
        {
          path: '/page1',
          component: './page1/index'
        }, {
          path: '/page2',
          component: './page2/index'
        }
      ]
    },
  ],
});
