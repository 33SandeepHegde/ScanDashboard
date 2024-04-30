import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectRoute from './components/auth/ProtectRoute';
import RedirectCheck from './components/auth/RedirectCheck';
import LayoutLoader from './components/layout/Loader';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
// import Home from './pages/Home';
const Home = lazy(() => import("./pages/Home"));
// const Login = lazy(() => import("./pages/Login"));

const App = () => {
  const [user,setUser]=useState(false);
  const handlerAuth=(data)=>{
    setUser(data);
  }

  useEffect(()=>{
    const usertoken=localStorage.getItem
  })
  return <BrowserRouter>
    <Suspense fallback={<LayoutLoader/>}>
    <Routes>
      <Route element={<ProtectRoute user={user}/>}>
        <Route path='/' element={<Home/>} />
      </Route>
      <Route element={<RedirectCheck/>}>
      <Route path='/login'  element={<Login handler={handlerAuth}/>}/>
      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>

    </Suspense>
<Toaster position='bottom-center'/>
  </BrowserRouter>
}

export default App  