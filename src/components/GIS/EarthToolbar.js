/*
 * @Description: 请输入....
 * @Author: ensucao
 * @Date: 2020-06-16 20:59:38
 * @LastEditTime: 2020-06-26 12:01:44
 * @LastEditors: ensucao
 */

import React, { Component } from 'react';
import { Icon, Tooltip } from 'antd';
import { connect } from 'umi';
import { UnorderedListOutlined } from '@ant-design/icons';
import LayerManagerWidget from './widgets/LayerManagerWidget';
import styles from './EarthToolbar.css';

@connect()
class EarthToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { NSCEarth } = this.props;
    NSCEarth.homeRectangle = Cesium.Rectangle.fromDegrees(
      53.0649,
      18.5402,
      157.9805,
      52.7267,
    );
    NSCEarth.goHome();
  }

  addLayerManagerWidget() {
    const { NSCEarth } = this.props;
    NSCEarth.widgetManager
      .addWidget(
        'LayerManagerWidget',
        <LayerManagerWidget NSCEarth={NSCEarth} />,
        'top-left',
      )
      .then(widget => {
        console.log('LayerManagerWidget is loaded.');
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className={styles.toolBar}>
        <Tooltip title="图层管理">
          <div className={styles.earthToolButton}>
            <UnorderedListOutlined
              style={{ fontSize: '16px', color: '#08c' }}
              onClick={this.addLayerManagerWidget.bind(this)}
            />
          </div>
        </Tooltip>
        {/* <div className={styles.divider}>|</div>
        <Tooltip title="截图">
          <div className={styles.earthToolButton}>
            <Icon type="file-image" style={{ fontSize: '16px', color: '#08c' }} />
          </div>
        </Tooltip> */}
      </div>
    );
  }
}

export default EarthToolbar;
