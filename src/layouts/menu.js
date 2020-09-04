/*
 * @Description:
 * @Autor: hhao
 * @Date: 2020-09-02 09:58:14
 * @LastEditors: hhao
 * @LastEditTime: 2020-09-03 14:13:16
 */
import { Menu } from 'antd';
import React, { useState } from 'react';
import { Link } from 'umi';

const { SubMenu } = Menu;

const MainMenu = props => {
  const [selectKey, SetSelectKey] = useState('index');

  const menuClick = selected => {
    SetSelectKey(selected.key);
  };

  return (
    <Menu mode="horizontal" onClick={menuClick} selectedKeys={[selectKey]}>
      <Menu.Item key="index">
        <Link to="globe">首页(globe)</Link>
      </Menu.Item>
      <Menu.Item key="page1">
        <Link to="u3d">u3d</Link>
      </Menu.Item>
      <SubMenu title="globe操作">
        <Menu.ItemGroup>
          <Menu.Item key="setting:1">
            <Link to="page2">删除右侧</Link>
          </Menu.Item>
          <Menu.Item key="setting:2">
            <Link to="page3">全屏</Link>
          </Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
    </Menu>
  );
};

export default MainMenu;
