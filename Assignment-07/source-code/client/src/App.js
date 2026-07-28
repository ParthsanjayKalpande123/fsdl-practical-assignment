// Assignment 07 — FeedbackHub — React App.js

import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const API = '';  // empty = uses CRA proxy (http://localhost:5000)

const PRODUCTS = ['All', 'Wireless Headphones', 'Mechanical Keyboard', '4K Monitor', 'USB-C Hub'];

function StarRating({ value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1, 2, 3, 4, 5].map(star => (
        <span
          key={star}
          style={{ cursor: 'pointer', fontSize: 24, color: star <= value ? '#f59e0b' : '#d1d5db' }}
          onClick={() => onChange(star)}
        >★</span>
      ))}
    </div>
  );
}

function ReviewCard({ review, onDelete }) {
  const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
  const date  = new Date(review.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  return (
    <div className="review-card">
      <div className="review-header">
        <div>
          <p className="review-author">{review.author}</p>
          <p className="review-product">📦 {review.productName}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <span className="stars">{stars}</span>
          <button className="delete-btn" onClick={() => onDelete(review.id)} title="Delete">🗑️</button>
        </div>
      </div>
      <p className="review-comment">{review.comment}</p>
      <p className="review-date">{date}</p>
    </div>
  );
}

export default function App() {
  const [reviews, setReviews]     = useState([]);
  const [stats, setStats]         = useState({ total: 0, average: 0 });
  const [filter, setFilter]       = useState('All');
  const [successMsg, setSuccess]  = useState('');

  // Form state
  const [form, setForm] = useState({ productName: '', author: '', rating: 0, comment: '' });

  const fetchReviews = useCallback(async () => {
    const url = filter === 'All' ? `${API}/api/reviews` : `${API}/api/reviews?product=${encodeURIComponent(filter)}`;
    const res  = await fetch(url);
    setReviews(await res.json());
  }, [filter]);

  const fetchStats = useCallback(async () => {
    const res = await fetch(`${API}/api/reviews/stats`);
    setStats(await res.json());
  }, []);

  useEffect(() => { fetchReviews(); fetchStats(); }, [fetchReviews, fetchStats]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.rating === 0) { alert('Please select a star rating.'); return; }
    await fetch(`${API}/api/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ productName: '', author: '', rating: 0, comment: '' });
    setSuccess('✅ Review submitted successfully!');
    setTimeout(() => setSuccess(''), 3000);
    fetchReviews(); fetchStats();
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this review?')) return;
    await fetch(`${API}/api/reviews/${id}`, { method: 'DELETE' });
    fetchReviews(); fetchStats();
  };

  return (
    <div>
      {/* Header */}
      <header className="app-header">
        <div>
          <h1>⭐ FeedbackHub</h1>
          <p>Assignment 07 — React.js + Express Backend</p>
        </div>
        <div style={{ textAlign: 'right', fontSize: 13, opacity: 0.8 }}>
          Product Review Platform
        </div>
      </header>

      <div className="container">
        {/* Stats */}
        <div className="stats-bar">
          <div className="stat-chip">
            <div className="num">{stats.total}</div>
            <div className="lbl">Total Reviews</div>
          </div>
          <div className="stat-chip">
            <div className="num">{stats.average}⭐</div>
            <div className="lbl">Avg. Rating</div>
          </div>
          <div className="stat-chip">
            <div className="num">{reviews.filter(r => r.rating === 5).length}</div>
            <div className="lbl">5-Star Reviews</div>
          </div>
        </div>

        <div className="layout">
          {/* Add Review Form */}
          <div className="card">
            <h2>📝 Write a Review</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Product</label>
                <select value={form.productName} onChange={e => setForm({ ...form, productName: e.target.value })} required>
                  <option value="">— Select —</option>
                  {PRODUCTS.filter(p => p !== 'All').map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Your Name</label>
                <input value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label>Rating</label>
                <StarRating value={form.rating} onChange={v => setForm({ ...form, rating: v })} />
              </div>
              <div className="form-group">
                <label>Comment</label>
                <textarea value={form.comment} onChange={e => setForm({ ...form, comment: e.target.value })} rows={4} placeholder="Share your experience…" />
              </div>
              <button className="btn-submit" type="submit">Submit Review</button>
            </form>
            {successMsg && <p className="success-msg">{successMsg}</p>}
          </div>

          {/* Reviews List */}
          <div className="card">
            <h2>💬 Reviews</h2>
            {/* Filter */}
            <div className="filter-bar">
              {PRODUCTS.map(p => (
                <button key={p} className={`filter-btn ${filter === p ? 'active' : ''}`} onClick={() => setFilter(p)}>
                  {p}
                </button>
              ))}
            </div>
            {reviews.length === 0
              ? <div className="empty-state">No reviews yet. Be the first!</div>
              : reviews.map(r => <ReviewCard key={r.id} review={r} onDelete={handleDelete} />)
            }
          </div>
        </div>
      </div>
    </div>
  );
}
