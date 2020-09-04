import { TowerLayer } from 'nsc-earth';
import image from '@/assets/images/substation.png';
import { notification, Icon, Progress } from 'antd';
import {
  getLines,
  getSubstations,
  getTowers,
  getFittings,
  getWires,
} from './services/service';

export const lineModelPath =
  'https://eic-oss-pro.oss-cn-shenzhen.aliyuncs.com/eic-digital-photo-service/technology-department-3d/qinghai_web_smartsite/gim-model/line';
export const substationModelPath =
  'https://eic-oss-pro.oss-cn-shenzhen.aliyuncs.com/eic-digital-photo-service/technology-department-3d/qinghai_web_smartsite/gim-model/substation';

const addAllLineEntities = lineList => {
  const { NSCEarth } = window;
  const { viewer } = NSCEarth;
  const dataSource = new Cesium.CustomDataSource('所有线路');
  viewer.dataSources.add(dataSource).then(dataSource => {
    const lines = lineList;
    lines.forEach((line, index) => {
      const linecode = line.linecode.trim();
      const linename = line.linename.trim();
      getTowers(linecode).then(response => {
        if (response && response.data && Array.isArray(response.data)) {
          const towers = response.data;
          const bidTowerPositionMap = new Map();
          towers.forEach(towerObj => {
            const {
              towerguid,
              towername,
              modelname,
              towerorder,
              bid,
              lon,
              lat,
              rotx,
              roty,
              rotz,
              height,
              type,
            } = towerObj;
            const towerWorldPosition = Cesium.Cartesian3.fromDegrees(
              parseFloat(lon),
              parseFloat(lat),
              parseFloat(height),
            );
            if (!bidTowerPositionMap.has(bid)) {
              bidTowerPositionMap.set(bid, []);
            }
            bidTowerPositionMap.get(bid).push(towerWorldPosition);

            const towerEntity = dataSource.entities.add({
              id: towerguid,
              name: towername,
              position: towerWorldPosition,
              properties: {
                id: towerguid,
                type: 'tower',
                name: towername,
              },
              label: {
                text: towername,
                font: '20px Helvetica',
                fillColor: Cesium.Color.AQUAMARINE,
                // outlineColor: Cesium.Color.WHITE,
                // outlineWidth: 1,
                // showBackground: true,
                show: true,
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                verticalOrigin: Cesium.VerticalOrigin.TOP,
                // pixelOffset: new Cesium.Cartesian2(0, -32),
                scaleByDistance: new Cesium.NearFarScalar(3000, 1, 10000, 0.5),
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                  0,
                  10000,
                ),
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
              },
            });
          });
          bidTowerPositionMap.forEach((towerPositions, bid) => {
            const bidName =
              bidTowerPositionMap.size == 1 ? linename : `${linename}-${bid}`;
            const bidEntity = dataSource.entities.add({
              id: `${linecode}-${bid}`,
              name: bidName,
              position: towerPositions[Math.floor(towerPositions.length / 2)],
              properties: {
                id: linecode,
                type: 'line',
                name: linename,
              },
              polyline: {
                positions: towerPositions,
                width: 3,
                material: Cesium.Color.RED,
                clampToGround: true,
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                  0,
                  10000000,
                ),
              },
              label: {
                text: bidName,
                font: '28px Helvetica',
                fillColor: Cesium.Color.RED,
                outlineColor: Cesium.Color.WHITE,
                outlineWidth: 2,
                show: true,
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                verticalOrigin: Cesium.VerticalOrigin.TOP,
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                  0,
                  1000000,
                ),
                scaleByDistance: new Cesium.NearFarScalar(
                  50000,
                  1,
                  1000000,
                  0.5,
                ),
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
              },
            });
          });
        }
      });
    });
  });
};

