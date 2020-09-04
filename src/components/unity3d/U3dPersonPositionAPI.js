/*
 * @Description:
 * @Author: xfGuo
 * @Date: 2020-07-14 10:50:25
 * @LastEditors: lsun
 * @LastEditTime: 2020-08-10 14:50:42
 */
import ProtocalDataMethod from './ProtocolData/ProtocalDataMethod';
import ProtocolDataType from './ProtocolData/ProtocolDataType';
const addPersonPositionData = dataArray => {
  handlePersonPosition(ProtocalDataMethod.Add, dataArray);
};

const updatePersonPositionData = dataArray => {
  handlePersonPosition(ProtocalDataMethod.Update, dataArray);
};

const deletePersonPositionData = dataArray => {
  handlePersonPosition(ProtocalDataMethod.Delete, dataArray);
};

const handlePersonPosition = (method, dataArray) => {
  let personData = {
    feature: 'point',
    type: ProtocolDataType.PersonPosition,
    method: method,
    data: getPointData(dataArray),
  };

  if (window.unityContent) {
    const unityContent = window.unityContent;
    const str = JSON.stringify(personData);
    unityContent.send('msg', 'connectjs', str);
  }
};

const getPointData = dataArray => {
  let PointData = dataArray?.map(item => {
    const { id, name, x, y, z, warning } = item;
    return {
      id: id,
      name: name,
      x: x,
      y: y,
      z: 5,
      warning: warning,
      style: 'person.png',
    };
  });
  return PointData;
};

const U3dPersonPositionAPI = {
  addPersonPositionData,
  updatePersonPositionData,
  deletePersonPositionData,
};
export default U3dPersonPositionAPI;
