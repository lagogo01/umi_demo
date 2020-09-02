import React, { useEffect } from 'react';

import { Progress } from 'antd';
import styles from './ProgressDashboard.less';
import useEleHeight from '@/components/base/common/useEleHeight/index';
import PropTypes from 'prop-types';

/**
 * @param {*} props
 * * value:number,进度值
 * * valueFormat:func,自定义进度值的样式
 * * strokeWidth：number,进度条线的宽度，单位 px
 * * strokeColor:string | { from: string; to: string; direction: string },进度条的色彩，传入 object 时为渐变
 * * gapDegree:number,仪表盘进度条缺口角度，default:75,可取值 0 ~ 295
 * * gapPosition:string,仪表盘进度条缺口位置,top | bottom | left | right,default:bottom
 * @returns
 */
function ProgressDashboard(props) {
  const {
    value,
    valueFormat,
    strokeWidth = 15,
    gapDegree,
    gapPosition,
    strokeColor,
    ...params
  } = props;

  const canvasWFunc = () => {
    const ele = document?.getElementById('circleCanvas');

    if (ele) {
      if (ele.offsetHeight > ele.offsetWidth) {
        return ele.offsetWidth;
      } else {
        return ele.offsetHeight;
      }
    }
  };
  const [canvasW, setCanvasW] = React.useState(canvasWFunc());

  useEffect(() => {
    const value = canvasWFunc();
    setCanvasW(value);
  }, []);

  const onChange = () => {
    const value = canvasWFunc();
    setCanvasW(value);
  };

  useEffect(() => {
    // 相当于 componentDidMount
    window.addEventListener('resize', onChange, false);

    return () => {
      // 相当于 componentWillUnmount
      window.removeEventListener('resize', onChange, false);
    };
  }, []);

  return (
    <div className={styles['container']} id="circleCanvas">
      {' '}
      <Progress
        type="dashboard"
        status="normal"
        strokeLinecap="square"
        percent={value}
        width={canvasW}
        gapDegree={gapDegree}
        gapPosition={gapPosition}
        strokeWidth={strokeWidth}
        strokeColor={strokeColor}
        format={percent => valueFormat(percent)}
        {...params}
      />{' '}
    </div>
  );
}

ProgressDashboard.propTypes = {
  value: PropTypes.number,
  strokeWidth: PropTypes.number,
  strokeColor: PropTypes.string,
  gapDegree: PropTypes.number,
  gapPosition: PropTypes.string,
  valueFormat: PropTypes.func,
};

ProgressDashboard.defaultProps = {
  valueFormat: precent => (
    <>
      {' '}
      <span
        style={{
          color: 'white',
        }}
      >
        {' '}
        {precent}%
      </span>{' '}
    </>
  ),
};

export default ProgressDashboard;
