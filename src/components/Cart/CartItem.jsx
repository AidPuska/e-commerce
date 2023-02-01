import axios from 'axios'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CartItem = ({ product, removeFromCart, addToQuantity }) => {


    const remove = async () => {
        const res = await axios.put('/api/cart/', {
            productId: product.itemId
        })
        removeFromCart()
    }

    const add = () => {
        addToQuantity(product._id, true)
        setTimeout(() => {
            removeFromCart()
        }, 50)
    }

    const minus = () => {
        addToQuantity(product._id, false)
        setTimeout(() => {
            // removefromcart but it use - 1, removeFromCart() only fetch data again
            removeFromCart()
        }, 100)
    }

    return (
        <div className='shadow-md shadow-black/50 mb-10'>
            <img className='w-48 h-48' src={product.image} alt="" />
            <div className='my-5 mx-5 flex justify-between'>
                <p className=' font-semibold'>{product.name}</p>
                <p className='font-semibold'>{product.price}KM</p>
            </div>

            <div className='mx-5 mb-5 flex justify-between'>
                <button disabled={product.quantity === 1} onClick={minus} className='cursor-pointer'>-</button>
                {product.quantity}
                <button className='cursor-pointer' onClick={add}>+</button>

                <button onClick={remove} className='bg-sky-900 text-white p-1 rounded'>Remove item</button>
            </div>
        </div>
    )
}

export default CartItem