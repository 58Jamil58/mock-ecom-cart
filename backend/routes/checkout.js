const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { cartItems, name, email } = req.body;
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const receipt = {
    message: 'Checkout successful!',
    total,
    timestamp: new Date().toISOString(),
    items: cartItems,
    customer: { name, email }
  };
  res.json(receipt);
});

module.exports = router;
