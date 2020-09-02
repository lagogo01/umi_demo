/*
 * @Description: 
 * @Autor: hhao
 * @Date: 2020-09-02 09:58:14
 * @LastEditors: hhao
 * @LastEditTime: 2020-09-02 14:28:54
 */
import { Menu } from 'antd';
import React,{useState} from 'react';
import { Link } from 'umi';

const { SubMenu } = Menu;

const MainMenu= ( props ) =>{

    const [selectKey,SetSelectKey]=useState('index');
    
    const menuClick=(selected)=>{
        SetSelectKey(selected.key);
    }

    return <Menu mode="horizontal" onClick={menuClick} selectedKeys={[selectKey]}>
        <Menu.Item key="index" >
        <Link to='index'>首页</Link>
        </Menu.Item>
        <Menu.Item key="page1">
        <Link to='page1'>页面1</Link>
        </Menu.Item>
        <SubMenu  title="页面2">
          <Menu.ItemGroup >
            <Menu.Item key="setting:1">
                 <Link to='page2'>页面2</Link>
            </Menu.Item>
            <Menu.Item key="setting:2"><Link to='page1'>页面1</Link></Menu.Item>
          </Menu.ItemGroup>
          
        </SubMenu>
    </Menu>
}

export default MainMenu;
