/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect, getDvaApp } from 'umi';
import { Provider } from 'react-redux';
import NSCEarth, { NSCEarthUI, LayerRenderUtils } from 'nsc-earth';
import PropTypes from 'prop-types';
import EarthToolbar from './EarthToolbar';
import CoordinateWidget from './widgets/CoordinateWidget';
import Logo from './widgets/PngLogo';
import CompassWidget from './widgets/CompassWidget';
import ZoomWidget from './widgets/ZoomWidget';
import BaseMapWidget from './widgets/BaseMapWidget';
import EarthProjectManager from './EarthProjectManager';

@connect()
class Earth extends Component {
  constructor(props) {
    super(props);
    // NSCEarth = undefined;
    this.state = {
      NSCEarth: undefined,
    };
  }

  componentDidMount() {
    const interval = setInterval(() => {
      if (window.Cesium) {
        const _NSCEarth = new NSCEarth(window.Cesium);
        this.setState({
          NSCEarth: _NSCEarth,
        });
        clearInterval(interval);
      }
    }, 200);
  }

  handleNSCEarthUILoad() {
    console.log('NSCEarth is loaded.', NSCEarth);

    const { dispatch } = this.props;
    dispatch({
      type: 'earth/save',
      payload: {
        NSCEarth,
        Cesium: NSCEarth.Cesium,
        viewer: NSCEarth.viewer,
      },
    });

    // NSCEarth.viewer.scene.debugShowFramesPerSecond = true;//debug显示帧率
    // 接入青海DEM
    // NSCEarth.terrainProvider = new Cesium.CesiumTerrainProvider({
    //   url: '/qhqsdem',
    // });

    if (window.Cesium != null) {
      console.log('nscEarth', NSCEarth);
      this.initEvents();
      this.initWidgets();
      // this.addGeoJsonLayer();
      this.initProject();
      this.addThematicLayer();
    }
  }

  initEvents() {
    const { NSCEarth } = this.state;
    NSCEarth.eventManager.LEFT_CLICK.addEventListener(result => {
      const selected = [];
      if (result && result.tilesets && result.tilesets.length > 0) {
        selected.push(result.tilesets[0]);
      }
      if (result && result.primitives && result.primitives.length > 0) {
        selected.push(result.primitives[0]);
      }
      NSCEarth.clickStage.selected = selected;
    });

    NSCEarth.eventManager.LEFT_DOWN.addEventListener(result => {
      // 清除tooltip
      NSCEarth.hideToolTip();
      NSCEarth.widgetManager.removeWidget('LayerManagerWidget');
    });
  }

  closeModal() {
    const { NSCEarth } = this.state;
    NSCEarth.hideToolTip();
  }

  initWidgets() {
    const { NSCEarth } = this.state;
    NSCEarth.widgetManager
      .addWidget(
        'EarthToolbar',
        <Provider store={getDvaApp()._store}>
          <EarthToolbar NSCEarth={NSCEarth} />
        </Provider>,
        'top-left',
      )
      .then(widget => {
        console.log('EarthToolbar is loaded.');
      })
      .catch(error => {
        console.log(error);
      });

    NSCEarth.widgetManager
      .addWidget(
        'CoordinateWidget',
        <CoordinateWidget NSCEarth={NSCEarth} />,
        'bottom-right',
      )
      .then(widget => {
        console.log('CoordinateWidget is loaded.');
      })
      .catch(error => {
        console.log(error);
      });

    NSCEarth.widgetManager
      .addWidget('Logo', <Logo />, 'bottom-left')
      .then(widget => {
        console.log('Logo is loaded.');
      })
      .catch(error => {
        console.log(error);
      });
    NSCEarth.widgetManager
      .addWidget(
        'BaseMapWidget',
        <BaseMapWidget NSCEarth={NSCEarth} />,
        'top-right',
      )
      .then(widget => {
        console.log('BaseMapWidget is loaded.');
      })
      .catch(error => {
        console.log(error);
      });
    NSCEarth.widgetManager
      .addWidget(
        'CompassWidget',
        <CompassWidget NSCEarth={NSCEarth} />,
        'top-right',
      )
      .then(widget => {
        console.log('CompassWidget is loaded.');
      })
      .catch(error => {
        console.log(error);
      });
    NSCEarth.widgetManager
      .addWidget('ZoomWidget', <ZoomWidget NSCEarth={NSCEarth} />, 'top-right')
      .then(widget => {
        console.log('ZoomWidget is loaded.');
      })
      .catch(error => {
        console.log(error);
      });
  }

