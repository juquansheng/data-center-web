import { setToken, removeToken, getToken} from "@/utils/token.ts";
import {Route,Router,Link,NavLink, Routes,Navigate } from "react-router-dom";
import { logout } from "@/store/action/auth.js";
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, message, Spin } from "antd";

export default function Index(){
  const dispatch = useDispatch();
  const token = useSelector((state)=>state.auth.token);

  const handleLogout = () => {
    console.log("Logout");
    logout()(dispatch)
      .then(() => {
        message.success("Logout successfully");
      })
      .catch((error) => {
        console.log("Logout failed");
        message.error(error);
      });
  };

  if (token) {
    console.log("handleLogout",token);
  }else{
    return <Navigate to="/login"/>;
  };

    return(
        <div className="nav">
        <h1>Index</h1>
        <div className="nav">
        <NavLink  to="/" exact="true">Index</NavLink>|
        <NavLink to="/login">login</NavLink>|
        <NavLink to="/cesium">cesium</NavLink>|
        <NavLink to="/counter">Counter</NavLink>|
      </div> 
        <button onClick={handleLogout}>
            logout
        </button>
	      </div> 

    );
}
