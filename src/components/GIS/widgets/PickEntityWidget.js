import React, { Component } from 'react';
import { Card, Button, Descriptions, Collapse } from 'antd';
const { Panel } = Collapse;

class PickEntityWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entities: [],
    };
  }

  componentDidMount() {
    const { NSCEarth } = this.props;
    const { Cesium, canvas } = NSCEarth;
    if (canvas) {
      canvas.style.cursor = 'crosshair';
    }
    this.mouseHandle = NSCEarth.eventManager.LEFT_CLICK.addEventListener(
      result => {
        const hitTestResult = NSCEarth.hitTest(result.screenPosition);
        const { entities } = hitTestResult;
        this.setState({ entities });
      },
    );
  }

  getEntityInfo(entity) {
    const { name, properties } = entity;
    const { propertyNames } = properties;
    if (!propertyNames) {
      return null;
    }
    return (
      <Descriptions title={name}>
        {propertyNames.map(propertyName => (
          <Descriptions.Item key={propertyName} label={propertyName}>
            {properties[propertyName].getValue()}
          </Descriptions.Item>
        ))}
      </Descriptions>
    );
  }

  closeWidget() {
    const { NSCEarth } = this.props;
    const { canvas } = NSCEarth;
    if (canvas) {
      canvas.style.cursor = 'default';
    }
    NSCEarth.widgetManager.removeWidget('PickEntityWidget');
    this.mouseHandle && this.mouseHandle();
  }

  render() {
    const { entities } = this.state;
    return (
      <Card
        title="实体拾取"
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
        {entities.length === 1 && this.getEntityInfo(entities[0])}
        {entities.length > 1 && (
          <Collapse accordion>
            {entities.map((entity, index) => (
              <Panel header={entity.name} key={index}>
                {this.getEntityInfo(entity)}
              </Panel>
            ))}
          </Collapse>
        )}
      </Card>
    );
  }
}

export default PickEntityWidget;
