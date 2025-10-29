import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { convertToINR, formatINR } from '../utils/currency';
import { FaArrowLeft } from 'react-icons/fa';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  return (
    <div className="cart">
      <div className="cart-header">
        <Link to="/" className="back-link">
          <FaArrowLeft /> Back to Products
        </Link>
        <h2>Cart</h2>
      </div>
      {cart.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.items.map(item => (
            <div key={item.productId} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div>
                <h4>{item.title}</h4>
                <p>{formatINR(convertToINR(item.price))} x {item.quantity}</p>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
                </div>
                <button onClick={() => removeFromCart(item.productId)}>Remove</button>
              </div>
            </div>
          ))}
          <h3>Total: {formatINR(convertToINR(cart.total))}</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;