const addAllSubstationEntities = substationList => {
  const { NSCEarth } = window;
  const { viewer, substationPrimitiveCol } = NSCEarth;
  const dataSource = new Cesium.CustomDataSource('所有变电站');
  viewer.dataSources.add(dataSource).then(dataSource => {
    const substations = substationList;
    substations.forEach((substationObj, index) => {
      const {
        substationcode,
        name,
        lon,
        lat,
        z,
        rotz,
        path,
        offsetx,
        offsety,
      } = substationObj;
      const substationTileSet = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
          url: `${substationModelPath}/${path}/tileset.json`,
        }),
      );
      substationTileSet.readyPromise
        .then(tileset => {
          console.log(tileset.boundingSphere.center);

          const cartographic = Cesium.Cartographic.fromCartesian(
            tileset.boundingSphere.center,
          );
          const surface = Cesium.Cartesian3.fromRadians(
            cartographic.longitude,
            cartographic.latitude,
            0.0,
          );
          const offset = Cesium.Cartesian3.fromRadians(
            cartographic.longitude + (Math.PI * offsetx) / 180,
            cartographic.latitude + (Math.PI * offsety) / 180,
            z,
          );
          const translation = Cesium.Cartesian3.subtract(
            offset,
            surface,
            new Cesium.Cartesian3(),
          );
          const modelMatrix = Cesium.Matrix4.fromTranslation(translation);
          // 模型旋转
          const axis = Cesium.Cartesian3.fromDegrees(lon, lat, 1.0); // 旋转轴，这里设置的是湘潭西数据库中的经纬度，1.0默认不变
          const quat = Cesium.Quaternion.fromAxisAngle(
            axis,
            Cesium.Math.toRadians(rotz),
          ); // 旋转的角度值，单位为度
          const mat3 = Cesium.Matrix3.fromQuaternion(quat);
          const m2 = Cesium.Matrix4.multiplyByMatrix3(
            modelMatrix,
            mat3,
            new Cesium.Matrix4(),
          );

          tileset.modelMatrix = m2;
          substationTileSet.name = name;

          console.log(tileset.boundingSphere.center);

          const subEntity = dataSource.entities.add({
            id: substationcode,
            name,
            position: Cesium.Cartesian3.fromDegrees(lon, lat, z),
            properties: {
              id: substationcode.trim(),
              type: 'substation',
              name: name.trim(),
            },
            label: {
              text: name,
              font: '28px Helvetica',
              fillColor: Cesium.Color.RED,
              outlineColor: Cesium.Color.WHITE,
              outlineWidth: 2,
              show: true,
              style: Cesium.LabelStyle.FILL_AND_OUTLINE,
              pixelOffset: new Cesium.Cartesian2(0, -32),
              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
              verticalOrigin: Cesium.VerticalOrigin.TOP,
              distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                0,
                1000000,
              ),
              scaleByDistance: new Cesium.NearFarScalar(50000, 1, 1000000, 0.5),
              disableDepthTestDistance: Number.POSITIVE_INFINITY,
            },
            billboard: {
              image,
              width: 32,
              height: 32,
              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
              scaleByDistance: new Cesium.NearFarScalar(3000, 1.5, 10000, 0.5),
              // disableDepthTestDistance: Number.POSITIVE_INFINITY,
            },
          });
        })
        .otherwise(error => {
          console.log(error);
        });
      substationPrimitiveCol.add(substationTileSet);
    });
  });
};

const changeCurrentProject = (projectId, gimLines, substations) => {
  const { NSCEarth } = window;
  if (NSCEarth.projectId !== projectId) {
    destroyProject();
    gimLines.length > 0 && addGimLineCodes(gimLines);
    // substations.length > 0 && addSubstationTilesets(substations);
    NSCEarth.projectId = projectId;
  }
};

// 销毁当前工程
const destroyProject = () => {
  const { NSCEarth } = window;

  const { towerLayerManager, substationPrimitiveCol } = NSCEarth;
  towerLayerManager.removeAll();
  // substationPrimitiveCol.removeAll();
};

