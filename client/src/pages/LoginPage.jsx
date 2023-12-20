
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from "../UserContext";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUser } = React.useContext(UserContext);

    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
            const { data } = await axios.post('/login', { email, password },);
            setUser(data);
            alert('Login Successful');
            setRedirect(true);
        } catch (e) {
            alert('Login Failed');
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />;
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form onSubmit={handleLoginSubmit} className="max-w-md mx-auto ">
                    <input
                        className="w-full border my-2 py-2 px-3 rounded-2xl"
                        type="email"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                        placeholder="Your@email.com"
                    />
                    <input
                        className="w-full border my-2 py-2 px-3 rounded-2xl"
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(ev) => setPassword(ev.target.value)}
                    />
                    <button className="bg-primary p-2 w-full text-white rounded-2xl">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account yet?
                        <Link to={'/register'} className="text-black underline"> Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
