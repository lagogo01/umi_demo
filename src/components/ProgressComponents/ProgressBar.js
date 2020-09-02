import React from 'react';
import { Progress } from 'antd';
import styles from './ProgressBar.less';
import useEleHeight from '@/components/base/common/useEleHeight/index';
import PropTypes from 'prop-types';

/**
 * @param {*} props
 * * value:int,进度值
 * * valueFormat:func,自定义进度值的样式
 * * strokeWidth：int,进度条线的宽度，单位 px
 * * strokeColor:string | { from: string; to: string; direction: string },进度条的色彩，传入 object 时为渐变
 * @returns
 */
function ProgressBar(props) {
  const { value, valueFormat, strokeWidth = 20, strokeColor, limitValue, ...params } = props;
  const width = useEleHeight(strokeWidth);

  return (
    <div className={styles['container']}>
      <Progress
        {...params}
        type="line"
        status="normal"
        strokeLinecap="square"
        percent={value}
        strokeWidth={width}
        strokeColor={strokeColor}
        format={percent => valueFormat(percent)}
      />
    </div>
  );
}

ProgressBar.propTypes = {
  value: PropTypes.number,
  valueFormat: PropTypes.func,
  strokeWidth: PropTypes.number,
  strokeColor: PropTypes.string,
};

ProgressBar.defaultProps = {
  valueFormat: precent => (
    <>
      <span style={{ color: 'white' }}>{precent}%</span>
    </>
  ),
};

export default ProgressBar;
