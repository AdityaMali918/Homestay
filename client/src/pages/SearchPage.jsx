// import React from 'react'
// import { useState,useEffect } from 'react'
// import * as Realm from "realm-web";
// import { Link } from "react-router-dom";

// export default function SearchPage() {

//     const [search,setSearch] = useState('');

//     useEffect(async ()=>{
//         const REAL_APP_ID = "products-ndbcu";
//         const app =new Realm.App({id:REAL_APP_ID}) ;  
//         const credentials = Realm.Credentials.anonymous();
//         try{
//             const user = await app.logIn(credentials);
//             const searchplace = await user.functions.searchPlaces(search);
//             const places =JSON.parse(searchplace);
//         }catch(error){
//             console.error(error);
//         }
//     },[search])

//     const handleSubmit=(e)=>{
//         e.preventDefault();
//     }

//   return (
//     <div>
//         <form onSubmit={handleSubmit}>
//             <input 
//             className="w-full border my-2 py-2 px-3 rounded-2xl"
//             value={search}
//             onChange={(ev)=>setSearch(ev.target.value)}
//              placeholder='search'/>
//              <button className='bg-primary text-white rounded-full'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//               <path d="M8.25 10.875a2.625 2.625 0 115.25 0 2.625 2.625 0 01-5.25 0z" />
//               <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.125 4.5a4.125 4.125 0 102.338 7.524l2.007 2.006a.75.75 0 101.06-1.06l-2.006-2.007a4.125 4.125 0 00-3.399-6.463z" clipRule="evenodd" />
//             </svg>
//             </button>

//             <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             {places.length > 0 && places.map(place => (
//                 <Link to={`/place/${place._id}`} key={place._id}>
//                     <div className="bg-gray-300 rounded-2xl flex mb-2">
//                         {place.photos?.[0] && (
//                             <img className="rounded-2xl object-cover aspect-square" src={'https://airbnbclone-noku.onrender.com/uploads/' + place.photos?.[0]} alt="" />
//                         )}
//                     </div>
//                     <div>
//                         <h3 className="font-bold leading-4">{place.address}</h3>
//                         <h2 className="text-sm truncate leading-4 text-gray-500">{place.title}</h2>
//                         <div className="mt-1">
//                             <span className="font-bold">${place.price}</span> per night
//                         </div>
//                     </div>
//                 </Link>
//             ))}
//         </div>
//         </form>
//     </div>
//   )
// }


import React, { useState, useEffect } from 'react';
import * as Realm from 'realm-web';
import { Link } from 'react-router-dom';

export default function SearchPage() {
    const [search, setSearch] = useState('');
    const [places, setPlaces] = useState([]); // Added state for places

    useEffect(async () => {
        const REAL_APP_ID = 'products-ndbcu';
        const app = new Realm.App({ id: REAL_APP_ID });
        const credentials = Realm.Credentials.anonymous();
        try {
            const user = await app.logIn(credentials);
            const searchplace = await user.functions.searchPlaces(search);
            const placesData = JSON.parse(searchplace);
            setPlaces(placesData); // Update the places state
        } catch (error) {
            console.error(error);
        }
    }, [search]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    className="w-full border my-2 py-2 px-3 rounded-2xl"
                    value={search}
                    onChange={(ev) => setSearch(ev.target.value)}
                    placeholder="search"
                />
                <button className="bg-primary text-white rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M8.25 10.875a2.625 2.625 0 115.25 0 2.625 2.625 0 01-5.25 0z" />
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.125 4.5a4.125 4.125 0 102.338 7.524l2.007 2.006a.75.75 0 101.06-1.06l-2.006-2.007a4.125 4.125 0 00-3.399-6.463z" clipRule="evenodd" />
                    </svg>
                </button>

                <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {places.length > 0 &&
                        places.map((place) => (
                            <Link to={`/place/${place._id}`} key={place._id}>
                                <div className="bg-gray-300 rounded-2xl flex mb-2">
                                    {place.photos?.[0] && (
                                        <img
                                            className="rounded-2xl object-cover aspect-square"
                                            src={'https://airbnbclone-noku.onrender.com/uploads/' + place.photos?.[0]}
                                            alt=""
                                        />
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-bold leading-4">{place.address}</h3>
                                    <h2 className="text-sm truncate leading-4 text-gray-500">{place.title}</h2>
                                    <div className="mt-1">
                                        <span className="font-bold">${place.price}</span> per night
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
            </form>
        </div>
    );
}
