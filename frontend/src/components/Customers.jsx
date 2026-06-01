import React, { useState, useEffect } from 'react';
import { customerAPI } from '../api';
import { getErrorMessage } from '../utils/errors';
import './Customers.css';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const res = await customerAPI.getAll();
      setCustomers(Array.isArray(res.data) ? res.data : []);
      setError('');
    } catch (err) {
      setError('Failed to load customers');
      setCustomers([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.name.trim()) {
      setError('Full name is required');
      return;
    }

    if (!form.email.trim()) {
      setError('Email is required');
      return;
    }

    if (!form.phone.trim()) {
      setError('Phone number is required');
      return;
    }

    if (!/^\d+$/.test(form.phone.trim())) {
      setError('Phone number must contain only numeric digits');
      return;
    }

    try {
      await customerAPI.create({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim()
      });
      setForm({ name: '', email: '', phone: '' });
      await loadCustomers();
      setSuccess('Customer added successfully');
    } catch (err) {
      setError(getErrorMessage(err, 'Error saving customer'));
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this customer?')) {
      setError('');
      setSuccess('');
      try {
        await customerAPI.delete(id);
        await loadCustomers();
        setSuccess('Customer deleted successfully');
      } catch (err) {
        setError(getErrorMessage(err, 'Failed to delete customer'));
      }
    }
  };

  return (
    <div className="customers">
      <h2>Customers</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      
      <form onSubmit={handleSubmit} className="form" noValidate>
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '');
            setForm({ ...form, phone: val });
          }}
          required
        />
        <button type="submit">Add Customer</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>
                <button onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
