import { notification } from 'antd';
import { url } from '@/components/IconFont';

/*
 * @Description: 请输入....
 * @Author: ensucao
 * @Date: 2020-06-06 21:09:20
 * @LastEditTime: 2020-07-09 16:43:44
 * @LastEditors: wdxin
 */

export const noticeAdd = type => {
  notification.success({
    message: `新建${type}成功`,
  });
};

export const noticeEdit = type => {
  notification.success({
    message: `编辑${type}成功`,
  });
};

export const noticeDelete = type => {
  notification.success({
    message: `删除${type}成功`,
  });
};

export const noticeDeleteBatch = type => {
  notification.success({
    message: `批量删除${type}成功`,
  });
};

/**
 * @description: 获取iconFont图标集合
 * @param {type}
 * @return:
 */
export const getIconTypes = async () => {
  let icons = [];
  const re = /id="(\S+)"/g;
  const response = await fetch(url);
  const data = await response.text();
  const matches = data.match(re);
  icons = matches.map(p => p.replace('id=', '').replace(/"/g, ''));
  return icons;
};

//生成uuid
export const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16),
  );
};
