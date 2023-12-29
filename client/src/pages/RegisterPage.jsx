

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function registerUser(ev) {
        ev.preventDefault();
        if (password.length > 7 && /[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        try {
            const response = await axios.post("/register", {
                name,
                email,
                password,
            });

            // Check for success status (status code 200)
            if (response.status === 200) {
                alert('Registration Successful');
            } else {
                // Handle other status codes (e.g., 422 for failure)
                alert('Registration Failed: ' + response.data.error);
            }
        } catch (e) {
            console.error('Registration error:', e);
            alert('Registration Failed: Please try again later');
        }
    }
    else {
        alert('Password must be greater than 7 characters and contain at least one special character');
      }
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto " onSubmit={registerUser}>
                    <input
                        type="text"
                        className="w-full border my-2 py-2 px-3 rounded-2xl"
                        placeholder="Name"
                        value={name}
                        onChange={(ev) => setName(ev.target.value)}
                    />
                    <input
                        className="w-full border my-2 py-2 px-3 rounded-2xl"
                        type="email"
                        placeholder="Your@email.com"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                    />
                    <input
                        className="w-full border my-2 py-2 px-3 rounded-2xl"
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(ev) => setPassword(ev.target.value)}
                    />
                    <button className="bg-primary p-2 w-full text-white rounded-2xl">Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Already a member?
                        <Link className="text-black underline" to={'/login'}> Login now</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
