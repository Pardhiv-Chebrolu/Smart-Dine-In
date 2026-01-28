import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSearch, FaImage, FaUser, FaSignOutAlt, FaShoppingCart } from 'react-icons/fa'
import { API_URL } from '../api'
import { CartContext } from '../context/CartContext'

const TopBar = ({ onSearch, searchResults }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [user, setUser] = useState(null)
  const { getCartCount } = useContext(CartContext)
  const navigate = useNavigate()
  const cartCount = getCartCount()

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleSearchChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    if (onSearch) {
      onSearch(query)
    }
  }

  const handleSearchFocus = () => {
    setIsSearchActive(true)
  }

  const handleSearchBlur = () => {
    setTimeout(() => setIsSearchActive(false), 200)
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    if (onSearch) {
      onSearch('')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    navigate('/')
  }

  return (
    <>
      <section className="topBarSection">
        <div className="companyTitle">
          <Link to='/' className='link'>
            <h2>Smart Dine-in</h2>
          </Link>
        </div>
        <div className="searchBar">
          <div className="searchInputWrapper">
            <FaSearch className="searchIcon" />
            <input 
              type="text" 
              placeholder='Search restaurants, cuisines, items...' 
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              className="searchInput"
            />
            {searchQuery && (
              <button 
                className="clearBtn" 
                onClick={handleClearSearch}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          
          {isSearchActive && searchResults && searchResults.length > 0 && (
            <div className="searchDropdown">
              {searchResults.slice(0, 5).map((result) => (
                <Link 
                  key={result._id} 
                  to={`/products/${result._id}/${result.firmName}`}
                  className="searchResultItem"
                  onClick={() => {
                    setSearchQuery('')
                    setIsSearchActive(false)
                  }}
                >
                  <div className="searchResultImage">
                    {result.image ? (
                      <img 
                        src={`${API_URL}/uploads/${result.image}`} 
                        alt={result.firmName}
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextElementSibling.style.display = 'flex'
                        }}
                      />
                    ) : null}
                    <div className="noImagePlaceholder" style={result.image ? { display: 'none' } : { display: 'flex' }}>
                      <FaImage className="noImageIcon" />
                    </div>
                  </div>
                  <div className="resultInfo">
                    <p className="firmName">{result.firmName}</p>
                    <p className="firmArea">{result.area || 'Area'}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="topBarRight">
          <Link to="/cart" className="cartIcon" title="Shopping Cart">
            <FaShoppingCart />
            {cartCount > 0 && <span className="cartBadge">{cartCount}</span>}
          </Link>
          <div className="userAuth">
            {user ? (
              <div className="userMenu">
                <div className="userGreeting">
                  <FaUser className="userIcon" />
                  <span>{user.fullName || user.email}</span>
                </div>
                <button onClick={handleLogout} className="logoutBtn">
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="authLink">Login</Link>
                <span className="authDivider">|</span>
                <Link to="/signup" className="authLink">SignUp</Link>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default TopBar