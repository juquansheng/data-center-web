import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, message, Menu, Dropdown, Modal, Avatar } from 'antd';
import {Outlet,useLocation,Link} from "react-router-dom";
import { logout,getUserInfo } from "@/store/action/auth.js";
import { useDispatch, useSelector } from 'react-redux';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';


const { Header } = Layout;


const LayoutHeader: React.FC <{token: string,avatar: string}> = ({token,avatar}) => {

  const dispatch = useDispatch();
  const token1 = useSelector((state)=>state.auth.token);
  console.log("token",token);
  console.log("avatar",avatar);

  const handleLogout = () => {
    Modal.confirm({
      title: "logout",
      content: "Confirm logout?",
      okText: "Confirm",
      cancelText: "Cancel",
      onOk: () => {
        requestLogout(token);
      },
    });
  };


  const requestLogout = (data) => {
    logout(data)(dispatch)
      .then((data) => {
        message.success("Login successfully");
      })
      .catch((error) => {
        console.log("Login failed");
        message.error(error);
      });
  };


  const items = [
    { label: <Link to="/index">index</Link>, key: 1 },
    { label: <a href="https://www.baidu.com">baidu</a>, key: 2 },
    { label: 'logout', key: 3 },
  ];


  const onClick: MenuProps['onClick'] = ({ key }) => {
    console.log(`Click on item ${key}`);
    if(key=='3'){
      console.log("key==",key);
      handleLogout();
    }
  };

  return (
    <>
      <Header className="site-layout-background"
        style={{ padding: 0 }}>
        <div className="right-menu" style={{float: 'right'}}>
          <div className="dropdown-wrap">
          <Dropdown menu={{ items, onClick }}>
            <a onClick={(e) => e.preventDefault()}>
            <Avatar shape="square" src={avatar} />
            </a>
          </Dropdown>

          </div>
        </div>
      </Header>
    </>
  );
};

export default LayoutHeader;
