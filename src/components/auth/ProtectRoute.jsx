import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectRoute= ({children, user=true, redirect='/login'}) => {
  let role=localStorage.getItem('isUser');
  role =JSON.parse(role)
  if(!role) return <Navigate to={redirect} />;
  return children ? children : <Outlet/>;
}

export default ProtectRoute;
