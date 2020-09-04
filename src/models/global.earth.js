/*
 * @Description:
 * @Autor: hhao
 * @Date: 2020-09-03 17:22:19
 * @LastEditors: hhao
 * @LastEditTime: 2020-09-03 17:22:21
 */
export default {
  namespace: 'earth',

  state: {
    NSCEarth: null,
    Cesium: null,
    viewer: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      const newState = { ...state, ...action.payload };
      console.log(newState);
      return newState;
    },
  },
};
