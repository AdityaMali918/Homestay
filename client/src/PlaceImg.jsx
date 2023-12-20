import React from 'react'

export default function PlaceImg({place,index=0,className=null}) {
    if(!place.photos?.length){
        return '';
    }

    if(!className){
        className='object-cover';
    }

  return (     
            <img className={className} src={'https://airbnbclone-noku.onrender.com/uploads/'+place.photos[index]} alt="" />     
  )
}
