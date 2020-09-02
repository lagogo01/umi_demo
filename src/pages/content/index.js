/*
 * @Description: 
 * @Autor: hhao
 * @Date: 2020-09-02 14:15:03
 * @LastEditors: hhao
 * @LastEditTime: 2020-09-02 16:55:18
 */
import React from 'react';
import styles from './index.less';

import Unity, { UnityContext } from "react-unity-webgl";

const unityContext = new UnityContext({
  loaderUrl: "build/myunityapp.loader.js",
  dataUrl: "build/myunityapp.data",
  frameworkUrl: "build/myunityapp.framework.js",
  codeUrl: "build/myunityapp.wasm",
});

const Index=(props)=>{

    return <div className={styles.MainBlock}>
        <div className={styles.left}>左</div>
        <div className={styles.content}>
          <Unity unityContext={unityContext} />
        </div>
        <div className={styles.right}>右 </div>
    </div>
}

export default Index;