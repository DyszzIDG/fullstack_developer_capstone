import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function Dealer() {
  const { id } = useParams();
  const [dealer] = useState({id, full_name: "Premium Auto Dealership " + id, city: "Kansas City", state: "Kansas", address: "123 Auto Dr"});
  const [reviews, setReviews] = useState([]);
  const user = sessionStorage.getItem("username");

  useEffect(() => {
    const mockReviews = [
      {id: 1, name: "John Doe", review: "Great service, very happy with my new car!", sentiment: "positive", car_make: "Audi", car_model: "A4", car_year: 2023},
      {id: 2, name: "Jane Smith", review: "The buying process was a bit slow, but overall okay.", sentiment: "neutral", car_make: "BMW", car_model: "X5", car_year: 2022}
    ];
    const key = `reviews_dealer_${id}`;
    const submitted = JSON.parse(sessionStorage.getItem(key) || "[]");
    setReviews([...submitted, ...mockReviews]);
  }, [id]);

  return (
    <div className="mt-4">
      <div className="glass-panel mb-5">
        <h1 className="fw-bold text-primary">{dealer.full_name}</h1>
        <p className="lead">{dealer.address}, {dealer.city}, {dealer.state}</p>
        {user && (
          <Link to={`/postreview/${id}`} className="btn btn-primary mt-3 px-4 py-2 fw-bold">Post a Review</Link>
        )}
      </div>

      <h3 className="fw-bold mb-4">Customer Reviews</h3>
      <div className="row g-4">
        {reviews.map(r => (
          <div className="col-md-6" key={r.id}>
            <div className="card p-4 h-100">
              <div className="d-flex justify-content-between mb-3">
                <h5 className="fw-bold m-0 text-light">{r.name}</h5>
                <span className={`badge bg-${r.sentiment === 'positive' ? 'success' : r.sentiment === 'negative' ? 'danger' : 'secondary'}`}>
                  {r.sentiment.toUpperCase()}
                </span>
              </div>
              <p className="mb-3 fs-5 text-light">"{r.review}"</p>
              <div className="text-secondary small mt-auto">
                🚗 {r.car_year} {r.car_make} {r.car_model}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}