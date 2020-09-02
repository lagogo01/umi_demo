/*
 * @Description: 
 * @Author: wdxin
 * @Date: 2020-05-21 08:44:05
 * @LastEditors: wdxin
 * @LastEditTime: 2020-05-21 08:45:30
 */
import React, { Component } from 'react';
import styles from './TimeComponent.less';

export default class TimeComponent extends Component {

    constructor(props){
        super(props);

        this.timer = null;

        this.state = {
            time: '',
        }
    }

    componentDidMount(){
        if (this.timer === null) {
            setTimeout(() => {
              this.initClock();
            }, 1000);
          }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
      }

    
  initClock = () => {
    if (this.timer) return;
    this.timer = setInterval(() => {
      const date = new Date();
      let h = date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();
      h = h < 10 ? '0' + h : h;
      m = m < 10 ? '0' + m : m;
      s = s < 10 ? '0' + s : s;
      const time = h + ':' + m + ':' + s;
      this.setState({ time });
    }, 1000);
  };

    render() {
        const date = new Date();
        const dateStr =
            date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
        const { time } = this.state;
        return (
            <div className={styles['time-display-component']}>{dateStr + ' ' + time}</div>
        )
    }
}
