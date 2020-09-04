import React, { Component } from 'react';
import { Card, Button, Input } from 'antd';
const ButtonGroup = Button.Group;

class CameraInfoWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      z: 0,
      pitch: 0,
      heading: 0,
      roll: 0,
      minX: 0,
      minY: 0,
      maxX: 0,
      maxY: 0,
    };
  }

  componentDidMount() {
    const { NSCEarth } = this.props;
    const { Cesium } = NSCEarth;
    const camera = NSCEarth.viewer.camera;
    this.Camera_MoveEndHandler = NSCEarth.viewer.scene.camera.moveEnd.addEventListener(
      value => {
        const cameraPositionCartographic = camera.positionCartographic;
        const x = Cesium.Math.toDegrees(cameraPositionCartographic.longitude); //根据弧度获取到经度
        const y = Cesium.Math.toDegrees(cameraPositionCartographic.latitude); //根据弧度获取到纬度
        const z = cameraPositionCartographic.height;
        const pitch = Cesium.Math.toDegrees(camera.pitch);
        const heading = Cesium.Math.toDegrees(camera.heading);
        const roll = Cesium.Math.toDegrees(camera.roll);
        const rectangle = camera.computeViewRectangle();
        const minX = Cesium.Math.toDegrees(rectangle.west); //根据弧度获取到纬度
        const minY = Cesium.Math.toDegrees(rectangle.south); //根据弧度获取到纬度
        const maxX = Cesium.Math.toDegrees(rectangle.east); //根据弧度获取到纬度
        const maxY = Cesium.Math.toDegrees(rectangle.north); //根据弧度获取到纬度

        this.setState({
          x,
          y,
          z,
          pitch,
          heading,
          roll,
          minX,
          minY,
          maxX,
          maxY,
        });
      },
    );
  }

  cameraLocation() {
    const { NSCEarth } = this.props;
    const {
      x,
      y,
      z,
      pitch,
      heading,
      roll,
      minX,
      minY,
      maxX,
      maxY,
    } = this.state;
    const cameraView = {
      position: {
        x: x,
        y: y,
        z: z,
      },
      pitch,
      heading,
      roll,
    };
    NSCEarth.setView(cameraView);
  }

  rectangleLocation() {
    const { NSCEarth } = this.props;
    const {
      x,
      y,
      z,
      pitch,
      heading,
      roll,
      minX,
      minY,
      maxX,
      maxY,
    } = this.state;
    const cameraView = {
      rectangle: {
        minX: minX,
        minY: minY,
        maxX: maxX,
        maxY: maxY,
      },
      pitch,
      heading,
      roll,
    };
    NSCEarth.setView(cameraView);
  }
  closeWidget() {
    const { NSCEarth } = this.props;
    NSCEarth.widgetManager.removeWidget('CameraInfoWidget');
    this.Camera_MoveEndHandler && this.Camera_MoveEndHandler();
  }
  render() {
    const {
      x,
      y,
      z,
      pitch,
      heading,
      roll,
      minX,
      minY,
      maxX,
      maxY,
    } = this.state;
    return (
      <Card
        title="相机信息"
        size="small"
        extra={
          <Button
            shape="circle"
            icon="close"
            onClick={this.closeWidget.bind(this)}
          />
        }
        style={{ width: 300 }}
      >
        <div>
          <Input addonBefore="相机经度" value={x} />
          <Input addonBefore="相机纬度" value={y} />
          <Input addonBefore="相机高程" value={z} />
          <Input addonBefore="相机倾斜度" value={pitch} />
          <Input addonBefore="相机旋转角度" value={heading} />
          <Input addonBefore="相机翻转角度" value={roll} />
          <Input addonBefore="最小经度" value={minX} />
          <Input addonBefore="最小纬度" value={minY} />
          <Input addonBefore="最大经度" value={maxX} />
          <Input addonBefore="最大纬度" value={maxY} />
        </div>
        <div>
          <ButtonGroup>
            <Button type="primary" onClick={this.cameraLocation.bind(this)}>
              相机定位
            </Button>
            <Button type="primary" onClick={this.rectangleLocation.bind(this)}>
              范围定位
            </Button>
          </ButtonGroup>
        </div>
      </Card>
    );
  }
}

export default CameraInfoWidget;
