/*
 * @Description:
 * @Author: xfGuo
 * @Date: 2020-07-17 08:51:41
 * @LastEditors: hhao
 * @LastEditTime: 2020-09-02 16:34:56
 */

import React, { Component } from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';
import { Provider, connect } from 'react-redux';
import { Modal } from 'antd';
import ProtocolDataType from './ProtocolDataType';
import moment from 'moment';
import styles from './UnityModal.less';

class UnityLoader extends Component {
  constructor(props) {
    super(props);
    this.speed = 30;
    this.state = {
      rotation: 0,
      personModalVisible: false,
    };
    this.unityContent = null;
    this.modalPath = {};

  }


  componentWillReceiveProps(props) {
    // const { modalPath } = props;
    // if (modalPath && modalPath === this.props.modalPath) return;
   // this.loadU3dModal(modalPath);
  }


  loadU3dModal(modalPath) {
   
  }

  getHPrec = height => {
    let heightPrc = ((height * 100) / process.env.DesignHeight).toFixed(2);
    return `${heightPrc}%`;
  }

  getWPrec = width => {
    let widthPrc = ((width * 100) / process.env.DesignWidth).toFixed(2);
    return `${widthPrc}%`;
  }

  render() {
    const { modalPath } = this.props;

    return this.modalPath && JSON.stringify(this.modalPath) !== "{}" ? < Unity unityContent={this.unityContent} /> : <></>;
  }
}

export default connect(({ unity3d, loading }) => ({
  unity3d, 
  isModalPathLoading: false
}))(UnityLoader);

