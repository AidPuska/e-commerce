import { AddShoppingCart } from '@mui/icons-material'
import React from 'react'
import { motion } from 'framer-motion'

const Product = ({ product, addToCart }) => {


    return (
        <div className='card pb-5 rounded shadow-sm shadow-black/50 bg-white w-64'>
            <img className='h-48 w-64 object-fill' src={product.image} alt="" />
            <div className="content gap-2 flex flex-col px-5 py-2">
                <div className='flex justify-between font-medium text-lg'>
                    <span>{product.name}</span>
                    <span>{product.price}KM</span>
                </div>
                <h2 className='text-sm font-light'>{product.description}</h2>
            </div>

            <div className="actions flex justify-end mt-5 mr-5">
                <motion.button className='' whileTap={{ opacity: 0, scale: 0.9 }} onClick={() => addToCart(product._id)} aria-label='Add to cart'>
                    <AddShoppingCart />
                </motion.button>
            </div>
        </div>
    )
}

export default Product