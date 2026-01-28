import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import '../styles/Auth.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)
    
    // Simulate login - Replace with actual API call
    setTimeout(() => {
      console.log('Login attempt:', { email, password })
      // For demo: store user info and redirect
      localStorage.setItem('user', JSON.stringify({ email, loginTime: new Date() }))
      navigate('/')
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="authContainer">
      <div className="authWrapper">
        <div className="authBox">
          <h1 className="authTitle">Welcome Back</h1>
          <p className="authSubtitle">Login to your Smart Dine-in account</p>

          {error && <div className="authError">{error}</div>}

          <form onSubmit={handleSubmit} className="authForm">
            <div className="formGroup">
              <label htmlFor="email">Email Address</label>
              <div className="inputWrapper">
                <FaEnvelope className="inputIcon" />
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <div className="rememberForgot">
              <label className="rememberMe">
                <input type="checkbox" />
                Remember me
              </label>
              <Link to="#" className="forgotPassword">Forgot Password?</Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="authButton"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <Link to="/signup" className="authToggle">
            Create a new account
          </Link>
        </div>

        <div className="authImage">
          <div className="imageContent">
            <h2>Smart Dine-in</h2>
            <p>Order your favorite food online</p>
            <div className="featuresList">
              <div className="feature">✓ Fast Delivery</div>
              <div className="feature">✓ Quality Food</div>
              <div className="feature">✓ Best Prices</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
