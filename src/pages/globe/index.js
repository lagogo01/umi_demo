/*
 * @Description:
 * @Autor: hhao
 * @Date: 2020-08-20 20:02:06
 * @LastEditors: hhao
 * @LastEditTime: 2020-09-04 09:55:48
 */
import React, { useContext } from 'react';
import styles from './index.less';
import EarthControl from '../../components/GIS/Earth';
import * as portals from 'react-reverse-portal';

import { EarthContext } from '../../layouts/index';

const index = props => {
  const portalNode = useContext(EarthContext);
  console.log(EarthContext);

  return (
    <div className={styles.MainBlock}>
      <div className={styles.left}>我是左组件</div>
      <div className={styles.content}>
        {/* <portals.InPortal node={portalNode}> */}
        {/* <Earth onRef={(ref) => { this.NscEarthRef = ref }} />; */}
        {/* <EarthControl/> */}

        {/* </portals.InPortal> */}
        {/* <portals.OutPortal node={portalNode} /> */}
        <portals.OutPortal node={portalNode} />
      </div>
      <div className={styles.right}>我是右组件</div>
    </div>
  );
};

export default index;
