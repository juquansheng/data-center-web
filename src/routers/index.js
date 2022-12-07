import {Route,Router,Link,NavLink, Routes,Outlet} from "react-router-dom";
import  Login  from "@/components/login/index.jsx";
import  Index  from "@/components/index/index";
import  CesiumView  from "@/components/cesium/index";
import  Counter  from "@/components/test/index";
import  LayoutApp  from "@/pages/index.tsx";
import  Register  from "@/pages/register/index.tsx";
import AuthRouter from './AuthRouters';

export default () => (
    <Routes>		
		<Route path='/' element={<AuthRouter><LayoutApp /></AuthRouter>} >	
			<Route path='/index' element={<Index />} />
			<Route path='/cesium' element={<CesiumView />} />
			<Route path='/counter' element={<Counter />} />
			<Route path='/test/counter1' element={<Counter />} />
		</Route>	
		<Route path='/login' exact = 'true' element={<Login />} />
		<Route path='/register' exact = 'true' element={<Register />} />
	</Routes>
  )
