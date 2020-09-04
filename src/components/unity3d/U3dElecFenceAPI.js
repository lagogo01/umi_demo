import ProtocalDataMethod from './ProtocolData/ProtocalDataMethod';

const addElecFenceData = dataArray => {
  handleElecFence(ProtocalDataMethod.Add, dataArray);
};

const updateElecFenceData = dataArray => {
  handleElecFence(ProtocalDataMethod.Update, dataArray);
};

const deleteElecFenceData = dataArray => {
  handleElecFence(ProtocalDataMethod.Delete, dataArray);
};

const handleElecFence = (method, dataArray) => {
  let fenceData = {
    feature: 'polyline',
    method: method,
    data: getLineData(dataArray),
  };

  if (window.unityContent && dataArray.length > 0) {
    const unityContent = window.unityContent;
    const str = JSON.stringify(fenceData);
    unityContent.send('msg', 'connectjs', str);
  }
};

const getLineData = dataArray => {
  let lineData = dataArray?.map(item => {
    const { id, name, points } = item;
    return {
      id: id,
      name: name,
      color: [{ r: 1, g: 0, b: 0 }],
      points: points?.map(obj => {
        const { id, x, y, date } = obj;
        return {
          id: id,
          x: x,
          y: y,
          z: 0,
          date: date,
        };
      }),
    };
  });
  return lineData;
};

const U3dElecFenceAPI = {
  addElecFenceData,
  updateElecFenceData,
  deleteElecFenceData,
};
export default U3dElecFenceAPI;
