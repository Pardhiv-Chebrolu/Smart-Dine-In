import React, { useState, useEffect } from 'react'
import TopBar from '../components/TopBar'
import ItemsDisplay from '../components/ItemsDisplay'
import Chains from '../components/Chains'
import FirmCollections from '../components/FirmCollections'
import { API_URL } from '../api'

const LandingPage = () => {
  const [allVendors, setAllVendors] = useState([])
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const fetchAllVendors = async () => {
      try {
        const response = await fetch(`${API_URL}/vendor/all-vendors?order=desc`)
        const data = await response.json()
        if (data.vendors) {
          const flatVendors = data.vendors.flatMap(vendor => vendor.firm)
          setAllVendors(flatVendors)
        }
      } catch (error) {
        console.error("Failed to fetch vendors for search", error)
      }
    }
    
    fetchAllVendors()
  }, [])

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
    <div>
      <TopBar onSearch={handleSearch} searchResults={searchResults} />
      <div className="landingSection">
        <ItemsDisplay />
        <Chains />
        <FirmCollections />
      </div>
    </div>
  )
}

export default LandingPage