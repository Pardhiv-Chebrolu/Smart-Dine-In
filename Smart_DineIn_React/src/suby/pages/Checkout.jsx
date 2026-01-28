import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaMapMarkerAlt, FaCreditCard, FaCheck } from 'react-icons/fa'
import { CartContext } from '../context/CartContext'
import TopBar from '../components/TopBar'

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useContext(CartContext)
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // 1: Address, 2: Payment, 3: Confirmation
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'card'
  })
  const [orderData, setOrderData] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateAddress = () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.pincode) {
      alert('Please fill in all address fields')
      return false
    }
    if (formData.pincode.length < 5) {
      alert('Please enter a valid pincode')
      return false
    }
    return true
  }

  const handleAddressSubmit = () => {
    if (validateAddress()) {
      setStep(2)
    }
  }

  const handlePaymentSubmit = () => {
    setLoading(true)
    // Simulate payment processing
    setTimeout(() => {
      const order = {
        orderId: `ORD${Date.now()}`,
        items: cart,
        deliveryAddress: formData,
        subtotal: getCartTotal(),
        deliveryFee: 40,
        platformFee: 5,
        total: getCartTotal() + 40 + 5,
        paymentMethod: formData.paymentMethod,
        orderTime: new Date().toLocaleString(),
        estimatedDelivery: new Date(Date.now() + 45 * 60000).toLocaleTimeString()
      }
      setOrderData(order)
      clearCart()
      setStep(3)
      setLoading(false)
    }, 2000)
  }

  const handleContinueShopping = () => {
    navigate('/')
  }

  if (cart.length === 0 && !orderData) {
    return (
      <>
        <TopBar />
        <div className="checkoutContainer">
          <div className="emptyCart">
            <h1>Your cart is empty</h1>
            <p>Please add items to your cart before checking out</p>
            <button onClick={() => navigate('/cart')} className="backBtn">
              Back to Cart
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <TopBar />
      <div className="checkoutContainer">
        {step === 3 && orderData ? (
          <div className="orderConfirmation">
            <div className="confirmationCard">
              <div className="confirmationIcon">
                <FaCheck />
              </div>
              <h1>Order Confirmed!</h1>
              <p className="confirmationMessage">Your order has been placed successfully</p>

              <div className="orderDetails">
                <div className="detailRow">
                  <span>Order ID:</span>
                  <span className="detailValue">{orderData.orderId}</span>
                </div>
                <div className="detailRow">
                  <span>Order Time:</span>
                  <span className="detailValue">{orderData.orderTime}</span>
                </div>
                <div className="detailRow">
                  <span>Estimated Delivery:</span>
                  <span className="detailValue">{orderData.estimatedDelivery}</span>
                </div>
                <div className="detailDivider"></div>
                <div className="detailRow">
                  <span>Delivery Address:</span>
                  <span className="detailValue">
                    {orderData.deliveryAddress.address}, {orderData.deliveryAddress.city}, {orderData.deliveryAddress.pincode}
                  </span>
                </div>
                <div className="detailRow">
                  <span>Payment Method:</span>
                  <span className="detailValue">{orderData.paymentMethod === 'card' ? 'Credit/Debit Card' : 'UPI'}</span>
                </div>
                <div className="detailDivider"></div>
                <div className="detailRow total">
                  <span>Total Amount:</span>
                  <span className="detailValue">₹{orderData.total.toFixed(2)}</span>
                </div>
              </div>

              <button onClick={handleContinueShopping} className="continueShoppingBtn">
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="checkoutContent">
            <div className="checkoutMain">
              <div className="checkoutHeader">
                <button onClick={() => navigate('/cart')} className="backLink">
                  <FaArrowLeft /> Back to Cart
                </button>
              </div>

              {/* Step Indicator */}
              <div className="stepIndicator">
                <div className={`step ${step >= 1 ? 'active' : ''}`}>
                  <div className="stepNumber">1</div>
                  <div className="stepLabel">Address</div>
                </div>
                <div className={`stepConnector ${step >= 2 ? 'active' : ''}`}></div>
                <div className={`step ${step >= 2 ? 'active' : ''}`}>
                  <div className="stepNumber">2</div>
                  <div className="stepLabel">Payment</div>
                </div>
              </div>

              {/* Step 1: Address */}
              {step === 1 && (
                <div className="checkoutStep">
                  <h2><FaMapMarkerAlt /> Delivery Address</h2>
                  <form className="checkoutForm">
                    <div className="formRow">
                      <div className="formGroup">
                        <label>Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className="formInput"
                        />
                      </div>
                      <div className="formGroup">
                        <label>Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          className="formInput"
                        />
                      </div>
                    </div>

                    <div className="formRow">
                      <div className="formGroup">
                        <label>Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                          className="formInput"
                        />
                      </div>
                      <div className="formGroup">
                        <label>Pincode</label>
                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          placeholder="Enter your pincode"
                          className="formInput"
                        />
                      </div>
                    </div>

                    <div className="formGroup">
                      <label>Address</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter your delivery address"
                        className="formInput"
                        rows="3"
                      />
                    </div>

                    <div className="formRow">
                      <div className="formGroup">
                        <label>City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Enter your city"
                          className="formInput"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddressSubmit}
                      className="submitBtn"
                    >
                      Continue to Payment
                    </button>
                  </form>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div className="checkoutStep">
                  <h2><FaCreditCard /> Payment Method</h2>
                  <div className="paymentMethods">
                    <label className="paymentOption">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                      />
                      <div className="paymentOptionContent">
                        <span className="paymentTitle">Credit/Debit Card</span>
                        <span className="paymentDesc">Visa, Mastercard, RuPay</span>
                      </div>
                    </label>

                    <label className="paymentOption">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={handleInputChange}
                      />
                      <div className="paymentOptionContent">
                        <span className="paymentTitle">UPI</span>
                        <span className="paymentDesc">Google Pay, PhonePe, Paytm</span>
                      </div>
                    </label>
                  </div>

                  <div className="deliverySummary">
                    <h3>Delivery To:</h3>
                    <p>{formData.fullName}</p>
                    <p>{formData.address}, {formData.city}, {formData.pincode}</p>
                    <p>Phone: {formData.phone}</p>
                  </div>

                  <button
                    type="button"
                    onClick={handlePaymentSubmit}
                    disabled={loading}
                    className="submitBtn"
                  >
                    {loading ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="checkoutSummary">
              <h3>Order Summary</h3>
              <div className="summaryItems">
                {cart.map(item => (
                  <div key={`${item.productId}-${item.firmId}`} className="summaryItem">
                    <div>
                      <p className="itemName">{item.productName}</p>
                      <p className="itemQty">Qty: {item.quantity}</p>
                    </div>
                    <p className="itemPrice">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="summaryDivider"></div>

              <div className="summaryRow">
                <span>Subtotal:</span>
                <span>₹{getCartTotal().toFixed(2)}</span>
              </div>
              <div className="summaryRow">
                <span>Delivery Fee:</span>
                <span>₹40</span>
              </div>
              <div className="summaryRow">
                <span>Platform Fee:</span>
                <span>₹5</span>
              </div>

              <div className="summaryDivider"></div>

              <div className="summaryRow total">
                <span>Total:</span>
                <span>₹{(getCartTotal() + 40 + 5).toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Checkout