const addGimLineCodes = gimLines => {
  const { NSCEarth } = window;
  const { viewer, towerLayerManager } = NSCEarth;

  const dsArray = viewer.dataSources.getByName('所有线路');
  const lineDataSource = dsArray.length > 0 ? dsArray[0] : null;
  if (lineDataSource) {
    lineDataSource.show = false;
  }

  const key = 'loading-tower';
  const loadedLines = new Set();

  const linsNames = gimLines.map(line => line.linename.trim());
  const { length } = gimLines;
  notification.open({
    key,
    icon: <Progress type="circle" percent={10} width={40} />,
    message: (
      <span style={{ fontWeight: '800', color: '#08c' }}>
        加载工程相关三维线路-10%
      </span>
    ),
    description: (
      <div>
        <div>{`共${length}条线路:`}</div>
        {linsNames.map((lineNameItem, index) => (
          <div key={lineNameItem + index}>
            {lineNameItem} <Icon type="loading" style={{ color: '#08c' }} />
          </div>
        ))}
      </div>
    ),
    duration: 0,
  });
  let i = 0;
  gimLines.forEach((line, index) => {
    const linecode = line.linecode.trim();
    const linename = line.linename.trim();
    const towerlistPromise = getTowers(linecode);
    const fittingsPromise = getFittings(linecode);
    const wirelistPromise = getWires(linecode);

    Promise.all([towerlistPromise, fittingsPromise, wirelistPromise])
      .then(([towerlistResult, fittingsResult, wirelistResult]) => {
        if (
          towerlistResult &&
          fittingsResult &&
          wirelistResult &&
          towerlistResult.data &&
          fittingsResult.data &&
          wirelistResult.data &&
          Array.isArray(towerlistResult.data) &&
          Array.isArray(fittingsResult.data) &&
          Array.isArray(wirelistResult.data)
        ) {
          loadedLines.add(linename);

          const towerLayer = TowerLayer.Load(
            viewer,
            linecode,
            linename,
            towerlistResult.data,
            fittingsResult.data,
            wirelistResult.data,
            `${lineModelPath}/${linecode}`,
          );
          towerLayer.zoomTo();
          towerLayerManager.add(towerLayer);

          i++;
          notification.open({
            key,
            icon: (
              <Progress type="circle" percent={(i / length) * 100} width={40} />
            ),
            message: (
              <span
                style={{ fontWeight: '800', color: '#08c' }}
              >{`加载工程相关三维线路-${(i / length) * 100}%`}</span>
            ),
            description: (
              <div>
                <div>{`共${length}条线路:`}</div>
                {linsNames.map((lineNameItem, index) => (
                  <div key={lineNameItem + index}>
                    {lineNameItem}{' '}
                    <Icon
                      type={
                        loadedLines.has(lineNameItem)
                          ? 'check-circle'
                          : 'loading'
                      }
                      style={{ color: '#08c' }}
                    />
                  </div>
                ))}
              </div>
            ),
            duration: 0,
          });

          if (i === length) {
            setTimeout(() => {
              notification.close(key);
            }, 1000);
          }
        }
      })
      .catch(error => console.log(error));
  });
};

const addSubstationTilesets = substations => {
  const { NSCEarth } = window;
  const { viewer, substationPrimitiveCol } = NSCEarth;

  substations.forEach(substationObj => {
    const {
      substationcode,
      name,
      lon,
      lat,
      z,
      rotz,
      path,
      offsetx,
      offsety,
    } = substationObj;
    const substationTileSet = viewer.scene.primitives.add(
      new Cesium.Cesium3DTileset({
        url: `${substationModelPath}/${path}/tileset.json`,
      }),
    );
    substationTileSet.readyPromise
      .then(tileset => {
        const cartographic = Cesium.Cartographic.fromCartesian(
          tileset.boundingSphere.center,
        );
        const surface = Cesium.Cartesian3.fromRadians(
          cartographic.longitude,
          cartographic.latitude,
          0.0,
        );
        const offset = Cesium.Cartesian3.fromRadians(
          cartographic.longitude + offsetx,
          cartographic.latitude + offsety,
          z,
        );
        const translation = Cesium.Cartesian3.subtract(
          offset,
          surface,
          new Cesium.Cartesian3(),
        );
        tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
        substationTileSet.name = name;
        viewer.zoomTo(substationTileSet);
      })
      .otherwise(error => {
        console.log(error);
      });
    substationPrimitiveCol.add(substationTileSet);
  });
};

const EarthProjectManager = {
  addAllLineEntities,
  addAllSubstationEntities,
  changeCurrentProject,
};

export default EarthProjectManager;

// const addProjectTowerLayers = projectId => {
//   const NSCEarth = window.NSCEarth;

//   const dsArray = NSCEarth.viewer.dataSources.getByName('所有线路');
//   const lineDataSource = dsArray.length > 0 ? dsArray[0] : null;
//   if (lineDataSource) {
//     lineDataSource.show = false;
//   }

