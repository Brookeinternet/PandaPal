// server.js
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const PRINTIFY_API = 'https://api.printify.com/v1';
const TOKEN = process.env.PRINTIFY_TOKEN;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
};

// 🐼 Get all products
app.get('/products', async (req, res) => {
  try {
    const response = await axios.get(`${PRINTIFY_API}/shops/YOUR_SHOP_ID/products.json`, { headers });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// 🧵 Get product details
app.get('/products/:id', async (req, res) => {
  try {
    const response = await axios.get(`${PRINTIFY_API}/shops/YOUR_SHOP_ID/products/${req.params.id}.json`, { headers });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching product:', error.message);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

app.listen(PORT, () => {
  console.log(`🐼 PandaPal backend running on port ${PORT}`);
});
