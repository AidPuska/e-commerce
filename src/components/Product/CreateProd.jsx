import axios from 'axios'
import React, { useState } from 'react'
import useFetch from '../../hooks/useFetch'

const CreateProd = () => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState(Number)

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(name, description, price, image)
        await axios.post('/api/create/', {
            url: '/api/create/',
            method: 'post',
            body: {
                name,
                description,
                price,
                image
            }
        }, { withCredentials: true })
    }

    return (
        <div className='w-full h-screen flex justify-center pt-20'>
            <form className='flex flex-col w-fit items-center' onSubmit={handleSubmit}>
                <input className='bg-gray-200 p-1 rounded m-1' onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='name' />
                <textarea className='bg-gray-200 p-1 rounded m-1' onChange={(e) => setDescription(e.target.value)} value={description} type="text" placeholder='description' />
                <input className='bg-gray-200 p-1 rounded m-1' onChange={(e) => setPrice(e.target.value)} value={price} type="number" placeholder='price' />
                <input className='bg-gray-200 p-1 rounded m-1' onChange={(e) => setImage(e.target.value)} value={image} type="text" placeholder='image url' />

                <button className='bg-sky-900 p-1 rounded text-white w-full'>Add product</button>
            </form>
        </div>
    )
}

export default CreateProd