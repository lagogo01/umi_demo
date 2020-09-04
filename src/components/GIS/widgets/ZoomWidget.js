import React, { Component } from 'react';
import { PlusOutlined, HomeOutlined, MinusOutlined } from '@ant-design/icons';
import styles from './ZoomWidget.css';

class ZoomWidget extends Component {
  constructor(props) {
    super(props);
  }

  goHome() {
    const { NSCEarth } = this.props;
    NSCEarth.goHome();
  }

  zoomIn(relativeAmount) {
    const { NSCEarth } = this.props;
    zoom(NSCEarth.viewer.scene, relativeAmount);
  }

  render() {
    return (
      <div className={styles.toolBar}>
        <div
          onClick={this.zoomIn.bind(this, 0.75)}
          className={styles.toolButton}
          style={{ borderRadius: '20px 20px 0px 0px' }}
        >
          <PlusOutlined style={{ fontSize: '16px', color: '#08c' }} />
        </div>
        <div
          onClick={this.goHome.bind(this)}
          className={`${styles.toolButton}`}
          style={{ borderWidth: '0px 1px' }}
        >
          <HomeOutlined style={{ fontSize: '16px', color: '#08c' }} />
        </div>
        <div
          onClick={this.zoomIn.bind(this, 1.25)}
          className={styles.toolButton}
          style={{ borderRadius: '0px 0px 20px 20px' }}
        >
          <MinusOutlined style={{ fontSize: '16px', color: '#08c' }} />
        </div>
      </div>
    );
  }
}

export default ZoomWidget;

// #region 放缩
const getCameraFocus = (scene, inWorldCoordinates, result) => {
  const { camera } = scene;
  const unprojectedScratch = new Cesium.Cartographic();
  const rayScratch = new Cesium.Ray();

  if (scene.mode === Cesium.SceneMode.MORPHING) {
    return undefined;
  }

  if (!Cesium.defined(result)) {
    result = new Cesium.Cartesian3();
  }

  // TODO bug when tracking: if entity moves the current position should be used and not only the one when starting orbiting/rotating
  // TODO bug when tracking: reset should reset to default view of tracked entity

  rayScratch.origin = camera.positionWC;
  rayScratch.direction = camera.directionWC;
  result = scene.globe.pick(rayScratch, scene, result);

  if (!Cesium.defined(result)) {
    return undefined;
  }

  if (
    scene.mode === Cesium.SceneMode.SCENE2D ||
    scene.mode === Cesium.SceneMode.COLUMBUS_VIEW
  ) {
    result = camera.worldToCameraCoordinatesPoint(result, result);

    if (inWorldCoordinates) {
      result = scene.globe.ellipsoid.cartographicToCartesian(
        scene.mapProjection.unproject(result, unprojectedScratch),
        result,
      );
    }
  } else if (!inWorldCoordinates) {
    result = camera.worldToCameraCoordinatesPoint(result, result);
  }

  return result;
};
const zoom = (scene, relativeAmount) => {
  const cartesian3Scratch = new Cesium.Cartesian3();
  const sscc = scene.screenSpaceCameraController;
  // do not zoom if it is disabled
  if (!sscc.enableInputs || !sscc.enableZoom) {
    return;
  }

  const { camera } = scene;
  let orientation;

  const focus = getCameraFocus(scene, false);

  if (!Cesium.defined(focus)) {
    // Camera direction is not pointing at the globe, so use the ellipsoid horizon point as
    // the focal point.
    const ray = new Cesium.Ray(
      camera.worldToCameraCoordinatesPoint(
        scene.globe.ellipsoid.cartographicToCartesian(
          camera.positionCartographic,
        ),
      ),
      camera.directionWC,
    );
    focus = Cesium.IntersectionTests.grazingAltitudeLocation(
      ray,
      scene.globe.ellipsoid,
    );

    orientation = {
      heading: camera.heading,
      pitch: camera.pitch,
      roll: camera.roll,
    };
  } else {
    orientation = {
      direction: camera.direction,
      up: camera.up,
    };
  }

  const direction = Cesium.Cartesian3.subtract(
    camera.position,
    focus,
    cartesian3Scratch,
  );
  const movementVector = Cesium.Cartesian3.multiplyByScalar(
    direction,
    relativeAmount,
    direction,
  );
  const endPosition = Cesium.Cartesian3.add(focus, movementVector, focus);

  camera.flyTo({
    destination: endPosition,
    orientation,
    duration: 0.5,
    convert: false,
  });
};

// #endregion
