


import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from 'axios';
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";


export default function ProfilePage() {
  const { setUser,setReady } = useContext(UserContext);
  const { ready, user } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = 'profile';
  }

  // function linkClasses(type = null) {
  //   let classes = 'inline-flex gap-1 py-2 px-6';
  //   if (type === subpage) {
  //     classes += ' bg-primary text-white rounded-full';
  //   }else{
  //       classes += ' bg-gray-100'
  //   }

  //   return classes;
  // }

  useEffect(() => {
    if (redirect) {
      // Redirect after state update
      setRedirect(null); // Reset redirect state
    }
  }, [redirect]);

  async function logout() {
    try {
      await axios.post('/logout');
      setUser(null);
      setReady(false)
      setRedirect('/');
      alert("You have logged out successfully");
    } catch (error) {
      console.error('Logout failed', error);
      // Optionally: Handle the error (e.g., display an error message)
    }
  }

  if (!ready) {
    return 'Loading...';
  }

 if(redirect){
        return <Navigate to={redirect}/>
    }

  if (ready && !user ) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div>
      <AccountNav/>
      {subpage === 'profile' && user && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} <br />Email: {user.email}<br />
          <button
            onClick={logout}
            className="bg-primary p-2 w-full text-white rounded-2xl max-w-sm mt-2"
          >
            Logout
          </button>
        </div>
      )}
      {subpage === 'places' && <PlacesPage />}
    </div>
  );
}
