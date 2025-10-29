import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { FaArrowLeft } from 'react-icons/fa';
import Receipt from './Receipt';
import './Checkout.css';

const Checkout = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [receipt, setReceipt] = useState(null);
  const { cart, fetchCart } = useContext(CartContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/checkout', {
        cartItems: cart.items,
        name,
        email
      });
      setReceipt(response.data);
      fetchCart(); // Refresh cart
    } catch (error){
      console.error('Error during checkout:', error);
    }
  };

  if (receipt){
    return <Receipt receipt={receipt} onClose={() => setReceipt(null)} />;
  }

  return (
    <div className="checkout">
      <div className="checkout-header">
        <Link to="/cart" className="back-link">
          <FaArrowLeft /> Back to Cart
        </Link>
        <h2>Checkout</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Complete Checkout</button>
      </form>
    </div>
  );
};

export default Checkout;
