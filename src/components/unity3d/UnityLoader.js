/*
 * @Description:
 * @Author: xfGuo
 * @Date: 2020-07-17 08:51:41
 * @LastEditors: hhao
 * @LastEditTime: 2020-09-04 17:14:41
 */

import React, { Component } from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';
import { Provider, connect } from 'react-redux';
import { Modal } from 'antd';
import ProtocolDataType from './ProtocolData/ProtocolDataType';
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

  // componentWillReceiveProps(props) {
  //   const { modalPath } = props;
  //   if (modalPath && modalPath === this.props.modalPath) return;
  //   this.loadU3dModal(modalPath);
  // }

  componentDidMount() {
    const { modalPath } = this.props;
    this.modalPath = modalPath;
    console.log(modalPath);
    this.loadU3dModal(modalPath);
  }

  loadU3dModal(modalPath) {
    const { dispatch } = this.props;
    if (!!modalPath?.modalJsonPath && !!modalPath?.modalJsPath) {
      this.modalPath = modalPath;
      this.unityContent = new UnityContent(
        modalPath?.modalJsonPath,
        modalPath?.modalJsPath,
      );
      // this.unityContent.on('EventName', message => {
      //   const { dispatch } = this.props;
      //   let k = message.match(/(?<=")([^:]+)(?=")/g);
      //   const type = k[0], id = k[1], name = k[2];
      //   if (type === ProtocolDataType.PersonPosition) {
      //     Modal.success({
      //       title: `${name}`,
      //       className: styles.unityModal,
      //       maskClosable: true,
      //       width: this.getWPrec(2200),
      //       style: { height: this.getHPrec(1800) },
      //       content: (
      //         <Provider store={window.g_app._store}>

      //         </Provider>
      //       ),
      //     })
      //   } else if (type === ProtocolDataType.VideoMonitor) {
      //     dispatch({
      //       type: 'unity3d/save',
      //       payload: {
      //         unityDeviceCode: id,
      //       },
      //     });
      //   }else if (type === ProtocolDataType.RiskPoint) {
      //     Modal.success({
      //       title: `${name}`,
      //       className: styles.unityModal,
      //       maskClosable: true,
      //       width: this.getWPrec(2200),
      //       centered:true,
      //       style: { height: this.getHPrec(1850) },
      //       content: (
      //         <Provider store={window.g_app._store} >

      //         </Provider>
      //       ),
      //     });
      //   } else if (type === ProtocolDataType.EnvironmentMonitor) {
      //     Modal.success({
      //       title: 'Environment Info',
      //       maskClosable: true,
      //       content: (
      //         <div>
      //           <h3>信息:{message}</h3>
      //         </div>
      //       ),
      //     });
      //   } else {
      //     return;
      //   }
      // });

      this.unityContent.on('progress', progression => {
        const { dispatch } = this.props;
        dispatch({
          type: 'unity3d/save',
          payload: {
            loadingProgress: progression,
          },
        });
        console.log('Unity progress', progression);
      });

      this.unityContent.on('loaded', () => {
        const { dispatch } = this.props;
        setTimeout(() => {
          dispatch({
            type: 'unity3d/save',
            payload: {
              isLoad: true,
            },
          });
          console.log('Unity is loaded!');
        }, 3000);
      });

      if (this.unityContent) {
        debugger;

        dispatch({
          type: 'unity3d/save',
          payload: {
            unityContent: this.unityContent,
          },
        });
      }
    }
  }

  getHPrec = height => {
    let heightPrc = ((height * 100) / process.env.DesignHeight).toFixed(2);
    return `${heightPrc}%`;
  };

  getWPrec = width => {
    let widthPrc = ((width * 100) / process.env.DesignWidth).toFixed(2);
    return `${widthPrc}%`;
  };

  render() {
    const { modalPath } = this.props;
    return this.modalPath && JSON.stringify(this.modalPath) !== '{}' ? (
      <Unity unityContent={this.unityContent} />
    ) : (
      <></>
    );
  }
}

export default connect(({ unity3d, loading }) => ({
  unity3d,
  // isModalPathLoading: loading.effects['unity3d/fetchU3dJsonAndJs']
}))(UnityLoader);
