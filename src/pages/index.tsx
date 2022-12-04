import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import {Outlet,useLocation,Link} from "react-router-dom";
import menuList from "@/config/menuConfig";
import { useSelector } from 'react-redux';


const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

function getMenuNodes (menuList,menuConfig) {
  return menuList.reduce((result, item) => {
    if (filterMenu(item,menuConfig)) {
      if (item.children) {
        result.push(
          getItem(item.label, item.key, item.icon, getMenuNodes(item.children,menuConfig))
        );
      }else{
        result.push(
          getItem(item.label, item.key, item.icon,)
        );
      }
    }
    return result;
  }, []);
};

const resultMap = new Map();
function getBreadcrumbNodes (menuList,menuConfig) {
  menuList.reduce((result:Map<string,object>, item) => {
    if (filterMenu(item,menuConfig)) {
      resultMap.set(
        item.labelPath,item.label
      );
      if (item.children) {       
        getBreadcrumbNodes(item.children,menuConfig)
      }
    }
    return result;
  }, {});
  return resultMap;
};


// filter menu
function filterMenu (item,menuConfig) {
  const { key } = item;
  if (menuConfig.indexOf(key) !== -1) {
    return true;
  } else {
    return false;
  }
};

const LayoutApp: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const menuConfig = useSelector((state)=>state.auth.menuConfig);
  const items = getMenuNodes(menuList,menuConfig);
  const breadcrumbNodes = getBreadcrumbNodes(menuList,menuConfig);

  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    console.log("breadcrumbNodes",breadcrumbNodes);
    return (
      <Breadcrumb.Item key={url}>
        {breadcrumbNodes.get(url)}
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">home</Link>
    </Breadcrumb.Item>
  ].concat(extraBreadcrumbItems);

  console.log("LayoutApp call");
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
          {breadcrumbItems}
          </Breadcrumb>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2022 Created by A</Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutApp;