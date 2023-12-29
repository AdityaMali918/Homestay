// import React from 'react'
// import Header from './Header'
// import {Outlet} from "react-router-dom"
// import Footer from './Footer'

// export default function Layout() {
//   return (
//     <>
//     <div className='h-fit relative'>
//     <div className='py-4 px-8 flex flex-col min-h-screen'>
//         <Header/>
//         <Outlet/>
//     </div>
//     <div className='mt-8 absolute bottom-0 left-0 w-full'>
//         <Footer/>
//         </div>
//         </div>
//     </>
//   )
//}

import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className='flex flex-col min-h-screen relative'>
      <div className='flex-1 py-4 px-8'>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

