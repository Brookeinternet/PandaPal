// server.js
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

// 🐼 Printify API setup
const PRINTIFY_API = 'https://api.printify.com/v1';
const SHOP_ID = process.env.PRINTIFY_SHOP_ID;
const TOKEN = process.env.PRINTIFY_TOKEN;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
};

// 🧸 Get all products
app.get('/products', async (req, res) => {
  try {
    const response = await axios.get(`${PRINTIFY_API}/shops/${SHOP_ID}/products.json`, { headers });
    res.json(response.data);
  } catch (error) {
    console.error('❌ Error fetching products:', error.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// 🧵 Get single product details
app.get('/products/:id', async (req, res) => {
  try {
    const response = await axios.get(`${PRINTIFY_API}/shops/${SHOP_ID}/products/${req.params.id}.json`, { headers });
    res.json(response.data);
  } catch (error) {
    console.error('❌ Error fetching product:', error.message);
    res.status(500).json({ error: 'Failed to fetch product details' });
  }
});

// 🐾 Health check
app.get('/', (req, res) => {
  res.send('🐼 PandaPal backend is cozy and running!');
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