//   const { viewer, towerLayerManager } = NSCEarth;
//   towerLayerManager.removeAll();
//   const key = 'loading-tower';
//   const loadedLines = new Set();
//   notification.open({
//     key,
//     icon: <Progress type="circle" percent={0} width={40} />,
//     message: <span style={{ fontWeight: '800', color: '#08c' }}>0%</span>,
//     description: `根据工程id[${projectId}]获取所有三维线路···`,
//     duration: 0,
//   });
//   getLines(projectId).then(response => {
//     if (response && response.data && Array.isArray(response.data)) {
//       const lines = response.data;
//       const linsNames = lines.map(line => line.linename.trim());
//       const length = lines.length;
//       notification.open({
//         key,
//         icon: <Progress type="circle" percent={10} width={40} />,
//         message: <span style={{ fontWeight: '800', color: '#08c' }}>10%</span>,
//         description: (
//           <div>
//             <div>{`共${length}条线路:`}</div>
//             {linsNames.map((lineNameItem, index) => (
//               <div key={lineNameItem + index}>
//                 {lineNameItem} <Icon type="loading" style={{ color: '#08c' }} />
//               </div>
//             ))}
//           </div>
//         ),
//         duration: 0,
//       });
//       let i = 0;
//       lines.forEach((line, index) => {
//         const linecode = line.linecode.trim();
//         const linename = line.linename.trim();
//         const towerlistPromise = getTowers(linecode);
//         const fittingsPromise = getFittings(linecode);
//         const wirelistPromise = getWires(linecode);

//         Promise.all([towerlistPromise, fittingsPromise, wirelistPromise])
//           .then(([towerlistResult, fittingsResult, wirelistResult]) => {
//             if (
//               towerlistResult &&
//               fittingsResult &&
//               wirelistResult &&
//               towerlistResult.data &&
//               fittingsResult.data &&
//               wirelistResult.data &&
//               Array.isArray(towerlistResult.data) &&
//               Array.isArray(fittingsResult.data) &&
//               Array.isArray(wirelistResult.data)
//             ) {
//               loadedLines.add(linename);
//               i++;
//               notification.open({
//                 key,
//                 icon: <Progress type="circle" percent={(i / length) * 100} width={40} />,
//                 message: (
//                   <span style={{ fontWeight: '800', color: '#08c' }}>{`${(i / length) *
//                     100}%`}</span>
//                 ),
//                 description: (
//                   <div>
//                     <div>{`共${length}条线路:`}</div>
//                     {linsNames.map((lineNameItem, index) => (
//                       <div key={lineNameItem + index}>
//                         {lineNameItem}{' '}
//                         <Icon
//                           type={loadedLines.has(lineNameItem) ? 'check-circle' : 'loading'}
//                           style={{ color: '#08c' }}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 ),
//                 duration: 0,
//               });
//               const towerLayer = TowerLayer.Load(
//                 viewer,
//                 linecode,
//                 linename,
//                 towerlistResult.data,
//                 fittingsResult.data,
//                 wirelistResult.data,
//                 `/data/line/${linecode}`,
//               );
//               towerLayer.zoomTo();
//               towerLayerManager.add(towerLayer);

//               if (i === length) {
//                 setTimeout(() => {
//                   notification.close(key);
//                 }, 1000);
//               }
//             }
//           })
//           .catch(error => console.log(error));
//       });
//     }
//   });
// };

// const addProjectCrossData = projectId => {
//   const NSCEarth = window.NSCEarth;
//   const { viewer } = NSCEarth;
//   const layerUtils = new LayerUtils(viewer);
//   fetch('./data/cross/crosslist.json')
//     .then(response => response.json())
//     .then(result => {
//       const { RECORDS } = result;
//       const dataSource = CrossUtils.generateCrossPowerLineDataSource(
//         RECORDS,
//         'JA30',
//         Cesium.Color.AQUA,
//       );
//       dataSource.name = 'GIM交叉跨越';
//       viewer.dataSources.add(dataSource);
//     });
//   const geojsonOptions = {
//     clampToGround: true,
//   };
//   const geoJsonDataSourcePromise1 = Cesium.GeoJsonDataSource.load(
//     './data/cross/青海院_Project_FeaturesToJSON.json',
//     geojsonOptions,
//   );
//   geoJsonDataSourcePromise1.then(dataSource => {
//     viewer.dataSources.add(dataSource);
//     dataSource.name = '青海院-交跨';
//     layerUtils.label(dataSource, '名称');
//     LayerRenderUtils.simpleRenderPolyline(dataSource, Cesium.Color.AQUA, 4);
//   });
//   const geoJsonDataSourcePromise2 = Cesium.GeoJsonDataSource.load(
//     './data/cross/三跨_99_FeaturesToJSON.json',
//     geojsonOptions,
//   );
//   geoJsonDataSourcePromise2.then(dataSource => {
//     viewer.dataSources.add(dataSource);
//     dataSource.name = '三跨_99';
//     layerUtils.label(dataSource, '跨越名称');
//     LayerRenderUtils.simpleRenderPolygon(dataSource, Cesium.Color.AQUA, 1);
//   });
//   const geoJsonDataSourcePromise3 = Cesium.GeoJsonDataSource.load(
//     './data/cross/三跨96_Merge_FeaturesToJSON.json',
//     geojsonOptions,
//   );
//   geoJsonDataSourcePromise3.then(dataSource => {
//     viewer.dataSources.add(dataSource);
//     dataSource.name = '三跨_96';
//     layerUtils.label(dataSource, '跨越名称');
//     LayerRenderUtils.simpleRenderPolygon(dataSource, Cesium.Color.AQUA, 1);
//   });
//   const geoJsonDataSourcePromise4 = Cesium.GeoJsonDataSource.load(
//     './data/cross/陕西院LINE_Project_FeaturesToJS.json',
//     geojsonOptions,
//   );
//   geoJsonDataSourcePromise4.then(dataSource => {
//     viewer.dataSources.add(dataSource);
//     dataSource.name = '陕西院-交跨';
//     layerUtils.label(dataSource, '名称');
//     LayerRenderUtils.simpleRenderPolyline(dataSource, Cesium.Color.AQUA, 4);
//   });
// };

