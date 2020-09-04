/*
 * @Description:
 * @Autor: hhao
 * @Date: 2020-08-20 19:42:57
 * @LastEditors: hhao
 * @LastEditTime: 2020-09-04 17:19:56
 */
import React from 'react';
import styles from './index.less';
import UnityViewer from '../components/unity3d/UnityViewer';

//https://smartconstruction.oss-cn-beijing.aliyuncs.com/3dModel/82d7792f-2d42-a8fc-03c2-812429a223c7/buildexe.data.unityweb
//https://smartconstruction.oss-cn-beijing.aliyuncs.com/3dModel/82d7792f-2d42-a8fc-03c2-812429a223c7/buildexe.json
//https://smartconstruction.oss-cn-beijing.aliyuncs.com/3dModel/82d7792f-2d42-a8fc-03c2-812429a223c7/buildexe.wasm.code.unityweb
//https://smartconstruction.oss-cn-beijing.aliyuncs.com/3dModel/82d7792f-2d42-a8fc-03c2-812429a223c7/buildexe.wasm.framework.unityweb

const Index = props => {
  // const unitysssContext = new UnityContext({
  //   loaderUrl: "https://smartconstruction.oss-cn-beijing.aliyuncs.com/3dModel/82d7792f-2d42-a8fc-03c2-812429a223c7/UnityLoader.js",
  //   dataUrl: "https://smartconstruction.oss-cn-beijing.aliyuncs.com/3dModel/82d7792f-2d42-a8fc-03c2-812429a223c7/buildexe.json",
  //    frameworkUrl: "https://smartconstruction.oss-cn-beijing.aliyuncs.com/3dModel/82d7792f-2d42-a8fc-03c2-812429a223c7/buildexe.wasm.framework.unityweb",
  //    codeUrl: "https://smartconstruction.oss-cn-beijing.aliyuncs.com/3dModel/82d7792f-2d42-a8fc-03c2-812429a223c7/buildexe.wasm.code.unityweb",
  // });

  const modelpath = {
    modalJsPath:
      'https://smartconstruction.oss-cn-beijing.aliyuncs.com/3dModel/82d7792f-2d42-a8fc-03c2-812429a223c7/UnityLoader.js	',
    modalJsonPath:
      'https://smartconstruction.oss-cn-beijing.aliyuncs.com/3dModel/82d7792f-2d42-a8fc-03c2-812429a223c7/WuhanStation.json',
  };

  return (
    <div className={styles.MainBlock}>
      <div className={styles.left}>左</div>
      <div className={styles.content}>
        <UnityViewer modalPath={modelpath} />
      </div>
      <div className={styles.right}>右 </div>
    </div>
  );
};

export default Index;
