import React, { Component } from 'react';
import styles from './CompassWidget.css';
import { Icon } from 'antd';

class CompassWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: 0,
    };
  }

  componentDidMount() {
    const { NSCEarth } = this.props;
    const { Cesium, viewer } = NSCEarth;

    this.cameraMoveEndEndHandle = NSCEarth.viewer.scene.camera.moveEnd.addEventListener(
      result => {
        const heading = Cesium.Math.toDegrees(viewer.scene.camera.heading);
        this.setState({ heading });
      },
    );
  }

  goNorth() {
    const { NSCEarth } = this.props;
    const { viewer } = NSCEarth;
    const positionWC = viewer.scene.camera.positionWC;
    const cameraPitch = viewer.scene.camera.pitch;
    const cameraHeading = viewer.scene.camera.heading;
    const cameraRoll = viewer.scene.camera.roll;
    viewer.camera.flyTo({
      destination: positionWC,
      orientation: {
        heading: 0.0, // east, default value is 0.0 (north)
        pitch: cameraPitch, // default value (looking down)
        roll: cameraRoll, // default value
      },
    });
  }

  render() {
    const { heading } = this.state;
    const transform = 'rotate(-' + heading + 'deg)';
    return (
      <div className={styles.container}>
        <div
          onClick={this.goNorth.bind(this)}
          className={styles.compassWrapper}
          style={{
            transform: transform,
          }}
        >
          <div className={styles.northText}>N</div>
          <Icon
            type="compass"
            style={{
              fontSize: '32px',
              color: '#08c',
              transform: 'rotate(-45deg)',
            }}
          />
          <div className={styles.northText}> &nbsp; </div>
        </div>
      </div>
    );
  }
}

export default CompassWidget;
