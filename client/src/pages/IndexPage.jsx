
import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function IndexPage() {
    const [places, setPlaces] = useState([]);
    const [visiblePlaces, setVisiblePlaces] = useState(12);

    useEffect(() => {
        axios.get('/places').then((response) => {
            setPlaces(response.data);
        });
    }, []);

    const handleShowMore = () => {
        // Increase the number of visible places
        setVisiblePlaces((prevCount) => prevCount + 6); 
    };

    return (<>
        <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 && places.slice(0, visiblePlaces).map(place => (
                <Link to={`/place/${place._id}`} key={place._id}>
                    <div className="bg-gray-300 rounded-2xl flex mb-2">
                        {place.photos?.[0] && (
                            <img className="rounded-2xl object-cover aspect-square" src={'https://airbnbclone-noku.onrender.com/uploads/' + place.photos?.[0]} alt="" />
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
        {visiblePlaces < places.length && (
                <div className="flex flex-col justify-center items-center">
                    <div className="m-3 font-bold">
                        Continue exploring
                    </div>
                    <div className="bg-black rounded-xl text-white mb-3 w-full text-center cursor-pointer" onClick={handleShowMore}>
                        Show more
                    </div>
                    <div className="w-full h-5 bg-white">

                    </div>
                </div>
            )}
        </>
    );
}
