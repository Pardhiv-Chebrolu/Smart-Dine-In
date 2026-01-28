import React, { useState, useEffect, useContext } from "react";
import { API_URL } from "../api";
import { useParams } from "react-router-dom";
import TopBar from "./TopBar";
import { CartContext } from "../context/CartContext";

const ProductMenu = () => {
  const [products, setProducts] = useState([]);
  const [addedItems, setAddedItems] = useState({});
  const { addToCart } = useContext(CartContext);

  const { firmId, firmName } = useParams();
    

  const productHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`);
      const newProductData = await response.json();
      setProducts(newProductData.products);
    } catch (error) {
      console.error("product failed to fetch", error);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product, firmId, firmName, 1);
    setAddedItems(prev => ({...prev, [product._id]: true}));
    setTimeout(() => {
      setAddedItems(prev => ({...prev, [product._id]: false}));
    }, 1500);
  };

  useEffect(() => {
    productHandler();
  }, []);

  return (
    <>
      <TopBar />
      <section className="productSection">
        <h3>{firmName}</h3>
        {products.map((item) => {
          const isAdded = addedItems[item._id];
          return (
            <div className="productBox" key={item._id}>
              <div>
                <div><strong>{item.productName}</strong></div>
                <div>₹{item.price}</div>
                <div>{item.description}</div>
              </div>
              <div className="productGroup">
                <img 
                  src={`${API_URL}/uploads/${item.image}`}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/100?text=No+Image';
                  }}
                />
                <button 
                  className={`addButton ${isAdded ? 'added' : ''}`}
                  onClick={() => handleAddToCart(item)}
                >
                  {isAdded ? '✓ Added' : 'ADD'}
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default ProductMenu;
