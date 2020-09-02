/*
 * @Descripttion:
 * @Author: lsun
 * @Date: 2020-02-04 11:28:05
 * @LastEditors: hhao
 * @LastEditTime: 2020-09-02 18:45:12
 */
import styles from './index.less';
import Header from './menu';
import { router as Router } from 'dva';
import cls from 'classnames';

const { Redirect } = Router;
function BasicLayout(props) {

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <Header  />
      </div>
      <div className={styles['content']}>{props.children}</div>
    </div>
  );
}

export default BasicLayout;
