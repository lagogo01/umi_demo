/*
 * @Description: 请输入....
 * @Author: ensucao
 * @Date: 2020-06-01 19:47:45
 * @LastEditTime: 2020-08-04 14:41:44
 * @LastEditors: huanghai
 */

/* eslint-disable no-plusplus */

import moment from 'moment';

export const setTokenObject = ({ token, expiretime }) => {
  localStorage.setItem('token', token);
  localStorage.setItem('expiretime', expiretime);
};

export const getTokenObject = () => {
  const token = localStorage.getItem('token');
  const expiretime = localStorage.getItem('expiretime');
  return { token, expiretime };
};

export const removeTokenObject = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiretime');
};

export const setUserProject = e => {
  const projectStr = JSON.stringify(e);
  localStorage.setItem('project', projectStr);
};

export const getUserProject = () => {
  const projectStr = localStorage.getItem('project');
  if (projectStr != null) {
    const {
      baseProjectId,
      projectId,
      projectName,
      projectType,
      projectCategoryId,
    } = JSON.parse(projectStr);
    return {
      baseProjectId,
      projectId,
      projectName,
      projectType,
      projectCategoryId,
    };
  }
  return null;
};

export const removeUserProject = () => {
  return localStorage.removeItem('project');
};

/**
 * @description: 认证判断
 * @param {type}
 * @return:
 */
export const userLoginStatus = () => {
  const { expiretime } = getTokenObject();
  if (expiretime && moment(expiretime).isAfter(moment())) {
    return true;
  }
  return false;
};

export const userAuthType = authorities => {
  if (authorities?.find(p => p?.name == 'admin')) {
    return 'admin';
  }
  return 'user';
};

// export const hasAutority = (routes, pathName) => {
//   let authority = false;
//   if (pathName == '/' || pathName == '') {
//     return true;
//   }
//   for (let index = 0; index < routes?.length; index++) {
//     const curRoute = routes[index];
//     if (curRoute.route == pathName) {
//       authority = true;
//       break;
//     }

//     if (curRoute?.children) {
//       authority = authority || hasAutority(curRoute.children, pathName);
//     }
//   }
//   return authority;
// };

export const hasAutority = (routes, pathName) => {
  let authority = false;
  // let retNode = null;
  if (
    pathName == '/' ||
    pathName == '' ||
    pathName?.indexOf('message') >= 0 ||
    pathName?.indexOf('userSetting') >= 0
  ) {
    return true;
  }
  function deepSearch(tree, path) {
    for (let i = 0; i < tree.length; i += 1) {
      if (tree[i].children && tree[i].children.length > 0) {
        deepSearch(tree[i].children, path);
      }
      if (
        path.indexOf(tree[i].route) >= 0 ||
        authority ||
        (path == '/admin' && tree[i].route.indexOf('admin') >= 0)
      ) {
        // authority||(retNode = tree[i]);
        authority = true;
        break;
      }
    }
  }
  deepSearch(routes, pathName);
  return authority;
};

export const Page_Size = 10;

// 测试环境websocket url
const devWebSocketUrl =
  'ws://47.106.128.188:8077/smart_construction_ims/api/webSocket';
// 正式环境websocket url
const prodWebSocketUrl =
  'ws://120.78.81.139:8099/smart_construction_ims/api/webSocket';

export const getWebSocketUrl = () => {
  if (REACT_APP_ENV === 'dev') {
    return devWebSocketUrl;
  }
  if (REACT_APP_ENV === 'prod') {
    return prodWebSocketUrl;
  }
  return '';
};

export const messageType = {
  weather: 17,
  video: 18,
  status: 19,
  system: 0,
};

// export const resizeFontSize=()=>{
//   const FONT_SIZE=16;
//   return FONT_SIZ
// }

export const hash = {
  list: [],
  currentPath: '',
  newList: (key, value = []) => {
    if (window.location.pathname !== hash.currentPath) {
      hash.list = [];
      hash.currentPath = window.location.pathname;
    }
    const arr = [];
    hash.setList(key, value);
    for (const key in hash.list) {
      arr.push(...hash.list[key]);
    }
    return arr;
  },
  setList: (key, value = []) => {
    hash.list[key] = value;
  },
  clearList: () => {
    hash.list = [];
  },
};
