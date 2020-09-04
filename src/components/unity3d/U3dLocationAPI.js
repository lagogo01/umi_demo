/**
 *
 * @param {number} x - 坐标
 * @param {number} y
 * @param {number} z
 * @param {number} offset
 * @param {number} xDeg
 * @param {number} yDeg
 */
const locate = (x, y, z, offset, xDeg, yDeg) => {
  if (window.unityContent) {
    const unityContent = window.unityContent;
    const pointObj = {
      feature: 'location',
      data: [
        {
          x: x,
          y: y,
          z: 20,
          offset: 40,
          xDeg: 60,
          yDeg: 60,
        },
      ],
    };
    const str = JSON.stringify(pointObj);
    unityContent.send('msg', 'connectjs', str);
  }
};

const U3dLocationAPI = { locate };
export default U3dLocationAPI;