  initProject() {
    const { lineList, substationList } = this.props;
    EarthProjectManager.addAllLineEntities(lineList);
    EarthProjectManager.addAllSubstationEntities(substationList);
  }

  addGeoJsonLayer() {
    const { viewer } = NSCEarth;
    const geojsonOptions = {
      clampToGround: true,
    };
    const geoJsonDataSourcePromise = Cesium.GeoJsonDataSource.load(
      './data/geojson/省界.geojson',
      geojsonOptions,
    );
    geoJsonDataSourcePromise.then(dataSource => {
      dataSource.name = '全国省界';
      dataSource.show = false;
      viewer.dataSources.add(dataSource);
      LayerRenderUtils.simpleRenderPolyline(dataSource, Cesium.Color.YELLOW, 1);

      const geoJsonDataSourcePromise2 = Cesium.GeoJsonDataSource.load(
        './data/geojson/青海市界.geojson',
        geojsonOptions,
      );
      geoJsonDataSourcePromise2.then(dataSource => {
        dataSource.name = '青海市界';
        viewer.dataSources.add(dataSource);
        LayerRenderUtils.simpleRenderPolyline(
          dataSource,
          Cesium.Color.YELLOW,
          2,
        );

        const geoJsonDataSourcePromise3 = Cesium.GeoJsonDataSource.load(
          './data/geojson/青海省界.geojson',
          geojsonOptions,
        );
        geoJsonDataSourcePromise3.then(dataSource => {
          dataSource.name = '青海省界';
          viewer.dataSources.add(dataSource);
          LayerRenderUtils.simpleRenderPolyline(
            dataSource,
            Cesium.Color.YELLOW,
            4,
          );
        });
      });
    });
  }

  addThematicLayer() {
    const { viewer } = this.state.NSCEarth;
    const { thematicList: layers } = this.props;
    // eslint-disable-next-line no-unused-expressions
    layers &&
      layers.forEach(layer => {
        const { name, url, isShow } = layer;

        const thematicProvider = new Cesium.ArcGisMapServerImageryProvider({
          url,
        });
        const thematic = viewer.imageryLayers.addImageryProvider(
          thematicProvider,
        );
        thematic.show = isShow;
        thematic.name = name;
      });
    // const qhhnImage = new Cesium.ImageryLayer(
    //   new Cesium.UrlTemplateImageryProvider({
    //     url: '/qhGeoServer/qh-hnImage/{z}/{x}/{y}.png',
    //     tilingScheme: new Cesium.WebMercatorTilingScheme(),
    //     fileExtension: 'png',
    //     minimumLevel: 0,
    //     maximumLevel: 19,
    //   }),
    // );
    // qhhnImage.name = '青海河南工程影像';
    // _viewer.imageryLayers.add(qhhnImage);

    // const qhdlhImage = new Cesium.ImageryLayer(
    //   new Cesium.UrlTemplateImageryProvider({
    //     url: '/qhGeoServer/qhdlhImage/{z}/{x}/{y}.png',
    //     tilingScheme: new Cesium.WebMercatorTilingScheme(),
    //     fileExtension: 'png',
    //     minimumLevel: 0,
    //     maximumLevel: 19,
    //   }),
    // );
    // qhdlhImage.name = '德令哈工程影像';
    // viewer.imageryLayers.add(qhdlhImage);

    // const qhlhImage = new Cesium.ImageryLayer(
    //   new Cesium.UrlTemplateImageryProvider({
    //     url: '/qhGeoServer/qhlhImage/{z}/{x}/{y}.png',
    //     tilingScheme: new Cesium.WebMercatorTilingScheme(),
    //     fileExtension: 'png',
    //     minimumLevel: 0,
    //     maximumLevel: 19,
    //   }),
    // );
    // qhlhImage.name = '冷湖工程影像';
    // viewer.imageryLayers.add(qhlhImage);
  }

  render() {
    const { NSCEarth } = this.state;
    // console.log("thisRender", this);
    // console.log("ssss", window.Cesium);
    return (
      <div style={{ width: '100%', height: '100%' }}>
        {NSCEarth ? (
          <NSCEarthUI
            NSCEarth={NSCEarth}
            onLoad={this.handleNSCEarthUILoad.bind(this)}
          />
        ) : (
          <></>
        )}
      </div>
    );
  }
}

Earth.propTypes = {
  thematicList: PropTypes.array.isRequired,
  lineList: PropTypes.array.isRequired,
  substationList: PropTypes.array.isRequired,
};

export default Earth;
