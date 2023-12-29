import React from 'react'
import Header from './Header'
import {Outlet} from "react-router-dom"
import Footer from './Footer'

export default function Layout() {
  return (
    <>
    <div className='h-fit relative'>
    <div className='py-4 px-8 flex flex-col min-h-screen'>
        <Header/>
        <Outlet/>
    </div>
    <div className='mt-2 absolute bottom-0 w-full'>
        <Footer/>
        </div>
        </div>
    </>
  )
}
