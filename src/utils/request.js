/* eslint-disable no-param-reassign */
import axios from 'axios';
import { history } from 'umi';
import { notification } from 'antd';
import { getTokenObject } from './system';
import { ENV, PROGRESS_TEST, SMART_TEST } from './env';

// axios.defaults.timeout = 10000;
// axios.defaults.baseURL ='http://47.106.128.188:8077/smart_construction_ims'; // 填写域名

axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // config.data = JSON.stringify(config.data);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// 响应拦截器即异常处理
axios.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    let message;
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          message = err.response?.data?.message || '错误请求';
          break;
        case 401:
          message = '未授权，请重新登录';
          break;
        case 403:
          message = '拒绝访问';
          break;
        case 404:
          message = '请求错误,未找到该资源';
          break;
        case 405:
          message = '请求方法未允许';
          break;
        case 408:
          message = '请求超时';
          break;
        case 500:
          message = `服务端错误`;
          break;
        case 501:
          message = err.response?.data?.message || '网络未实现';
          break;
        case 502:
          message = '网络错误';
          break;
        case 503:
          message = '服务不可用';
          break;
        case 504:
          message = '网络超时';
          break;
        case 505:
          message = 'http版本不支持该请求';
          break;
        default:
          message = `连接错误${err.response.status}`;
      }
    } else {
      message = '连接到服务器失败';
    }

    notification.error({
      message,
    });
    return Promise.resolve(err.response);
  },
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params,
      })
      .then(response => {
        resolve(response?.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      response => {
        resolve(response?.data);
      },
      err => {
        reject(err);
      },
    );
  });
}

export function postParams(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, null, { params })
      .then(response => {
        resolve(response?.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * 封装login请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function login(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      response => {
        resolve(response);
      },
      err => {
        reject(err);
      },
    );
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      response => {
        resolve(response?.data);
      },
      err => {
        reject(err);
      },
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      response => {
        resolve(response?.data);
      },
      err => {
        reject(err);
      },
    );
  });
}

/**
 * 封装del请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function del(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, data).then(
      response => {
        resolve(response?.data);
      },
      err => {
        reject(err);
      },
    );
  });
}
