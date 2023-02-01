import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import CartItem from './CartItem'
import { motion, AnimatePresence } from 'framer-motion'

const Cart = ({ addToQuantity }) => {

    const [cart, setCart] = useState(null)

    const { data, loading, error, fetchData } = useFetch({
        url: '/api/cart/',
        method: 'get'
    })

    const removeFromCart = () => {
        fetchData()
    }

    const [total, setTotal] = useState(0)

    useEffect(() => {
        setCart(data)
    })

    useEffect(() => {
        axios.get('/api/cart/total')
            .then(res => setTotal(res.data[0].total))
    }, [cart])


    const removeAll = async () => {
        const res = await axios.put('/api/cart/removeAll')
        removeFromCart()
    }

    return (
        <div className='w-full h-screen p-20 flex flex-col justify-between'>
            {!loading ? <div className='flex flex-wrap gap-20 justify-center'>
                {cart && cart.products.map(product => (
                    <CartItem
                        key={product._id}
                        product={product}
                        removeFromCart={removeFromCart}
                        addToQuantity={addToQuantity}
                    />
                ))}
            </div>
                :
                <div>Loading...</div>}
            {cart && cart.products.length === 0 && <div>No items in cart, <Link to='/' className='text-sky-900 font-medium'>add</Link> some</div>}
            <div className='flex justify-between'>
                <p className='pb-5 text-xl border-b-2 border-sky-900 text-black w-fit p-1'>Price per product total: <span className='font-semibold'>{total && cart ? total : 0}KM</span></p>
                <motion.button whileTap={{ rotate: 45 }} onClick={removeAll} className='border-b-2 border-red-700 text-black p-1'>Remove all items</motion.button>
            </div>
        </div>
    )
}

export default Cart