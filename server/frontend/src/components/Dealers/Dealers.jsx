import React, { useState, useEffect } from 'react';

const Dealers = ({ isLoggedIn, userName }) => {
  const [dealers, setDealers] = useState([]);
  const [state, setState] = useState('All');
  const [states, setStates] = useState([]);

  useEffect(() => {
    fetch('/djangoapp/get_dealers')
      .then(r => r.json())
      .then(data => {
        setDealers(data);
        const uniqueStates = ['All', ...new Set(data.map(d => d.state))].sort();
        setStates(uniqueStates);
      });
  }, []);

  const handleStateFilter = (e) => {
    const selected = e.target.value;
    setState(selected);
    const url = selected === 'All' ? '/djangoapp/get_dealers' : `/djangoapp/get_dealers/${selected}`;
    fetch(url).then(r => r.json()).then(setDealers);
  };

  return (
    <div style={{ padding: '40px 20px', background: '#0f0f1a', minHeight: '100vh' }}>
      <h2 style={{ color: '#6c63ff', fontWeight: 700, marginBottom: 8 }}>Dealerships</h2>
      <p style={{ color: '#aaa', marginBottom: 24 }}>Browse all Best Cars branches across the USA</p>

      <div style={{ marginBottom: 24 }}>
        <label style={{ color: '#aaa', marginRight: 12 }}>Filter by State:</label>
        <select value={state} onChange={handleStateFilter}
          style={{ padding: '8px 16px', background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: 8, color: '#f0f0f0' }}>
          {states.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#1a1a2e', color: '#6c63ff' }}>
            <th style={{ padding: '12px 16px', textAlign: 'left' }}>ID</th>
            <th style={{ padding: '12px 16px', textAlign: 'left' }}>Dealership Name</th>
            <th style={{ padding: '12px 16px', textAlign: 'left' }}>City</th>
            <th style={{ padding: '12px 16px', textAlign: 'left' }}>State</th>
            <th style={{ padding: '12px 16px', textAlign: 'left' }}>Zip</th>
            {isLoggedIn && <th style={{ padding: '12px 16px', textAlign: 'left' }}>Action</th>}
          </tr>
        </thead>
        <tbody>
          {dealers.map((d, i) => (
            <tr key={d.id} style={{ background: i % 2 === 0 ? '#12122a' : '#1a1a2e', borderBottom: '1px solid #2a2a4a' }}>
              <td style={{ padding: '12px 16px', color: '#aaa' }}>{d.id}</td>
              <td style={{ padding: '12px 16px' }}>
                <a href={`/dealer/${d.id}`} style={{ color: '#6c63ff', textDecoration: 'none', fontWeight: 600 }}>{d.full_name}</a>
              </td>
              <td style={{ padding: '12px 16px', color: '#aaa' }}>{d.city}</td>
              <td style={{ padding: '12px 16px', color: '#aaa' }}>{d.state}</td>
              <td style={{ padding: '12px 16px', color: '#aaa' }}>{d.zip}</td>
              {isLoggedIn && (
                <td style={{ padding: '12px 16px' }}>
                  <a href={`/postreview/${d.id}`}
                    style={{ background: '#6c63ff', color: '#fff', padding: '6px 14px', borderRadius: 20, textDecoration: 'none', fontSize: 13 }}>
                    Review Dealer
                  </a>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dealers;
