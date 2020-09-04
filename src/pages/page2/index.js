/*
 * @Description:
 * @Autor: hhao
 * @Date: 2020-08-20 20:02:06
 * @LastEditors: hhao
 * @LastEditTime: 2020-09-04 09:59:17
 */
import React, { useContext } from 'react';
import EarthControl from '../../components/GIS/Earth';
import * as portals from 'react-reverse-portal';
import styles from './index.less';

import { EarthContext } from '../../layouts/index';

const index = props => {
  const portalNode = useContext(EarthContext);

  return (
    <div className={styles.MainBlock}>
      <div className={styles.left}>我是左组件</div>
      <div className={styles.content}>
        <portals.OutPortal node={portalNode} />
      </div>
    </div>
  );
};

export default index;
