const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
// DummyJSON base URL
const DUMMY_API = 'https://dummyjson.com/products';

// Simple in-memory cache to reduce external API calls
let cache = {
  products: null,
  fetchedAt: 0
};
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

async function fetchProductsFromDummy(limit = 0) {
  // If cache is fresh, return it
  const now = Date.now();
  if (cache.products && (now - cache.fetchedAt) < CACHE_TTL_MS) {
    return cache.products;
  }

  try {
    // fetch all products (dummyjson supports /products?limit=100)
    const resp = await axios.get(`${DUMMY_API}?limit=0`);
    // resp.data.products is an array
    let products = Array.isArray(resp.data.products) ? resp.data.products : [];

    // Map fields to required shape: id, name, category, price, rating, image
    products = products.map(p => ({
      id: p.id,
      name: p.title || p.name || '',
      category: p.category || '',
      price: typeof p.price === 'number' ? p.price : Number(p.price) || 0,
      rating: typeof p.rating === 'number' ? p.rating : Number(p.rating) || 0,
      image: p.thumbnail || (p.images && p.images[0]) || ''
    }));

    // cache it
    cache.products = products;
    cache.fetchedAt = Date.now();
    return products;
  } catch (err) {
    console.error('Error fetching from dummy API:', err.message || err);
    // return empty array on failure
    return [];
  }
}

/**
 * GET /products
 * Optional: ?limit=20 (default 20, min 10, max 50)
 */
app.get('/products', async (req, res) => {
  const qLimit = parseInt(req.query.limit, 10);
  const limit = Number.isInteger(qLimit) ? qLimit : 20;
  const safeLimit = Math.max(10, Math.min(50, limit));

  const products = await fetchProductsFromDummy();
  // return first safeLimit items (or fewer if source has fewer)
  const out = products.slice(0, safeLimit);
  res.json({ count: out.length, products: out });
});

/**
 * GET /search?q=term
 * Returns up to 5 matching products by name (case-insensitive, partial match)
 */
app.get('/search', async (req, res) => {
  const q = (req.query.q || '').trim();
  if (!q) {
    return res.status(400).json({ error: 'Missing query parameter q' });
  }

  const products = await fetchProductsFromDummy();
  const qLower = q.toLowerCase();

  const matches = products.filter(p => p.name.toLowerCase().includes(qLower));
  // Return up to 5 items
  const out = matches.slice(0, 5);
  res.json({ count: out.length, products: out });
});

// Healthcheck
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Product backend is running' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`GET /products  -> http://localhost:${PORT}/products`);
  console.log(`GET /search?q=term  -> http://localhost:${PORT}/search?q=phone`);
});
