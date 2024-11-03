"use client"

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import setAuthToken from "../../utils/setAuthToken";
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie

export default function Login() {
    //Tailwind CSS Presets
    let inputName = "text-sm text-black"
    let inputField = `w-full h-[32px] rounded pl-2 text-black bg-white border-2 focus:border-teal-600 focus:outline-none hover:bg-inputHoverBg focus:bg-inputHoverBg`

    const router = useRouter()
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');

    const client = axios.create({
        baseURL: process.env.NEXT_PUBLIC_SERVER_URL
    });

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await client.post('/admin/login', { user, password });
            console.log('Response: ', response);
            // Directly access the token from response.data
            const { token } = response.data;
            if (token) {
                localStorage.setItem('adminToken', token); // Save the token
                setAuthToken(response.data.token);
                Cookies.set('adminToken', token); // Set token in cookies with expiry of 1 day
                router.push('/admin/dashboard');
            } else {
                // Handle case where response is successful but no token is returned
                alert('Login successful but no token received');
            }
        } catch (error) {
            setPassword("")
            // Handle HTTP error responses (status code outside 2xx)
            if (error.response) {
                console.log(error.response.data);
                alert(`Login failed: ${error.response.data.message || 'Unknown error'}`);
            } else if (error.request) {
                console.log(error.request);
                alert('No response from server');
            } else {
                alert('Error', error.message);
            }
        }
    };


    return (
        <main className="flex items-center justify-center h-[100vh] bg-pageGrey">
            <div className='translate-y[5vh] w-full h-[50vh] Tablet:w-[45vw] Laptop:w-[35vw] Monitor:w-[25vw] h-[60vh] bg-white rounded-md flex flex-col items-center px-3'>
                <div className="text-3xl Mobile-L:text-4xl text-black font-bold pt-10">218 Admin Panel</div>
                <form onSubmit={handleLogin} className="flex flex-col h-full w-full justify-center items-center max-w-[250px] Mobile-L:max-w-[300px]">
                    <div className="flex flex-col gap-2 items-start w-full">
                        <p className={`${inputName}`}>Username</p>
                        <input value={user} onChange={(e) => setUser(e.target.value)} className={`${inputField} border-inputBorder`}></input>
                    </div>
                    <div className="flex flex-col gap-2 items-start w-full mt-4">
                        <p className={`${inputName}`}>Password</p>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={`${inputField} border-inputBorder`}></input>
                    </div>
                    <button type="submit" className='w-full mt-8 text-lg focus:outline-none flex justify-center py-3 rounded font-semibold cursor-pointer bg-progressBarComplete text-white'>Login</button>
                </form>
            </div>
        </main>
    )
}