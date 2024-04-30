import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const RedirectCheck= ({children, user=true, redirect='/'}) => {
  let role=localStorage.getItem('isUser');
  role =JSON.parse(role)
  if(role) return <Navigate to={redirect} />;
  return children ? children : <Outlet/>;
}

export default RedirectCheck;
