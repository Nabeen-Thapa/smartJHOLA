import React from 'react'
import Signup from '../features/auth/Signup.tsx'
import {
    BrowserRouter as Router,
    Route,
    Routes
  } from "react-router-dom";
import Login from '../features/auth/Login.tsx';
const AppRoutes = () => {
  return (
    <>
      <Router>
      <Routes>
      <Route path='/' element={ <Signup/>}/>
      <Route path='/login' element={ <Login/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default AppRoutes
