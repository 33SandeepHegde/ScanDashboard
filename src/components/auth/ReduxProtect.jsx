import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
const ReduxProtect = ({children, user=true, redirect='/login'}) => {
    if(!user) return <Navigate to={redirect} />;
    return children ? children : <Outlet/>;
}

export default ReduxProtect