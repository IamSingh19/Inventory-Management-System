import React, { useState, useEffect } from 'react';
import { productAPI } from '../api';
import { getErrorMessage } from '../utils/errors';
import './Products.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', sku: '', price: '', quantity: '' });
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await productAPI.getAll();
      setProducts(res.data || []);
      setError('');
    } catch (err) {
      console.error('Load error:', err);
      setProducts([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    const quantity = Number.parseInt(form.quantity, 10);
    const price = parseFloat(form.price) || 0;
    
    if (!form.name.trim()) {
      setError('Product name is required');
      return;
    }
    
    if (!form.sku.trim()) {
      setError('SKU is required');
      return;
    }
    
    if (Number.isNaN(quantity) || quantity <= 0) {
      setError('Quantity must be greater than 0');
      return;
    }
    
    if (price <= 0) {
      setError('Price must be greater than 0');
      return;
    }
    
    const submitData = {
      name: form.name.trim(),
      sku: form.sku.trim(),
      price,
      quantity
    };

    try {
      if (editing) {
        await productAPI.update(editing, submitData);
        setEditing(null);
        setSuccess('Product updated successfully');
      } else {
        await productAPI.create(submitData);
        setSuccess('Product added successfully');
      }
      
      setForm({ name: '', sku: '', price: '', quantity: '' });
      await loadProducts();
    } catch (err) {
      console.error('Submit error:', err);
      setError(getErrorMessage(err, 'Error saving product'));
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      sku: product.sku,
      price: product.price,
      quantity: product.quantity
    });
    setEditing(product.id);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this product?')) {
      setError('');
      setSuccess('');
      try {
        await productAPI.delete(id);
        await loadProducts();
        setSuccess('Product deleted successfully');
      } catch (err) {
        setError(getErrorMessage(err, 'Failed to delete product'));
      }
    }
  };

  return (
    <div className="products">
      <h2>Products</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      
      <form onSubmit={handleSubmit} className="form" noValidate>
        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="SKU"
          value={form.sku}
          onChange={(e) => setForm({ ...form, sku: e.target.value })}
          required
          disabled={editing}
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => {
            const val = e.target.value === '' ? '' : Math.max(0.01, parseFloat(e.target.value) || 0);
            setForm({ ...form, price: val });
          }}
          required
          step="0.01"
          min="0.01"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          onBlur={(e) => {
            const val = e.target.value === '' ? '' : parseInt(e.target.value, 10) || 0;
            setForm({ ...form, quantity: val });
          }}
          required
          min="1"
        />
        <button type="submit">{editing ? 'Update' : 'Add'} Product</button>
        {editing && <button type="button" onClick={() => { setEditing(null); setForm({ name: '', sku: '', price: '', quantity: '' }); }}>Cancel</button>}
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.sku}</td>
              <td>${p.price.toFixed(2)}</td>
              <td>{p.quantity}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
