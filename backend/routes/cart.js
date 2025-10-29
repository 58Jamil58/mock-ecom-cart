const express = require('express');
const Cart = require('../models/Cart');
const User = require('../models/User');
const router = express.Router();


const mockUserId = '507f1f77bcf86cd799439011'; 

router.post('/', async (req, res) => {
  const { productId, title, price, quantity = 1, image } = req.body;
  try {
    let cart = await Cart.findOne({ userId: mockUserId });
    if (!cart){
      cart = new Cart({ userId: mockUserId, items: [] });
    }
    const existingItem = cart.items.find(item => item.productId === productId);
    if (existingItem){
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, title, price, quantity, image });
    }
    cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    await cart.save();
    res.json(cart);
  } catch (error){
    res.status(500).json({ message: 'Error adding to cart' });
  }
});

router.delete('/:id', async (req, res) => {
  const productId = parseInt(req.params.id);
  try {
    const cart = await Cart.findOne({ userId: mockUserId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    cart.items = cart.items.filter(item => item.productId !== productId);
    cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    await cart.save();
    res.json(cart);
  } catch (error){
    res.status(500).json({ message: 'Error removing from cart' });
  }
});

// PUT /api/cart/:id - Update item quantity in cart
router.put('/:id', async (req, res) => {
  const productId = parseInt(req.params.id);
  const { quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId: mockUserId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    const item = cart.items.find(item => item.productId === productId);
    if (!item) return res.status(404).json({ message: 'Item not found in cart' });
    item.quantity = quantity;
    cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    await cart.save();
    res.json(cart);
  } catch (error){
    res.status(500).json({ message: 'Error updating cart item' });
  }
});

// GET /api/cart - Get cart
router.get('/', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: mockUserId }).populate('userId');
    if (!cart) return res.json({ items: [], total: 0 });
    res.json(cart);
  } catch (error){
    res.status(500).json({ message: 'Error fetching cart' });
  }
});

module.exports = router;
