import React, { useEffect, useState } from 'react'
import Product from './Product/Product'
import axios from 'axios'
import useFetch from '../../hooks/useFetch'

const Products = ({ addToCart }) => {

    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    const [products, setProducts] = useState([])

    const { data, loading, error, fetchData } = useFetch({
        url: `/api/products?page=${page}`,
        method: 'get'
    })

    useEffect(() => {
        if (data) {
            setProducts(data.products)
            setPageCount(data.pagination.pageCount)
        }
    }, [data])

    const handlePrevious = () => {
        setPage(prev => {
            if (prev === 1) return prev;
            return prev - 1;
        })
    }

    const handleNext = () => {
        if (page !== pageCount) {
            setPage(prev => prev + 1)
            //fetchData()
        }
    }

    return (
        <main className='pt-20 pb-5 bg-gray-100'>
            {!loading ? <div className="products flex items-center justify-center px-10 gap-5 flex-wrap">
                {products && products.map(product => (
                    <div key={product.id} className="product">
                        <Product addToCart={addToCart} product={product} />
                    </div>
                ))}

            </div> : <div>Loading...</div>}
            <div className="buttons flex gap-5 justify-center mt-10">
                <button disabled={page === 1} onClick={handlePrevious}>Previous</button>
                <p>{page}/{pageCount}</p>
                <button disabled={page === pageCount} onClick={handleNext}>Next</button>
            </div>
        </main>
    )
}

export default Products