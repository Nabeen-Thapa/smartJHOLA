import React from 'react'
import Signup from '../features/auth/Signup.tsx'
import {
    BrowserRouter as Router,
    Route,
    Routes
  } from "react-router-dom";
import Login from '../features/auth/Login.tsx';
import Navbar from '../components/user.Navbar.tsx';
import AddProductForm from '../layouts/admin.addProductForm.tsx';
const AppRoutes = () => {
  return (
    <>
    <Navbar/>
      <Router>
      <Routes>
       
      <Route path='/signup' element={ <Signup/>}/>
      <Route path='/login' element={ <Login/>}/>
      <Route path='/addProduct' element={ <AddProductForm/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default AppRoutes
