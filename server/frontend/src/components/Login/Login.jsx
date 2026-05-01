import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('/djangoapp/login', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName: username, password }),
    });
    const data = await res.json();
    if (data.status === 'Authenticated') {
      window.location.href = '/';
    } else {
      setMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#1a1a2e', borderRadius: 16, padding: 40, width: 400, border: '1px solid #2a2a4a' }}>
        <h2 style={{ color: '#6c63ff', fontWeight: 700, marginBottom: 24 }}>Login</h2>
        {message && <div style={{ color: '#ff6b6b', marginBottom: 16 }}>{message}</div>}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, color: '#aaa' }}>Username</label>
            <input
              type="text" value={username} onChange={e => setUsername(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: 8, color: '#f0f0f0' }}
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', marginBottom: 6, color: '#aaa' }}>Password</label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: 8, color: '#f0f0f0' }}
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '12px', background: '#6c63ff', border: 'none', borderRadius: 30, color: '#fff', fontWeight: 600, cursor: 'pointer' }}>
            Login
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: 16, color: '#aaa' }}>
          Don't have an account? <a href="/register" style={{ color: '#6c63ff' }}>Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
