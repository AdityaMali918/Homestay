import React from 'react'
import { useState } from 'react';

export default function PlaceGallery({place}) {
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    if (showAllPhotos) {
        return (
            <div className='absolute aspect-auto inset-0 bg-white min-h-screen'>
                <div className='p-8 grid gap-4 bg-slate-200'>
                    <div>
                        <h2 className='text-3xl rounded-2xl  p-8 mr36'>Photos of {place.title}</h2>
                        <button onClick={() => { setShowAllPhotos(false) }} className='fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl bg-black text-white shadow shadow-black'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" dataSlot="icon" className="w-6 h-6">
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>

                            close photos</button>
                    </div>
                    {
                        place?.photos?.length > 0 && place.photos.map(photo => (
                            <div key={photo} className='m-4 aspect-auto object-cover'>
                                <img src={"https://airbnbclone-j4qe.onrender.com/uploads/" + photo} alt="" />
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }

  return (
    <div className='relative'>
    <div className='grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden'>
        <div>
            {place.photos?.[0] && (
                <div>
                    <img  onClick={()=>setShowAllPhotos(true)} className='aspect-square object-cover cursor-pointer' src={"https://airbnbclone-j4qe.onrender.com/uploads/" + place.photos?.[0]} alt="" />
                </div>

            )}
        </div>
        <div className='grid '>
            {place.photos?.[1] && (
                <img onClick={()=>setShowAllPhotos(true)} className='aspect-square object-cover cursor-pointer' src={"https://airbnbclone-j4qe.onrender.com/uploads/" + place.photos?.[1]} alt="" />
            )}

           <div className='overflow-hidden'>
           {place.photos?.[2] && (
                <img onClick={()=>setShowAllPhotos(true)} className='aspect-square object-cover relative top-2 cursor-pointer' src={"https://airbnbclone-j4qe.onrender.com/uploads/" + place.photos?.[3]} alt="" />
            )}
           </div>
        </div>

    </div>
    <button onClick={() => { setShowAllPhotos(true) }} className='flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" dataSlot="icon" className="w-6 h-6">
            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
        </svg>

        show more photos
    </button>
</div>
  )
}
