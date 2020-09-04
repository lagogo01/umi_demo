/*
 * @Description:
 * @Author: xfGuo
 * @Date: 2020-07-14 10:50:25
 * @LastEditors: lsun
 * @LastEditTime: 2020-08-19 14:57:20
 */

const testModelLocation = dataArray => {
  if (window.unityContent) {
    const unityContent = window.unityContent;
    let data = {
      feature: 'modelLocation',
      data: [{ id: 'DiDuanHuanLiuBian' }],
    };
    const str = JSON.stringify(data);
    unityContent.send('msg', 'connectjs', str);
  }
};

const TestModelLocationAPI = {
  testModelLocation,
};
export default TestModelLocationAPI;
