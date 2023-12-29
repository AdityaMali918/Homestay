import React, { useState, useEffect } from "react";
import * as Realm from "realm-web";
import { Link } from "react-router-dom";

export default function SearchPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    const fetchData = async () => {
      const REAL_APP_ID = "products-ndbcu";
      const app = new Realm.App({ id: REAL_APP_ID });
      const credentials = Realm.Credentials.anonymous();

      try {
        const user = await app.logIn(credentials);
        const searchplace = await user.functions.searchPlaces(search);
        console.log(searchplace);
        setProducts(searchplace);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Invoke the async function directly

    // No need to return a cleanup function if there's nothing to clean up
  }, [search]); // Empty dependency array to run the effect only once

  return (
    <>
      <form onSubmit={handleSubmit} className="py-3 flex justify-center item-center m-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" border my-2 py-2 px-3 rounded-2xl w-96 m-3"
          placeholder="search"
        />
        <button className="bg-primary p-2  text-white rounded-full w-auto mr-3"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
</button>
      </form>
      <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.length > 0 && products.map(place => (
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
    </>
  );
}
