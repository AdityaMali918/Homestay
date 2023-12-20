

import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const UserContext = createContext({ user: null, setUser: () => {} });

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready,setReady] = useState(false);

    useEffect(() => {
        if (!user) {
            axios.get('https://airbnbclone-j4qe.onrender.com/profile')
                .then(({ data }) => {
                    setUser(data);
                    setReady(true);
                })
                .catch(error => {
                    console.error('Error fetching user profile:', error);
                    setUser(null);
                });
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser,ready }}>
            {children}
        </UserContext.Provider>
    );
}
