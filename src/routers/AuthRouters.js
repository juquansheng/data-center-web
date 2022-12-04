import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'


const AuthRouter = ({ children }) => {
	const token = useSelector((state)=>state.auth.token);
    const location = useLocation()
    if (token) {
        return children
    } else {
        return <Navigate to='/login' replace state={{ from: location }}></Navigate>
    }
}
export default AuthRouter