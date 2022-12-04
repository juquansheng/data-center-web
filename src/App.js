import  LayoutRouters  from "./routers";
import * as widget from "dirCesium/Widgets/widgets.css";
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { getUserInfo } from "@/store/action/auth.js"

function App() {
	console.log("-------------------------------");
	const token = useSelector((state)=>state.auth.token);
    const dispatch = useDispatch();
    const handleUserInfo = (token) => {
        getUserInfo(token)(dispatch)
          .then((data) => {
            console.log("Logged in App");
          })
          .catch((error) => {  
            console.log("Not logged in App"); 
          });
      };
      if (token) {
        handleUserInfo(token);
      }
	return (
		<div>
		<LayoutRouters></LayoutRouters>
	</div>
		
	);
}

export default App;