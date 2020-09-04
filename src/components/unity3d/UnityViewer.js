/*
 * @Description:
 * @Autor: hhao
 * @Date: 2020-09-04 14:44:27
 * @LastEditors: hhao
 * @LastEditTime: 2020-09-04 15:11:28
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import UnityLoader from './UnityLoader';
import ProgressCircle from '../ProgressComponents/ProgressCircle';
import styles from './UnityViewer.less';

class UnityViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isLoad, loadingProgress, modalPath } = this.props;
    const progress = parseInt(loadingProgress * 100);

    return (
      <div className={styles['content']}>
        {!isLoad && (
          <div className={styles['loadingShow']}>
            <ProgressCircle strokeWidth={10} value={progress} />
          </div>
        )}
        <div className={!isLoad ? styles['unityHide'] : styles['unityShow']}>
          <UnityLoader modalPath={modalPath} />
        </div>
      </div>
    );
  }
}

export default connect(({ unity3d }) => ({
  isLoad: unity3d.isLoad,
  loadingProgress: unity3d.loadingProgress,
}))(UnityViewer);
