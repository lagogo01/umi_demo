/*
 * @Description:
 * @Author: xfGuo
 * @Date: 2020-07-14 10:50:25
 * @LastEditors: lsun
 * @LastEditTime: 2020-08-19 14:57:20
 */
import ProtocalDataMethod from './ProtocolData/ProtocalDataMethod';
import ProtocolDataType from './ProtocolData/ProtocolDataType';

const addRiskPointData = dataArray => {
  handleRiskPoint(ProtocalDataMethod.Add, dataArray);
};

const updateRiskPointData = dataArray => {
  handleRiskPoint(ProtocalDataMethod.Update, dataArray);
};

const deleteRiskPointData = dataArray => {
  handleRiskPoint(ProtocalDataMethod.Delete, dataArray);
};

const handleRiskPoint = (method, dataArray) => {
  let riskPointData = {
    feature: 'point',
    type: ProtocolDataType.RiskPoint,
    method: method,
    data: getPointData(dataArray),
  };

  if (window.unityContent) {
    const unityContent = window.unityContent;
    const str = JSON.stringify(riskPointData);
    unityContent.send('msg', 'connectjs', str);
  }
};

const getPointData = dataArray => {
  let PointData = dataArray?.map(item => {
    const { id, name, x, y, z, riskLevel, warning } = item;
    return {
      id: id,
      name: name,
      x: x,
      y: y,
      z: 10,
      riskLevel: riskLevel,
      warning: warning,
      style: 'video.png',
    };
  });
  return PointData;
};

const U3dRiskPointAPI = {
  addRiskPointData,
  updateRiskPointData,
  deleteRiskPointData,
};
export default U3dRiskPointAPI;
