/*
 * @Descripttion:
 * @Author: lsun
 * @Date: 2020-02-04 11:28:05
 * @LastEditors: hhao
 * @LastEditTime: 2020-09-04 09:30:53
 */
import styles from './index.less';
import Header from './menu';
import { router as Router } from 'dva';
import React, { useState, useEffect, useRef, createContext } from 'react';
import cls from 'classnames';
import * as portals from 'react-reverse-portal';
import EarthControl from '../components/GIS/Earth';

const { Redirect } = Router;

export const EarthContext = createContext(null);

function BasicLayout(props) {
  const portalNode = React.useMemo(() => portals.createHtmlPortalNode(), []);

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <Header />
      </div>

      <div className={styles['content']}>
        <portals.InPortal node={portalNode}>
          <EarthControl />
        </portals.InPortal>

        <EarthContext.Provider value={portalNode}>
          {props.children}
        </EarthContext.Provider>
        {/* {props.children} */}
      </div>
    </div>
  );
}

export default BasicLayout;
