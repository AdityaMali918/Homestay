import React from 'react'
import Header from './Header'
import {Outlet} from "react-router-dom"
import Footer from './Footer'

export default function Layout() {
  return (
    <>
   
    <div className='py-4 px-8 flex flex-col min-h-screen'>
    <div className='h-fit relative'>
        <Header/>
        <Outlet/>
    </div>
    <div className='mt-8 absolute bottom-0 w-full'>
        <Footer/>
        </div>
        </div>
    </>
  )
}
