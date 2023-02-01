import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(name, password)
        const res = await axios.post('/api/auth/login', {
            username: name,
            password
        }, { withCredentials: true })
        window.location.reload();
    }

    return (
        <div className='w-full h-screen items-center flex justify-center'>
            <form className='flex mt-20 flex-col gap-5 shadow-md shadow-black/50 py-5 px-10' onSubmit={handleSubmit}>
                <h1 className='text-2xl font-bold'>Signup</h1>
                <label className='flex flex-col'>
                    <span>Username:</span>
                    <input
                        type="text"
                        name='username'
                        placeholder='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='bg-gray-200 p-1 rounded text-black' />
                </label>

                <label className='flex flex-col'>
                    <span>Password:</span>
                    <input
                        type="password"
                        name='password'
                        placeholder='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-gray-200 p-1 rounded text-black' />
                </label>
                <button className='w-full bg-sky-900 p-1 text-white'>Signup</button>

                <p className='text-center border border-black rounded-full'>OR</p>

                <p className='w-full bg-blue-600 rounded p-1 text-center text-white'>Login with Facebook</p>
                <p className='w-full bg-black rounded p-1 text-center text-white'>Login with Github</p>

                <form action="http://localhost:8080/api/auth/google" method='get'>
                    <button className='w-full bg-red-600 rounded p-1 text-center text-white cursor-pointer'>Login with Google</button>
                </form>


            </form>
        </div>
    )
}

export default Signup