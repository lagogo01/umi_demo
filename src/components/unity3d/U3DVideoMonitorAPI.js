/*
 * @Description:
 * @Author: xfGuo
 * @Date: 2020-07-14 10:50:25
 * @LastEditors: lsun
 * @LastEditTime: 2020-08-10 14:53:03
 */

import ProtocalDataMethod from './ProtocolData/ProtocalDataMethod';
import ProtocolDataType from './ProtocolData/ProtocolDataType';
const addVideoMonitor = dataArray => {
  handleVideoIcon(ProtocalDataMethod.Add, dataArray);
};

const updateVideoMonitor = dataArray => {
  handleVideoIcon(ProtocalDataMethod.Update, dataArray);
};

const deleteVideoMonitor = dataArray => {
  handleVideoIcon(ProtocalDataMethod.Delete, dataArray);
};

const handleVideoIcon = (method, dataArray) => {
  let videoPointData = {
    feature: 'point',
    type: ProtocolDataType.VideoMonitor,
    method: method,
    data: getPointData(dataArray),
  };

  if (window.unityContent) {
    const unityContent = window.unityContent;
    const str = JSON.stringify(videoPointData);
    unityContent.send('msg', 'connectjs', str);
  }
};

const getPointData = dataArray => {
  let PointData = dataArray?.map(item => {
    const { id, name, x, y, z } = item;
    return {
      id: id,
      name: name,
      x: x,
      y: y,
      z: 15,
      style: 'video.png',
    };
  });
  return PointData;
};

const U3dVideoMonitorAPI = {
  addVideoMonitor,
  updateVideoMonitor,
  deleteVideoMonitor,
};
export default U3dVideoMonitorAPI;
