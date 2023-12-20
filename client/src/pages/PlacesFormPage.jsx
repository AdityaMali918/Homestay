import PhotoUploader from "../PhotoUploader";
import Perks from "../Perks";
import { useEffect, useState } from "react";
import axios from 'axios';
import AccountNav from "../AccountNav";
import { Link, useParams, Navigate } from "react-router-dom";

export default function PlacesFormPage() {
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState(false);
    const [price,setPrice]=useState(100);
    const { id } = useParams();
    console.log({ id });

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('http://localhost:4000/places/' + id).then(response => {
            const { data } = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        })
    }, [id]);

    function inputHeader(text) {
        return (<h2 className="text-2xl mt-4">{text}</h2>);
    }

    function inputDescription(text) {
        return (<p className="text-gray-500 text-sm">{text}</p>);
    }

    function preInput(header, descrip) {
        return (<>
            {inputHeader(header)}
            {inputDescription(descrip)}
        </>);
    }

    async function savePlace(ev) {
        ev.preventDefault();
        const placeData={ title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests,price}

        if (id) {

            await axios.put('/places', {
             id,...placeData
            });
            setRedirect(true);

        } else {
            //new place
            if (title && addedPhotos && address && checkIn) {
                await axios.post('/places', placeData);
                setRedirect(true);
            }
            else {
                alert('Enter every details');
            }
        }
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <>
            <div>
                <AccountNav />
                <form onSubmit={savePlace}>
                    {preInput('Title', 'Title/heading for your place')}
                    <input type="text" className="w-full border my-2 py-2 px-3 rounded-2xl" placeholder="title, for example: My lovely Apt"
                        value={title}
                        onChange={(ev) => setTitle(ev.target.value)} />
                    {preInput('Address', 'Address to this plac')}
                    <input type="text" className="w-full border my-2 py-2 px-3 rounded-2xl" placeholder="address"
                        value={address}
                        onChange={(ev) => setAddress(ev.target.value)} />
                    {preInput('Photos', 'more=better')}
                    <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                    {preInput('Description', 'Description of place')}
                    <textarea
                        value={description}
                        onChange={(ev) => setDescription(ev.target.value)}
                        className="w-full h-200px border my-2 py-2 px-3 rounded-2xl" cols="30" rows="8" />
                    {preInput('Perks', 'Select all the perks of your place')}
                    <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                        <Perks selected={perks} onChange={setPerks} />
                    </div>
                    {preInput('Extra Info', 'House rule ,etc')}
                    <textarea
                        value={extraInfo}
                        onChange={(ev) => setExtraInfo(ev.target.value)}
                        className="w-full h-200px border my-2 py-2 px-3 rounded-2xl" cols="30" rows="8" />
                    {preInput('Check in&out times', 'add check in and check out time ')}
                    <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                        <div className="mt-2 -mb-1">
                            <h3>Check in time</h3>
                            <input type="text" placeholder="14:00"
                                className="w-full border my-2 py-2 px-3 rounded-2xl"
                                value={checkIn}
                                onChange={(ev) => setCheckIn(ev.target.value)} />
                        </div>
                        <div className="mt-2 -mb-1">
                            <h3>Check out time</h3>
                            <input type="text" placeholder="12:00"
                                className="w-full border my-2 py-2 px-3 rounded-2xl"
                                value={checkOut}
                                onChange={(ev) => setCheckOut(ev.target.value)} />
                        </div>
                        <div className="mt-2 -mb-1">
                            <h3>Max number of guests</h3>
                            <input type="number" placeholder="4"
                                className="w-full border my-2 py-2 px-3 rounded-2xl"
                                value={maxGuests}
                                onChange={(ev) => setMaxGuests(ev.target.value)} />
                        </div>
                        <div className="mt-2 -mb-1">
                            <h3>Price per night</h3>
                            <input type="number" placeholder="4"
                                className="w-full border my-2 py-2 px-3 rounded-2xl"
                                value={price}
                                onChange={(ev) => setPrice(ev.target.value)} />
                        </div>
                    </div>
                    <button className="bg-primary p-2 w-full text-white rounded-2xl my-4">Save</button>
                </form>
            </div>
        </>
    )
}