/*
 * @Description: 
 * @Author: xfGuo
 * @Date: 2020-07-01 11:58:52
 * @LastEditors: xfGuo
 * @LastEditTime: 2020-07-03 14:22:27
 */ 
import React from 'react';
import styles from './NoneData.less';
import Iconfont from '../../base/Iconfont';
import cls from 'classnames';
const NoneData = ({ style, className }) => {
  const classNames = React.useMemo(() => cls('none', className), [className]);
  return (
    <div className={classNames} style={style || {}}>
      <Iconfont type="icon-zanwushuju" className={styles['icon-no-data']} />
      <span>暂无数据</span>
    </div>
  );
};

export default NoneData;
