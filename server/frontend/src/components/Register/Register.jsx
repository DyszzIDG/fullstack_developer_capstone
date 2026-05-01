import React, { useState } from 'react';

const Register = () => {
  const [form, setForm] = useState({
    userName: '', firstName: '', lastName: '', email: '', password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch('/djangoapp/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.status === 'Authenticated') {
      window.location.href = '/';
    } else {
      setMessage(data.error || 'Registration failed. Please try again.');
    }
  };

  const inputStyle = {
    width: '100%', padding: '10px 14px', background: '#0f0f1a',
    border: '1px solid #2a2a4a', borderRadius: 8, color: '#f0f0f0', marginBottom: 16
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#1a1a2e', borderRadius: 16, padding: 40, width: 440, border: '1px solid #2a2a4a' }}>
        <h2 style={{ color: '#6c63ff', fontWeight: 700, marginBottom: 24 }}>Create Account</h2>
        {message && <div style={{ color: '#ff6b6b', marginBottom: 16 }}>{message}</div>}
        <form onSubmit={handleRegister}>
          <label style={{ color: '#aaa', display: 'block', marginBottom: 4 }}>Username</label>
          <input name="userName" type="text" value={form.userName} onChange={handleChange} style={inputStyle} required />

          <label style={{ color: '#aaa', display: 'block', marginBottom: 4 }}>First Name</label>
          <input name="firstName" type="text" value={form.firstName} onChange={handleChange} style={inputStyle} required />

          <label style={{ color: '#aaa', display: 'block', marginBottom: 4 }}>Last Name</label>
          <input name="lastName" type="text" value={form.lastName} onChange={handleChange} style={inputStyle} required />

          <label style={{ color: '#aaa', display: 'block', marginBottom: 4 }}>Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} style={inputStyle} required />

          <label style={{ color: '#aaa', display: 'block', marginBottom: 4 }}>Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} style={inputStyle} required />

          <button type="submit" style={{ width: '100%', padding: '12px', background: '#6c63ff', border: 'none', borderRadius: 30, color: '#fff', fontWeight: 600, cursor: 'pointer', marginTop: 8 }}>
            Register
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: 16, color: '#aaa' }}>
          Already have an account? <a href="/login" style={{ color: '#6c63ff' }}>Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
