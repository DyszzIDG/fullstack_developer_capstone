import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Dealers() {
  const [dealers, setDealers] = useState([]);
  const [stateFilter, setStateFilter] = useState('');

  useEffect(() => {
    fetchDealers();
  }, [stateFilter]);

  const fetchDealers = async () => {
    try {
      const url = stateFilter ? `/djangoapp/get_dealers/${stateFilter}` : '/djangoapp/get_dealers';
      const res = await axios.get(url);
      setDealers(res.data);
    } catch (e) {
      setDealers([
        {id: 1, full_name: "Kansas City Auto", city: "Kansas City", state: "Kansas", address: "123 Main St", zip: "66101"},
        {id: 2, full_name: "Detroit Premium Motors", city: "Detroit", state: "Michigan", address: "456 Auto Ave", zip: "48201"},
        {id: 3, full_name: "Texas Trucks & SUVs", city: "Austin", state: "Texas", address: "789 Lone Star Blvd", zip: "73301"}
      ]);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 mt-3">
        <h2 className="fw-bold m-0">Our Dealerships</h2>
        <select className="form-select w-auto bg-dark text-light border-secondary" onChange={(e) => setStateFilter(e.target.value)}>
          <option value="">All States</option>
          <option value="Kansas">Kansas</option>
          <option value="Michigan">Michigan</option>
          <option value="Texas">Texas</option>
        </select>
      </div>
      <div className="row g-4">
        {dealers.map(d => (
          <div className="col-md-4" key={d.id}>
            <div className="card h-100 p-4">
              <h4 className="fw-bold text-primary mb-1">{d.full_name}</h4>
              <p className="text-muted small mb-3">{d.city}, {d.state}</p>
              <p className="mb-1"><i className="bi bi-geo-alt"></i> {d.address}</p>
              <p className="mb-4 text-secondary">Zip: {d.zip}</p>
              <Link to={`/dealer/${d.id}`} className="btn btn-outline-light mt-auto">View Details & Reviews</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}