import { ShoppingCart } from '@mui/icons-material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

import logo from '../../assets/icon.png'
import useFetch from '../../hooks/useFetch'

const Navbar = ({ len }) => {

    const location = useLocation()
    const [user, setUser] = useState(null)
    //const [cart, setCart] = useState(null)
    //const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log('cart fomr nav:', len)
        const getUser = async () => {
            //setLoading(true)
            const foundUser = await axios.get('/api/auth/login/success', { withCredentials: true })
            setUser(foundUser.data.user)
            //setLoading(false)
        }
        /* const getCart = async () => {
            setLoading(true)
            const res = await axios.get('/api/cart/', { withCredentials: true });
            setCart(res.data)
            setLoading(false)
        } */

        getUser()
        //getCart()
    }, [])

    /* const { data } = useFetch({
        url: '/api/cart/',
        method: 'get'
    }) */


    const logout = () => {
        window.open('http://localhost:8080/api/auth/logout', '_self')
    }

    return (
        <>
            <div className="nav w-full px-5 py-3 bg-white flex justify-between fixed border-b border-black/25">
                <Link to='/' className="toolBar flex items-center gap-5">
                    <img src={logo} alt="" className='h-7' />
                    <p>E-commerce</p>
                </Link>

                {user && <div className='flex gap-5'>
                    {user.username}
                    <img className='w-7 h-7' src={user.picture} alt="" />
                    <button onClick={logout} className='mr-5 bg-sky-900 px-1 rounded text-white'>Logout</button>
                </div>}

                {location.pathname === '/' && <div className="buttons relative">
                    <Link to='/cart' aria-label='Show cart items'>
                        {!user
                            ?
                            <NavLink className='mr-5' to='/signup' >Login</NavLink>
                            :
                            <>
                            </>

                        }
                        <ShoppingCart />
                        <span className='absolute right-[0.5px] top-0 bg-red-600 text-white px-1 rounded-full text-xs'>{len}</span>
                    </Link>
                </div>}
            </div>
        </>
    )
}

export default Navbar