// const addChannelCleaning = projectId => {
//   if (!projectId) {
//     projectId = '4b06f280-192d-11e9-ba40-7713b97788f7';
//   }
//   const NSCEarth = window.NSCEarth;
//   const { viewer } = NSCEarth;
//   const dataSource = new Cesium.CustomDataSource('通道清理');
//   viewer.dataSources.add(dataSource).then(dataSource => {
//     const params = {
//       projectId: projectId,
//       gobjType: 'HOUSE',
//       page: 1,
//       pageSize: 10,
//     };
//     getGroundObjects(params).then(response => {
//       if (response && response.data && response.data.list && Array.isArray(response.data.list)) {
//         const groundObjLst = response.data.list;
//         groundObjLst.forEach(groundObj => {
//           const { id, entityTypeKey, name } = groundObj;
//           getGOGeometry(id).then(response => {
//             if (response && response.data) {
//               const geoObj = response.data;
//               const { id, geometryJson } = geoObj;
//               const geometryObj = JSON.parse(geometryJson);
//               console.log(geometryObj);

//               const { attributes, geometry, symbol } = geometryObj;
//               const { name, type } = attributes;
//               if (type === 'polygon') {
//                 if (geometry.rings && Array.isArray(geometry.rings) && geometry.rings.length > 0) {
//                   const coordinates = geometry.rings[0];
//                   const positions = coordinates.map(coordinate => {
//                     const pt = turf.point(coordinate);
//                     const converted = turf.toWgs84(pt);
//                     if (
//                       converted &&
//                       converted.geometry &&
//                       converted.geometry.coordinates &&
//                       Array.isArray(converted.geometry.coordinates)
//                     ) {
//                       const wgs84Position = converted.geometry.coordinates;
//                       const position = Cesium.Cartesian3.fromDegrees(
//                         wgs84Position[0],
//                         wgs84Position[1],
//                       );
//                       return position;
//                     }
//                   });
//                   const centerPosition = Cesium.BoundingSphere.fromPoints(positions).center;
//                   const entity = dataSource.entities.add({
//                     id: id,
//                     name: name,
//                     position: centerPosition,
//                     polygon: {
//                       hierarchy: positions,
//                       material: Cesium.Color.RED.withAlpha(0.4),
//                     },
//                     label: {
//                       text: name,
//                       font: '20px Helvetica',
//                       fillColor: Cesium.Color.RED,
//                       outlineColor: Cesium.Color.WHITE,
//                       outlineWidth: 2,
//                       show: true,
//                       style: Cesium.LabelStyle.FILL_AND_OUTLINE,
//                       heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
//                       // pixelOffset: new Cesium.Cartesian2(0, -32),
//                       // verticalOrigin: Cesium.VerticalOrigin.TOP,
//                       distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 5000),
//                       scaleByDistance: new Cesium.NearFarScalar(1000, 1, 3000, 0.5),
//                       // disableDepthTestDistance: Number.POSITIVE_INFINITY,
//                     },
//                   });
//                 }
//               }
//             }
//           });
//         });
//       }
//     });
//   });
// };
