import React, { Component } from 'react';
import styles from './CoordinateWidget.css';
import { Icon } from 'antd';

class CoordinateWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFullscreen: false,
      x: 0,
      y: 0,
      z: 0,
      cameraHeight: 0,
    };
  }

  componentDidMount() {
    const { NSCEarth } = this.props;
    this.mouseMoveHandle = NSCEarth.eventManager.MOUSE_MOVE.addEventListener(
      result => {
        const { positions } = result;
        if (positions && positions.pickPositionWGS84) {
          const { x, y, z } = positions.pickPositionWGS84;
          this.setState({ x, y, z });
        }
      },
    );
    NSCEarth.viewer.scene.camera.percentageChanged = 0.1;
    this.cameraChangedHandler = NSCEarth.viewer.scene.camera.changed.addEventListener(
      value => {
        const cameraPositionCartographic =
          NSCEarth.viewer.scene.camera.positionCartographic;
        this.setState({ cameraHeight: cameraPositionCartographic.height });
      },
    );
  }

  fullscreen() {
    const { NSCEarth } = this.props;
    if (NSCEarth.containerDiv.requestFullscreen) {
      NSCEarth.containerDiv.requestFullscreen();
      this.setState({ isFullscreen: true });
    }
  }

  exitFullscreen() {
    document.exitFullscreen();
    this.setState({ isFullscreen: false });
  }

  componentWillUnmount() {
    this.mouseMoveHandle && this.mouseMoveHandle();
    this.cameraChangedHandler && this.cameraChangedHandler();
  }

  render() {
    const { isFullscreen, x, y, z, cameraHeight } = this.state;
    return (
      <div className={styles.container}>
        {isFullscreen ? (
          <div
            onClick={this.exitFullscreen.bind(this)}
            style={{ backgroundColor: 'black', cursor: 'pointer' }}
          >
            <Icon
              type="fullscreen-exit"
              style={{ fontSize: '24px', color: '#08c' }}
            />
          </div>
        ) : (
          <div
            onClick={this.fullscreen.bind(this)}
            style={{ backgroundColor: 'black', cursor: 'pointer' }}
          >
            <Icon
              type="fullscreen"
              style={{ fontSize: '24px', color: '#08c' }}
            />
          </div>
        )}

        <div className={styles.coordinate}>
          {`  经度: ${x.toFixed(6)} ° , 纬度: ${y.toFixed(
            6,
          )} ° , 海拔: ${z.toFixed(1)} m , 相机高度: ${(
            cameraHeight / 1000
          ).toFixed(1)} km `}
        </div>
      </div>
    );
  }
}

export default CoordinateWidget;
