import React, { useState, useEffect } from 'react';

const PostReview = () => {
  const dealerId = window.location.pathname.split('/').pop();
  const [carMakes, setCarMakes] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [form, setForm] = useState({
    review: '', purchase: false, purchase_date: '',
    car_make: '', car_model: '', car_year: new Date().getFullYear(),
  });

  useEffect(() => {
    fetch('/djangoapp/get_cars').then(r => r.json()).then(data => {
      setCarMakes(data.CarMakes || []);
      setCarModels(data.CarModels || []);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, dealership: parseInt(dealerId), time: new Date().toISOString() };
    const res = await fetch('/djangoapp/add_review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) window.location.href = `/dealer/${dealerId}`;
  };

  const inputStyle = { width: '100%', padding: '10px 14px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: 8, color: '#f0f0f0', marginBottom: 16 };

  return (
    <div style={{ padding: '40px 20px', background: '#0f0f1a', minHeight: '100vh' }}>
      <div style={{ maxWidth: 600, margin: '0 auto', background: '#1a1a2e', borderRadius: 16, padding: 40, border: '1px solid #2a2a4a' }}>
        <h2 style={{ color: '#6c63ff', fontWeight: 700, marginBottom: 24 }}>Write a Review</h2>
        <form onSubmit={handleSubmit}>
          <label style={{ color: '#aaa', display: 'block', marginBottom: 4 }}>Your Review</label>
          <textarea name="review" value={form.review} onChange={handleChange} rows={4} style={inputStyle} required />

          <label style={{ color: '#aaa', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, cursor: 'pointer' }}>
            <input type="checkbox" name="purchase" checked={form.purchase} onChange={handleChange} />
            I purchased a car here
          </label>

          {form.purchase && <>
            <label style={{ color: '#aaa', display: 'block', marginBottom: 4 }}>Purchase Date</label>
            <input type="date" name="purchase_date" value={form.purchase_date} onChange={handleChange} style={inputStyle} />

            <label style={{ color: '#aaa', display: 'block', marginBottom: 4 }}>Car Make</label>
            <select name="car_make" value={form.car_make} onChange={handleChange} style={inputStyle}>
              <option value="">Select Make</option>
              {carMakes.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
            </select>

            <label style={{ color: '#aaa', display: 'block', marginBottom: 4 }}>Car Model</label>
            <select name="car_model" value={form.car_model} onChange={handleChange} style={inputStyle}>
              <option value="">Select Model</option>
              {carModels.filter(m => m.make === form.car_make).map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
            </select>

            <label style={{ color: '#aaa', display: 'block', marginBottom: 4 }}>Car Year</label>
            <input type="number" name="car_year" value={form.car_year} onChange={handleChange} min="2000" max="2025" style={inputStyle} />
          </>}

          <button type="submit" style={{ width: '100%', padding: 12, background: '#6c63ff', border: 'none', borderRadius: 30, color: '#fff', fontWeight: 600, cursor: 'pointer' }}>
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostReview;
