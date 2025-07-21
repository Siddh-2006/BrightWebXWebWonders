import React,{useState} from 'react'
import { Outlet } from 'react-router'
import Header from './Header'
import Navbar from './Navbar'


function Layout() {
  return (
    <div>
      <Header></Header>
      <Navbar></Navbar>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default Layout
