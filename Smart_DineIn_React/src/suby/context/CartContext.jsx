import React, { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage on initial render
    try {
      const savedCart = localStorage.getItem('smartDineCart')
      return savedCart ? JSON.parse(savedCart) : []
    } catch (error) {
      console.error('Error loading cart from localStorage:', error)
      return []
    }
  })

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('smartDineCart', JSON.stringify(cart))
    } catch (error) {
      console.error('Error saving cart to localStorage:', error)
    }
  }, [cart])

  const addToCart = (product, firmId, firmName, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(
        item => item._id === product._id && item.firmId === firmId
      )

      if (existingItem) {
        return prevCart.map(item =>
          item._id === product._id && item.firmId === firmId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }

      return [...prevCart, { ...product, firmId, firmName, quantity }]
    })
  }

  const removeFromCart = (productId, firmId) => {
    setCart(prevCart =>
      prevCart.filter(item => !(item._id === productId && item.firmId === firmId))
    )
  }

  const updateQuantity = (productId, firmId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, firmId)
      return
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item._id === productId && item.firmId === firmId
          ? { ...item, quantity }
          : item
      )
    )
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartByFirm = () => {
    const firmMap = {}
    cart.forEach(item => {
      if (!firmMap[item.firmId]) {
        firmMap[item.firmId] = {
          firmId: item.firmId,
          firmName: item.firmName,
          items: []
        }
      }
      firmMap[item.firmId].items.push(item)
    })
    return Object.values(firmMap)
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartCount,
    clearCart,
    getCartByFirm
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
