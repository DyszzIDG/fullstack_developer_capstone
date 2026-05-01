import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dealers from './components/Dealers/Dealers';
import Dealer from './components/Dealer/Dealer';
import PostReview from './components/PostReview/PostReview';

function App() {
  const user = sessionStorage.getItem("username");
  const [logoutAlert, setLogoutAlert] = useState(false);

  const logout = () => {
    sessionStorage.removeItem("username");
    setLogoutAlert(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  };

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark px-4 py-3 sticky-top">
        <Link className="navbar-brand fw-bold fs-3 text-primary" to="/">BestCars</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About Us</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact Us</Link></li>
          </ul>
          <div className="d-flex align-items-center">
            {user ? (
              <>
                <span className="me-3 text-light">Welcome, {user}!</span>
                <button className="btn btn-outline-danger btn-sm" onClick={logout}>Logout</button>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-light btn-sm me-2" to="/login">Login</Link>
                <Link className="btn btn-primary btn-sm" to="/register">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {logoutAlert && (
        <div style={{
          position: 'fixed', top: '80px', left: '50%', transform: 'translateX(-50%)',
          zIndex: 9999, width: '420px',
          background: 'linear-gradient(135deg, #1e293b, #0f172a)',
          border: '1px solid #22c55e', borderRadius: '12px',
          padding: '20px 28px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', gap: '14px'
        }}>
          <span style={{ fontSize: '32px' }}>✅</span>
          <div>
            <h5 style={{ color: '#22c55e', margin: 0, fontWeight: 700 }}>Successfully Logged Out</h5>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>
              You have been logged out. Redirecting to home...
            </p>
          </div>
        </div>
      )}

      <div className="container mt-4 mb-5">
        <Routes>
          <Route path="/" element={<Dealers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dealer/:id" element={<Dealer />} />
          <Route path="/postreview/:id" element={<PostReview />} />
          <Route path="/about" element={
            <div className="glass-panel text-center mt-5">
              <h1 className="fw-bold mb-4">About Us</h1>
              <p className="lead">Welcome to BestCars Dealership. We provide the finest vehicles with unparalleled customer service.</p>
              <img src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Dealership" className="img-fluid rounded mt-4" style={{maxHeight: '400px', objectFit: 'cover'}} />
            </div>
          } />
          <Route path="/contact" element={
            <div className="glass-panel mt-5">
              <h1 className="fw-bold text-center mb-4">Contact Us</h1>
              <div className="row justify-content-center">
                <div className="col-md-6 text-center">
                  <p>Email: support@bestcars.com</p>
                  <p>Phone: +1 800 555 1234</p>
                  <p>Address: 123 Premium Auto Way, Detroit, MI</p>
                </div>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;