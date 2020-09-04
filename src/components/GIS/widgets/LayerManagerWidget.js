import React, { Component } from 'react';
import {
  Card,
  Button,
  List,
  Divider,
  Icon,
  Checkbox,
  Radio,
  Switch,
} from 'antd';
import styles from './LayerManagerWidget.css';

class LayerManagerWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      towerLayers: [],
      projectLayers: [],
      imageryLayers: [],
      substations: [],
    };
  }

  componentDidMount() {
    const { NSCEarth } = this.props;
    const { viewer } = NSCEarth;
    const towerLayers = NSCEarth.towerLayerManager.towerLayers;
    const imageryLayerCol = viewer.imageryLayers;
    const substationsCol = NSCEarth.substationPrimitiveCol;
    const substations = [];
    for (let i = 0; i < substationsCol.length; i++) {
      const substation = substationsCol.get(i);
      if (substation && substation.name) {
        substations.push(substation);
      }
    }
    const imageryLayers = [];
    for (let i = 0; i < imageryLayerCol.length; i++) {
      const imageryLayer = imageryLayerCol.get(i);
      if (imageryLayer && imageryLayer.name) {
        imageryLayers.push(imageryLayer);
      }
    }
    const dataSourcesCol = viewer.dataSources;
    const projectLayers = [];
    for (let i = 0; i < dataSourcesCol.length; i++) {
      projectLayers.push(dataSourcesCol.get(i));
    }
    this.setState({ towerLayers, substations, projectLayers, imageryLayers });
  }

  locate(layer) {
    const { NSCEarth } = this.props;
    NSCEarth.viewer.flyTo(layer).then(result => {
      console.log(result);
    });
  }

  locateTowerLayer(layer) {
    layer.zoomTo();
  }

  locateSubstation(substation) {
    const { NSCEarth } = this.props;
    NSCEarth.viewer.zoomTo(substation);
  }

  locateImageLayer(layer) {
    const { NSCEarth } = this.props;
    NSCEarth.viewer.zoomTo(layer);
  }

  show(layer, checked) {
    layer.show = checked;
  }

  closeWidget() {
    const { NSCEarth } = this.props;
    NSCEarth.widgetManager.removeWidget('LayerManagerWidget');
  }
  render() {
    const { NSCEarth } = this.props;
    const {
      towerLayers,
      substations,
      projectLayers,
      imageryLayers,
    } = this.state;
    return (
      <Card
        title="图层管理"
        size="small"
        extra={
          <Icon
            type="close-circle"
            style={{ fontSize: '20px', color: '#08c' }}
            onClick={this.closeWidget.bind(this)}
          />
        }
        style={{ width: 320 }}
      >
        <div className={styles.content}>
          {towerLayers.length != 0 && (
            <div>
              <Divider orientation="left">
                <Icon
                  type="star"
                  style={{ marginRight: '5px', color: '#08c' }}
                />
                三维线路
              </Divider>
              <List
                size="small"
                bordered
                dataSource={towerLayers}
                renderItem={layer => (
                  <List.Item
                    actions={[
                      <Icon
                        type="environment"
                        key="locate"
                        style={{ color: '#08c' }}
                        onClick={this.locateTowerLayer.bind(this, layer)}
                      />,
                    ]}
                  >
                    {layer.lineName}
                  </List.Item>
                )}
              />
            </div>
          )}

          {substations.length != 0 && (
            <div>
              <Divider orientation="left">
                <Icon
                  type="thunderbolt"
                  style={{ marginRight: '5px', color: '#08c' }}
                />
                变电站
              </Divider>
              <List
                size="small"
                bordered
                dataSource={substations}
                renderItem={substation => (
                  <List.Item
                    actions={[
                      <Icon
                        type="environment"
                        key="locate"
                        style={{ color: '#08c' }}
                        onClick={this.locateSubstation.bind(this, substation)}
                      />,
                    ]}
                  >
                    {substation.name}
                  </List.Item>
                )}
              />
            </div>
          )}

          {imageryLayers.length != 0 && (
            <div>
              <Divider orientation="left">
                <Icon
                  type="appstore"
                  style={{ marginRight: '5px', color: '#08c' }}
                />
                专题地图
              </Divider>
              <List
                size="small"
                bordered
                dataSource={imageryLayers}
                renderItem={layer => (
                  <List.Item
                    actions={[
                      <Switch
                        size="small"
                        defaultChecked={layer.show}
                        onChange={this.show.bind(this, layer)}
                      />,
                      <Icon
                        type="environment"
                        key="locate"
                        style={{ color: '#08c' }}
                        onClick={this.locateImageLayer.bind(this, layer)}
                      />,
                    ]}
                  >
                    {layer.name}
                  </List.Item>
                )}
              />
            </div>
          )}

          {projectLayers.length != 0 && (
            <div>
              <Divider orientation="left">
                <Icon
                  type="bars"
                  style={{ marginRight: '5px', color: '#08c' }}
                />
                工程图层
              </Divider>
              <List
                size="small"
                bordered
                dataSource={projectLayers}
                renderItem={layer => (
                  <List.Item
                    actions={[
                      <Switch
                        size="small"
                        defaultChecked={layer.show}
                        onChange={this.show.bind(this, layer)}
                      />,
                      <Icon
                        type="environment"
                        key="locate"
                        style={{ color: '#08c' }}
                        onClick={this.locate.bind(this, layer)}
                      />,
                    ]}
                  >
                    {layer.name}
                  </List.Item>
                )}
              />
            </div>
          )}
        </div>
      </Card>
    );
  }
}

export default LayerManagerWidget;
