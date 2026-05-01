import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PostReview() {
  const { id } = useParams();
  const [review, setReview] = useState('');
  const [date, setDate] = useState('');
  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('');

  const submitReview = (e) => {
    e.preventDefault();
    const user = sessionStorage.getItem("username") || "Anonymous";
    const newReview = {
      id: Date.now(),
      name: user,
      review: review,
      sentiment: "positive",
      car_make: carMake,
      car_model: carModel,
      car_year: carYear,
      purchase_date: date,
    };
    // Save to sessionStorage so Dealer page can read it
    const key = `reviews_dealer_${id}`;
    const existing = JSON.parse(sessionStorage.getItem(key) || "[]");
    existing.unshift(newReview);
    sessionStorage.setItem(key, JSON.stringify(existing));
    window.location.href = `/dealer/${id}`;
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="glass-panel">
          <h2 className="fw-bold mb-4">Post a Review</h2>
          <form onSubmit={submitReview}>
            <div className="mb-3">
              <label className="form-label">Your Review</label>
              <textarea className="form-control bg-dark text-light border-secondary" rows="4" required onChange={(e) => setReview(e.target.value)}></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Purchase Date</label>
              <input type="date" className="form-control bg-dark text-light border-secondary" required onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="row mb-4">
              <div className="col">
                <label className="form-label">Car Make</label>
                <input type="text" className="form-control bg-dark text-light border-secondary" placeholder="e.g. BMW" required onChange={(e) => setCarMake(e.target.value)} />
              </div>
              <div className="col">
                <label className="form-label">Car Model</label>
                <input type="text" className="form-control bg-dark text-light border-secondary" placeholder="e.g. X2" required onChange={(e) => setCarModel(e.target.value)} />
              </div>
              <div className="col">
                <label className="form-label">Year</label>
                <input type="number" className="form-control bg-dark text-light border-secondary" placeholder="2023" required onChange={(e) => setCarYear(e.target.value)} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">Submit Review</button>
          </form>
        </div>
      </div>
    </div>
  );
}