import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { API_URL } from '../api'
import TopBar from '../components/TopBar'

const RestaurantsByItem = () => {
  const { itemId, itemName } = useParams()
  const [allVendors, setAllVendors] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAllVendors()
  }, [])

  const fetchAllVendors = async () => {
    try {
      const response = await fetch(`${API_URL}/vendor/all-vendors?order=desc`)
      const data = await response.json()
      if (data.vendors) {
        const flatVendors = data.vendors.flatMap(vendor => vendor.firm)
        setAllVendors(flatVendors)
      }
      setLoading(false)
    } catch (error) {
      console.error("Failed to fetch vendors", error)
      setLoading(false)
    }
  }

  const handleSearch = (query) => {
    if (query.trim() === '') {
      setSearchResults([])
      return
    }

    const filtered = allVendors.filter(vendor =>
      vendor.firmName.toLowerCase().includes(query.toLowerCase()) ||
      (vendor.area && vendor.area.toLowerCase().includes(query.toLowerCase()))
    )
    
    setSearchResults(filtered)
  }

  return (
    <>
      <TopBar onSearch={handleSearch} searchResults={searchResults} />
      <div className="itemRestaurantsContainer">
        <div className="itemRestaurantsHeader">
          <Link to="/" className="backButton">
            <FaArrowLeft /> Back
          </Link>
          <h1>Restaurants serving <span className="highlightedItem">{itemName}</span></h1>
        </div>

        {loading ? (
          <div className="loadingContainer">
            <p>Loading restaurants...</p>
          </div>
        ) : allVendors.length > 0 ? (
          <div className="itemRestaurantsGrid">
            {allVendors.map((vendor) => (
              <Link 
                to={`/products/${vendor._id}/${vendor.firmName}`}
                key={vendor._id}
                className="restaurantCard"
              >
                <div className="restaurantImageWrapper">
                  {vendor.image ? (
                    <img 
                      src={`${API_URL}/uploads/${vendor.image}`}
                      alt={vendor.firmName}
                      className="restaurantImage"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextElementSibling.style.display = 'flex'
                      }}
                    />
                  ) : null}
                  <div 
                    className="noImagePlaceholderItem"
                    style={vendor.image ? { display: 'none' } : { display: 'flex' }}
                  >
                    <span>No Image</span>
                  </div>
                </div>
                <div className="restaurantDetails">
                  <h3>{vendor.firmName}</h3>
                  <p className="cuisines">{vendor.region && vendor.region.join(", ")}</p>
                  <p className="area">{vendor.area}</p>
                  {vendor.offer && <p className="offer">🎉 {vendor.offer}</p>}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="emptyState">
            <p>No restaurants found</p>
          </div>
        )}
      </div>
    </>
  )
}

export default RestaurantsByItem
