import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash } from 'react-icons/fa'
import '../styles/Auth.css'

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.phone.length < 10) {
      setError('Please enter a valid phone number')
      return
    }

    setLoading(true)

    // Simulate signup - Replace with actual API call
    setTimeout(() => {
      console.log('Signup attempt:', formData)
      // Store user info and redirect to login
      localStorage.setItem('user', JSON.stringify({ 
        fullName: formData.fullName,
        email: formData.email, 
        phone: formData.phone,
        signupTime: new Date() 
      }))
      navigate('/login')
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="authContainer">
      <div className="authWrapper signupWrapper">
        <div className="authBox signupBox">
          <h1 className="authTitle">Create Account</h1>
          <p className="authSubtitle">Join Smart Dine-in and order delicious food</p>

          {error && <div className="authError">{error}</div>}

          <form onSubmit={handleSubmit} className="authForm">
            <div className="formGroup">
              <label htmlFor="fullName">Full Name</label>
              <div className="inputWrapper">
                <FaUser className="inputIcon" />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="authInput"
                />
              </div>
            </div>

            <div className="formGroup">
              <label htmlFor="email">Email Address</label>
              <div className="inputWrapper">
                <FaEnvelope className="inputIcon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="authInput"
                />
              </div>
            </div>

            <div className="formGroup">
              <label htmlFor="phone">Phone Number</label>
              <div className="inputWrapper">
                <FaPhone className="inputIcon" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="authInput"
                />
              </div>
            </div>

            <div className="formGroup">
              <label htmlFor="password">Password</label>
              <div className="inputWrapper">
                <FaLock className="inputIcon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  className="authInput"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="togglePassword"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="formGroup">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="inputWrapper">
                <FaLock className="inputIcon" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="authInput"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="togglePassword"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="termsCheckbox">
              <label>
                <input type="checkbox" required />
                I agree to the Terms & Conditions
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="authButton"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <Link to="/login" className="authToggle">
            Login to your account
          </Link>
        </div>

        <div className="authImage">
          <div className="imageContent">
            <h2>Smart Dine-in</h2>
            <p>Discover amazing restaurants near you</p>
            <div className="featuresList">
              <div className="feature">✓ Easy Registration</div>
              <div className="feature">✓ Secure Payment</div>
              <div className="feature">✓ Track Orders</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
