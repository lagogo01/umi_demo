/*
 * @Description:
 * @Author: xfGuo
 * @Date: 2020-07-01 11:58:52
 * @LastEditors: lsun
 * @LastEditTime: 2020-08-11 09:17:41
 */

import ProtocalDataMethod from './ProtocolData/ProtocalDataMethod';

const addTrackData = dataArray => {
  handleTrackData(ProtocalDataMethod.Add, dataArray);
};

const updateTrackData = dataArray => {
  handleTrackData(ProtocalDataMethod.Update, dataArray);
};

const deleteTrackData = dataArray => {
  handleTrackData(ProtocalDataMethod.Delete, dataArray);
};

const handleTrackData = (method, dataArray) => {
  let trackData = {
    feature: 'track',
    method: method,
    data: getTrackData(dataArray),
  };

  if (window.unityContent) {
    const unityContent = window.unityContent;
    const str = JSON.stringify(trackData);
    unityContent.send('msg', 'connectjs', str);
  }
};

const getTrackData = dataArray => {
  let lineData = dataArray?.map(item => {
    const { id, name, points } = item;
    return {
      id: id,
      name: name,
      color: [{ r: 1, g: 0, b: 0 }],
      points: points?.map(obj => {
        const { id, x, y, z, date } = obj;
        return {
          id: id,
          x: x,
          y: y,
          z: 5,
          date: date,
        };
      }),
    };
  });
  return lineData;
};

const U3dTrackAPI = { addTrackData, updateTrackData, deleteTrackData };
export default U3dTrackAPI;
