import React from 'react'
import LandingPage from './suby/pages/LandingPage'
import Login from './suby/pages/Login'
import SignUp from './suby/pages/SignUp'
import RestaurantsByItem from './suby/pages/RestaurantsByItem'
import Cart from './suby/pages/Cart'
import Checkout from './suby/pages/Checkout'
import { Routes, Route } from 'react-router-dom'

import './App.css'
import ProductMenu from './suby/components/ProductMenu'
import { CartProvider } from './suby/context/CartContext'

const App = () => {
  return (
    <CartProvider>
      <div>
        <Routes>
            <Route path='/' element = { <LandingPage />} />
            <Route path='/login' element = { <Login />} />
            <Route path='/signup' element = { <SignUp />} />
            <Route path='/restaurants-by-item/:itemId/:itemName' element = { <RestaurantsByItem />} />
            <Route path='/products/:firmId/:firmName' element = {<ProductMenu />} />
            <Route path='/cart' element = { <Cart />} />
            <Route path='/checkout' element = { <Checkout />} />
        </Routes>
      
      </div>
    </CartProvider>
  )
}

export default App