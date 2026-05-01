import React, { useState, useEffect } from 'react';

const sentimentEmoji = { positive: '😊 Positive', negative: '😞 Negative', neutral: '😐 Neutral' };
const sentimentColor = { positive: '#4ade80', negative: '#f87171', neutral: '#facc15' };

const Dealer = ({ dealerId, isLoggedIn }) => {
  const [dealer, setDealer] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const id = dealerId || window.location.pathname.split('/').pop();
    fetch(`/djangoapp/dealer/${id}`).then(r => r.json()).then(setDealer);
    fetch(`/djangoapp/review/dealer/${id}`).then(r => r.json()).then(setReviews);
  }, [dealerId]);

  if (!dealer) return <div style={{ color: '#aaa', padding: 40 }}>Loading...</div>;

  return (
    <div style={{ padding: '40px 20px', background: '#0f0f1a', minHeight: '100vh' }}>
      <div style={{ background: '#1a1a2e', borderRadius: 16, padding: 30, marginBottom: 32, border: '1px solid #2a2a4a' }}>
        <h2 style={{ color: '#6c63ff', fontWeight: 700 }}>{dealer.full_name}</h2>
        <p style={{ color: '#aaa' }}>📍 {dealer.address}, {dealer.city}, {dealer.state} {dealer.zip}</p>
        {isLoggedIn && (
          <a href={`/postreview/${dealer.id}`}
            style={{ background: '#6c63ff', color: '#fff', padding: '10px 24px', borderRadius: 30, textDecoration: 'none', fontWeight: 600 }}>
            ✏️ Write a Review
          </a>
        )}
      </div>

      <h3 style={{ color: '#f0f0f0', marginBottom: 20 }}>Customer Reviews</h3>
      {reviews.length === 0 && <p style={{ color: '#aaa' }}>No reviews yet. Be the first!</p>}
      {reviews.map((r, i) => (
        <div key={i} style={{ background: '#1a1a2e', borderRadius: 16, padding: 24, marginBottom: 16, border: '1px solid #2a2a4a' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <strong style={{ color: '#6c63ff' }}>{r.name}</strong>
            <span style={{ color: sentimentColor[r.sentiment], background: '#0f0f1a', padding: '4px 12px', borderRadius: 20, fontSize: 13 }}>
              {sentimentEmoji[r.sentiment] || '😐 Neutral'}
            </span>
          </div>
          <p style={{ color: '#f0f0f0', marginBottom: 8 }}>{r.review}</p>
          {r.purchase && (
            <p style={{ color: '#aaa', fontSize: 13 }}>
              🚗 Purchased: {r.car_make} {r.car_model} ({r.car_year}) on {r.purchase_date}
            </p>
          )}
          <p style={{ color: '#555', fontSize: 12 }}>{r.time}</p>
        </div>
      ))}
    </div>
  );
};

export default Dealer;
