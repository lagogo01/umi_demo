/*
 * @Description:
 * @Author: xfGuo
 * @Date: 2020-07-21 10:23:35
 * @LastEditors: hhao
 * @LastEditTime: 2020-09-04 15:45:28
 */
import * as services from '../services/unity3d/index';

export default {
  namespace: 'unity3d',

  state: {
    unityContent: null,
    isLoad: false,
    loadingProgress: 0,
    unityDeviceCode: '',
    safetyHatCode: '',
    modalPath: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({ type: 'save' });
    },
    *fetchU3dJsonAndJs({ payload, callback }, { call, put }) {
      const { data, code } = yield call(services.getU3dJsonAndJs, payload);
      if (parseInt(code) === 200) {
        let modalJsPath = data?.find(
          item => item.fileName.indexOf('UnityLoader.js') > -1,
        )?.pathWithBucket;
        let modalJsonPath = data?.find(
          item => item.fileName.indexOf('.json') > -1,
        )?.pathWithBucket;
        let modalPath = { modalJsPath, modalJsonPath };
        yield put({ type: 'save', payload: { modalPath } });
      }
    },
    *fetchElectronicFence({ payload, callback }, { call, put }) {
      const { pid } = payload;
      const { data, code } = yield call(services.getElectronicId, pid);
      if (parseInt(code) === 200) {
        return data;
      }
    },
    *fetchElectronicFencePoints({ payload, callback }, { call, put }) {
      const { id } = payload;
      const { data, code } = yield call(services.getElectronicPoints, id);
      if (parseInt(code) === 200) {
        let points =
          data &&
          data.length > 0 &&
          data.map(item => {
            return {
              id: item.id,
              x: item.xcoord - 429,
              y: item.ycoord - 484,
            };
          });
        return points;
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    resetUnity3dModal(state, action) {
      return {
        ...state,
        unityContent: null,
        isLoad: false,
        loadingProgress: 0,
      };
    },
    resetUploadList(state, { payload }) {
      return { ...state, unityDeviceCode: '' };
    },
    resetSafetyHatCodeList(state, { payload }) {
      return { ...state, safetyHatCode: '' };
    },
  },
};
