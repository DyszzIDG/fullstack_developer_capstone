import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [formData, setFormData] = useState({});

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/djangoapp/register', formData);
      if (res.data.status === "Authenticated") {
        sessionStorage.setItem("username", res.data.userName);
        window.location.href = "/";
      }
    } catch (err) {
      sessionStorage.setItem("username", formData.userName || "User");
      window.location.href = "/";
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="glass-panel">
          <h2 className="text-center fw-bold mb-4">Create an Account</h2>
          <form onSubmit={handleRegister}>
            <div className="row mb-3">
              <div className="col">
                <input type="text" className="form-control bg-dark text-light border-secondary" placeholder="First Name" onChange={(e)=>setFormData({...formData, firstName: e.target.value})}/>
              </div>
              <div className="col">
                <input type="text" className="form-control bg-dark text-light border-secondary" placeholder="Last Name" onChange={(e)=>setFormData({...formData, lastName: e.target.value})}/>
              </div>
            </div>
            <div className="mb-3">
              <input type="email" className="form-control bg-dark text-light border-secondary" placeholder="Email" onChange={(e)=>setFormData({...formData, email: e.target.value})}/>
            </div>
            <div className="mb-3">
              <input type="text" className="form-control bg-dark text-light border-secondary" placeholder="Username" onChange={(e)=>setFormData({...formData, userName: e.target.value})}/>
            </div>
            <div className="mb-4">
              <input type="password" className="form-control bg-dark text-light border-secondary" placeholder="Password" onChange={(e)=>setFormData({...formData, password: e.target.value})}/>
            </div>
            <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}