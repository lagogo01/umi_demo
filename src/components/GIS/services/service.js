/*
 * @Description: 请输入....
 * @Author: ensucao
 * @Date: 2020-06-16 20:59:38
 * @LastEditTime: 2020-06-24 19:40:20
 * @LastEditors: escao
 */

import { fetch } from '@/utils/request';

export const getLines = () => {
  return fetch(`/api/linelist`);
};

export const getSubstations = () => {
  return fetch(`/api/substationList`);
};

export const getTowers = linecode => {
  return fetch(`/api/towerlist/${linecode}`);
};

export const getFittings = linecode => {
  return fetch(`/api/fittings/linecode/${linecode}`);
};

export const getWires = linecode => {
  return fetch(`/api/wirelist/${linecode}`);
};
//
export const getThematicLayers = () => {
  return Promise.resolve([
    {
      name: '青海省主网架',
      url:
        '/arcgis/rest/services/qhproject/%E9%9D%92%E6%B5%B7%E7%9C%81%E4%B8%BB%E7%BD%91%E6%9E%B6/MapServer',
      type: 'arcgis',
      show: false,
    },
    {
      name: '在建工程',
      url:
        '/arcgis/rest/services/qhproject/%E5%9C%A8%E5%BB%BA%E5%B7%A5%E7%A8%8B/MapServer',
      type: 'arcgis',
      show: false,
    },
    {
      name: '通道专题数据',
      url:
        '/arcgis/rest/services/qhproject/%E4%B8%93%E9%A2%98%E6%95%B0%E6%8D%AE/MapServer',
      type: 'arcgis',
      show: false,
    },
    {
      name: '交跨信息',
      url:
        '/arcgis/rest/services/%E9%9D%92%E6%B5%B7%E6%99%BA%E6%85%A7%E5%B7%A5%E5%9C%B0%E4%B8%89%E8%B7%A8%E6%95%B0%E6%8D%AE%E5%8F%91%E5%B8%832/MapServer',
      type: 'arcgis',
      show: false,
    },
    // {
    //   name: '行政区划',
    //   url:
    //     '/arcgis/rest/services/qhproject/%E8%A1%8C%E6%94%BF%E5%8C%BA%E5%88%92/MapServer',
    //   type: 'arcgis',
    //   show: true,
    // },
  ]);
};
