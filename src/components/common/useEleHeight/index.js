import React, { useState, useEffect } from 'react';
/**
 *
 * @param {number} value 字体或元素像素值
 */
function useEleHeight(value) {
  const getDimensions = value => {
    const radio =
      (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) /
      process.env.DesignWidth;

    return value * radio;
  };
  const [height, setHeight] = useState(getDimensions(value));

  const onChange = () => {
    const height = getDimensions(value);
    setHeight(height);
  };

  useEffect(() => {
    // 相当于 componentDidMount
    window.addEventListener('resize', onChange, false);

    return () => {
      // 相当于 componentWillUnmount
      window.removeEventListener('resize', onChange, false);
    };
  }, [onChange]);

  return height;
}

export default useEleHeight;
