import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { convertToINR, formatINR } from '../utils/currency';
import { FaSearch, FaFilter } from 'react-icons/fa';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState('');
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }, [products, searchTerm]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error){
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    await addToCart(product);
    setNotification(`${product.title} added to cart!`);
    setTimeout(() => setNotification(''), 3000); 
  };

  return (
    <div className="products">
      <h2>Products</h2>
      <div className="search-filter">
        <div className="search-bar">
          <FaSearch />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="filter-btn">
          <FaFilter /> Filter
        </button>
      </div>
      {notification && <div className="notification">{notification}</div>}
      {loading ? (
        <div className="loading">Loading products...</div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{formatINR(convertToINR(product.price))}</p>
              <button onClick={() => handleAddToCart({
                productId: product.id,
                title: product.title,
                price: product.price,
                image: product.image
              })}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
