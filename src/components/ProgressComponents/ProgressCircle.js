/*
 * @Description: 
 * @Autor: hhao
 * @Date: 2020-09-02 16:03:07
 * @LastEditors: hhao
 * @LastEditTime: 2020-09-02 16:09:34
 */
import React from 'react';
import { Progress } from 'antd';
import styles from './ProgressCircle.less';
import useEleHeight from '@/components/common/useEleHeight/index';
import PropTypes from 'prop-types';

/**
 * @param {*} props
 * * value:number,进度值
 * * valueFormat:func,自定义进度值的样式
 * * strokeWidth：number,进度条线的宽度，单位 px
 * * strokeColor:string | { from: string; to: string; direction: string },进度条的色彩，传入 object 时为渐变
 * @returns
 */
function ProgressCircle(props) {
  const { value, valueFormat, strokeWidth = 15, strokeColor, limitValue, ...params } = props;
  const canvasWFunc = () => {
    const ele = document?.getElementById('circleCanvas');
    if (ele) {
      if (ele.offsetHeight < ele.offsetWidth) {
        return ele.offsetHeight;
      } else {
        return ele.offsetWidth;
      }
    }
  };
  const strokeW = useEleHeight(strokeWidth);
  const [canvasW, setCanvasW] = React.useState(canvasWFunc());
  React.useEffect(() => {
    const value = canvasWFunc();
    setCanvasW(value);
  });

  return (
    <div className={styles['container']} id="circleCanvas">
      <Progress
        {...params}
        type="circle"
        status="normal"
        strokeLinecap="square"
        percent={value}
        width={canvasW}
        strokeWidth={strokeW}
        strokeColor={strokeColor}
        format={percent => valueFormat(percent)}
      />
    </div>
  );
}

ProgressCircle.propTypes = {
  value: PropTypes.number,
  valueFormat: PropTypes.func,
  strokeWidth: PropTypes.number,
  strokeColor: PropTypes.string,
};

ProgressCircle.defaultProps = {
  valueFormat: precent => (
    <>
      <span style={{ color: 'white' }}>{precent}%</span>
    </>
  ),
};

export default ProgressCircle;
