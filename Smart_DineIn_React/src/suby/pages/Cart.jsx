import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaMinus, FaPlus, FaTrash, FaArrowLeft } from 'react-icons/fa'
import { CartContext } from '../context/CartContext'
import TopBar from '../components/TopBar'
import { API_URL } from '../api'
import '../styles/Cart.css'

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart, getCartByFirm } = useContext(CartContext)
  const navigate = useNavigate()

  const cartByFirm = getCartByFirm()
  const subtotal = getCartTotal()
  const deliveryFee = 40
  const platformFee = 5
  const total = subtotal + deliveryFee + platformFee

  const handleQuantityChange = (productId, firmId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change
    if (newQuantity > 0) {
      updateQuantity(productId, firmId, newQuantity)
    }
  }

  if (cart.length === 0) {
    return (
      <div>
        <TopBar />
        <div style={{ marginTop: '80px', padding: '40px 20px', textAlign: 'center', minHeight: '80vh' }}>
          <h2>Your Cart is Empty</h2>
          <p>Start adding items to your cart!</p>
          <button 
            onClick={() => navigate('/')}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#ff6b35',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <TopBar />
      <div className="cartContainer">
        <div className="cartHeader">
          <button className="backButton" onClick={() => navigate('/')}>
            <FaArrowLeft /> Back
          </button>
          <h1>Your Cart</h1>
        </div>

        <div className="cartContent">
          <div className="cartItems">
            {cartByFirm.map(firm => (
              <div key={firm.firmId} className="firmSection">
                <h3 className="firmName">{firm.firmName}</h3>
                {firm.items.map(item => (
                  <div key={`${item._id}-${firm.firmId}`} className="cartItem">
                    <div className="itemImage">
                      <img 
                        src={`${API_URL}/uploads/${item.image}`} 
                        alt={item.productName}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/80?text=No+Image'
                        }}
                      />
                    </div>
                    <div className="itemDetails">
                      <h4>{item.name}</h4>
                      <p className="itemPrice">₹{item.price}</p>
                    </div>
                    <div className="quantityControl">
                      <button 
                        className="quantityBtn"
                        onClick={() => handleQuantityChange(item._id, firm.firmId, item.quantity, -1)}
                      >
                        <FaMinus />
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="quantityBtn"
                        onClick={() => handleQuantityChange(item._id, firm.firmId, item.quantity, 1)}
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <div className="itemTotal">
                      ₹{item.price * item.quantity}
                    </div>
                    <button 
                      className="removeBtn"
                      onClick={() => removeFromCart(item._id, firm.firmId)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="cartSummary">
            <h3>Order Summary</h3>
            <div className="summaryRow">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="summaryRow">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>
            <div className="summaryRow">
              <span>Platform Fee</span>
              <span>₹{platformFee}</span>
            </div>
            <div className="summaryTotal">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <button 
              className="checkoutBtn"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>
            <button 
              className="clearCartBtn"
              onClick={() => {
                if (window.confirm('Are you sure you want to clear your cart?')) {
                  clearCart()
                }
              }}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
