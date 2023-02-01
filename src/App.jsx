import { useEffect, useState } from "react"
import Cart from "./components/Cart/Cart"
import Navbar from "./components/Navbar/Navbar"
import Products from "./components/Products/Products"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Signup from "./components/Signup/Signup"
import axios from "axios"
import useFetch from "./hooks/useFetch"
import CreateProd from "./components/Product/CreateProd"

function App() {


  //const [products, setProducts] = useState([])
  const [cart, setCart] = useState(null)
  const [user, setUser] = useState(null)
  //const [loading, setLoading] = useState(false)


  useEffect(() => {
    const getUser = async () => {
      //setLoading(true)

      const foundUser = await axios.get('/api/auth/login/success', { withCredentials: true })
      console.log(foundUser)
      setUser(foundUser.data.user)

      //setLoading(false)
    }

    return () => getUser()
  }, [])

  const { data, loading, fetchData } = useFetch({
    url: '/api/cart/',
    method: 'get'
  })

  let len = null;

  useEffect(() => {
    setCart(data)
  }, [data])

  if (cart) {
    let totalQuan = []
    cart.products.forEach(prod => {
      totalQuan.push(prod.quantity)
    }, 0)
    let tot = totalQuan.reduce((sum, current) => {
      return sum + current;
    }, 0)
    console.log(tot)
    len = tot

  }

  const addToCart = async (id) => {
    const res = await axios.post('/api/cart/', {
      productId: id
    }, { withCredentials: true })
    fetchData()
  }

  const addToQuantity = async (id, method) => {
    const res = await axios.put('/api/cart/quantity', {
      productId: id,
      method: method
    }, { withCredentials: true })
    fetchData()
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar len={len} />
        <Routes>
          {/* {user && <>
            <Route path="/" element={!user ? <Navigate to='/signup' /> : <Products addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart addToQuantity={addToQuantity} />} />
            <Route path="/create" element={<CreateProd />} />
          </>
          } */}

          {user && <>
            <Route path="/" element={!user ? <Navigate to='/signup' /> : <Products addToCart={addToCart} />} />
            <Route path="/cart" element={!user ? <Navigate to='/signup' /> : <Cart addToQuantity={addToQuantity} />} />
            <Route path="/create" element={!user ? <Navigate to='/signup' /> : <CreateProd />} />
          </>
          }
          <Route path="/signup" element={user ? <Navigate to='/' /> : <Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
