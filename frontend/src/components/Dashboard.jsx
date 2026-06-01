import React, { useState, useEffect } from 'react';
import { statsAPI } from '../api';
import './Dashboard.css';

export default function Dashboard() {
  const [stats, setStats] = useState({
    total_products: 0,
    total_customers: 0,
    total_orders: 0,
    low_stock_products: 0
  });
  const [error, setError] = useState('');

  useEffect(() => {
    loadStats();
    const interval = setInterval(loadStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadStats = async () => {
    try {
      const res = await statsAPI.getStats();
      setStats(res.data);
      setError('');
    } catch (err) {
      setError('Failed to load stats');
    }
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      {error && <div className="error">{error}</div>}
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p className="stat-value">{stats.total_products}</p>
        </div>
        <div className="stat-card">
          <h3>Total Customers</h3>
          <p className="stat-value">{stats.total_customers}</p>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-value">{stats.total_orders}</p>
        </div>
        <div className="stat-card warning">
          <h3>Low Stock Products</h3>
          <p className="stat-value">{stats.low_stock_products}</p>
        </div>
      </div>
    </div>
  );
}
