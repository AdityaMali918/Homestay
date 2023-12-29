import React, { useState, useContext, useEffect } from 'react'
import { differenceInCalendarDays } from "date-fns"
import axios from 'axios';
import { Navigate } from "react-router-dom";
import { UserContext } from './UserContext';

export default function BookingWidget({ place }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user])

    let numberOfNights = 0;

    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    async function bookThisPlace() {
        if (!!user) {
            if (/^\d{10}$/.test(phone) && place.maxGuests >= numberOfGuests) {

                const response = await axios.post('/bookings',
                    {
                        checkIn, checkOut, numberOfGuests, name, phone,
                        place: place._id,
                        price: numberOfNights * place.price,
                    });
                const bookingId = response.data._id;
                setRedirect(`/account/bookings/${bookingId}`);

            }
            else {
                alert("Insert Valid Data");
            }
        }
        else {
          alert("Login") 
        }
    }


    if (redirect) {
        return <Navigate to={redirect} />
    }




    return (
        <div className='bg-white shadow p-4 rounded-2xl '>
            <div className='text-2xl text-center'>
                Price:<b>${place.price}  /per night</b><br />
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className='  py-3 px-4 '>
                        <label >Check in:</label>
                        <input
                            className="w-full border my-2 py-2 px-3 rounded-2xl"
                            type="date"
                            value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)}
                        />
                    </div>
                    <div className=' py-3 px-4 border-l'>
                        <label >Check out:</label>
                        <input
                            className="w-full border my-2 py-2 px-3 rounded-2xl"
                            type="date"
                            value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)}
                        />
                    </div>
                </div>
                <div className=' py-3 px-4 border-l border-t'>
                    <label >Guests:</label>
                    <input
                        type="number"
                        className="w-full border my-2 py-2 px-3 rounded-2xl"
                        value={numberOfGuests}
                        onChange={ev => setNumberOfGuests(ev.target.value)}
                    />


                </div>
                {numberOfNights > 0 && (
                    <div className=' py-3 px-4 border-l border-t'>
                        <label >Your full Name :</label>
                        <input
                            type="text"
                            className="w-full border my-2 py-2 px-3 rounded-2xl"
                            value={name}
                            onChange={ev => setName(ev.target.value)}
                        />

                        <label >Your Phone No. :</label>
                        <input
                            type="tel"
                            className="w-full border my-2 py-2 px-3 rounded-2xl"
                            value={phone}
                            onChange={ev => setPhone(ev.target.value)}
                        />

                    </div>
                )}
            </div>

            <button onClick={bookThisPlace} className='bg-primary p-2 w-full text-white rounded-2xl mt-4 mb-4'>
                Book this place
                {numberOfNights > 0 && (
                    <span> ${numberOfNights * place.price}</span>
                )}
            </button>
        </div>
    )
}
