
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";  // Update import
//import { UserContext } from "./UserContext";
import { UserContext } from "./UserContext";

export default function Header() {
  const { user,ready } = useContext(UserContext);
  const navigate = useNavigate();  // Change from useHistory to useNavigate
  const { setUser,setReady } = useContext(UserContext);

    return(<div>
        <header className='flex justify-between' >
          <Link to={'/'} className="flex item-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 -rotate-90 text-primary">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
            <span className='font-bold text-xl'>airbnb</span>
          </Link>
          <div className='flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300 font-bold'>
            <Link to={'/search'}>Anywhere</Link>
            <div className='border border-l border-gray-300'></div>
            <div>Any week</div>
            <div className='border border-l border-gray-300'></div>
            <div>Add guests</div>
            <Link to={'/search'} className='bg-primary text-white rounded-full'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
            </Link>
          </div>
          <Link to={(user && ready) ? '/account' : '/login'} className='flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 overflow-hidden'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-7">
  <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
</svg>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-7 h-7 text-gray-500 ">
  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z" clipRule="evenodd" />
</svg>
{!!user && (<div>
  {user.name}
</div>)}
</Link>
        </header>
      </div>);
}