const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products?limit=10');
    res.json(response.data);
  } catch (error){
    res.status(500).json({ message: 'Error fetching products' });
  }
});

module.exports = router;
