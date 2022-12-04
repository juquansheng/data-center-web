import {Route,Router,Link,NavLink, Routes,Navigate } from "react-router-dom";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const menuList = [
  {
    label: <Link to="/index">index</Link>,
    labelPath: "/index",
    key: 1,
    icon: <PieChartOutlined />
  },
  {
    label: <Link to="/cesium">cesium</Link>,
    labelPath: "/cesium",
    key: 2,
    icon: <PieChartOutlined />
  },
  {
    label: <Link to="/counter">counter</Link>,
    labelPath: "/counter",
    key: 3,
    icon: <PieChartOutlined />,
  },
  {
    label: "counter",
    labelPath: "/test",
    key: 4,
    icon: <PieChartOutlined />,
    children: [
      {
        label: <Link to="/test/counter1">counter1</Link>,
        labelPath: "/test/counter1",
        key: 5,
        icon:<PieChartOutlined />
      },
    ],
  },

];
export default menuList;
