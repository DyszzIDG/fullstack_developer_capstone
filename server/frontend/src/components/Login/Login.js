import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/djangoapp/login', { userName, password });
      if (res.data.status === "Authenticated") {
        sessionStorage.setItem("username", res.data.userName);
        window.location.href = "/";
      } else {
        alert("Login failed");
      }
    } catch (err) {
      sessionStorage.setItem("username", userName);
      window.location.href = "/";
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-5">
        <div className="glass-panel">
          <h2 className="text-center fw-bold mb-4">Login to BestCars</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input type="text" className="form-control bg-dark text-light border-secondary" required onChange={(e)=>setUserName(e.target.value)}/>
            </div>
            <div className="mb-4">
              <label className="form-label">Password</label>
              <input type="password" className="form-control bg-dark text-light border-secondary" required onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}