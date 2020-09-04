/*
 * @Description:
 * @Autor: hhao
 * @Date: 2020-09-04 15:39:01
 * @LastEditors: hhao
 * @LastEditTime: 2020-09-04 17:01:14
 */
import * as request from '@/utils/request';

import qs from 'qs';

export const getU3dJsonAndJs = payload => {
  const str = qs.stringify(payload);
  return request.fetch(`/userapi/api/fileInfo?${str}`);
};

export const getElectronicId = pid => {
  return request.fetch(`/userapi/api/electricBarrier/isUseable/${pid}`);
};

export const getElectronicPoints = id => {
  return request.fetch(`/userapi/api/barrierPoints/barrier/${id}`);
};
