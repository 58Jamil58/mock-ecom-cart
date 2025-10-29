import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FaHome, FaShoppingCart, FaCreditCard } from 'react-icons/fa';
import Products from './components/Products';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import './App.css';

function App(){
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <header>
            <h1>Mock E-Com Cart</h1>
            <nav>
              <Link to="/" className="nav-link">
                <FaHome /> Products
              </Link>
              <Link to="/cart" className="nav-link">
                <FaShoppingCart /> Cart
              </Link>
              <Link to="/checkout" className="nav-link">
                <FaCreditCard /> Checkout
              </Link>
            </nav>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
