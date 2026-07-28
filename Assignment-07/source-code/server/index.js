// Assignment 07 — Feedback/Review App — Express Backend
// Run: npm install && npm start (from this server/ folder, port 5000)

const express = require('express');
const cors    = require('cors');
const { v4: uuidv4 } = require('uuid');
const app  = express();
const PORT = process.env.PORT || 5000;

// ---- Optional MongoDB ----
// const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/feedback_app')
//   .then(() => console.log('✅ MongoDB connected'))
//   .catch(err => console.warn('⚠️  Using in-memory store.', err.message));

// ---- In-Memory Store ----
let reviews = [
  { id: uuidv4(), productName: 'Wireless Headphones', author: 'Riya P.',   rating: 5, comment: 'Excellent sound quality! Very comfortable for long use.', createdAt: new Date('2024-07-10') },
  { id: uuidv4(), productName: 'Mechanical Keyboard',  author: 'Arjun S.',  rating: 4, comment: 'Great tactile feedback, clicky switches. A bit loud though.', createdAt: new Date('2024-07-12') },
  { id: uuidv4(), productName: 'Wireless Headphones',  author: 'Meena K.',  rating: 3, comment: 'Average battery life. Sound is okay for the price.', createdAt: new Date('2024-07-14') },
  { id: uuidv4(), productName: '4K Monitor',           author: 'Siddharth', rating: 5, comment: 'Crystal clear display. Best purchase I made this year!', createdAt: new Date('2024-07-15') },
];

// ---- Middleware ----
app.use(cors());
app.use(express.json());

// ---- Routes ----
// Get all reviews (optionally filtered by product)
app.get('/api/reviews', (req, res) => {
  const { product } = req.query;
  if (product) {
    return res.json(reviews.filter(r => r.productName.toLowerCase().includes(product.toLowerCase())));
  }
  res.json(reviews);
});

// Get stats
app.get('/api/reviews/stats', (req, res) => {
  const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : 0;
  res.json({ total: reviews.length, average: parseFloat(avg) });
});

// Create a review
app.post('/api/reviews', (req, res) => {
  const { productName, author, rating, comment } = req.body;
  if (!productName || !author || !rating) return res.status(400).json({ error: 'productName, author, rating are required.' });
  const review = { id: uuidv4(), productName, author, rating: Number(rating), comment: comment || '', createdAt: new Date() };
  reviews.unshift(review);
  res.status(201).json(review);
});

// Delete a review
app.delete('/api/reviews/:id', (req, res) => {
  const before = reviews.length;
  reviews = reviews.filter(r => r.id !== req.params.id);
  if (reviews.length === before) return res.status(404).json({ error: 'Review not found.' });
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`⭐ Feedback API running at http://localhost:${PORT}`));
