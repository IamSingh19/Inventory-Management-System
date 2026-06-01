import React, { useState, useEffect } from 'react';
import { orderAPI, customerAPI, productAPI } from '../api';
import './Orders.css';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ customer_id: '', items: [{ product_id: '', quantity: '' }] });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([loadOrders(), loadCustomers(), loadProducts()]);
      setLoading(false);
    };
    loadData();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await orderAPI.getAll();
      setOrders(Array.isArray(res.data) ? res.data : []);
      setError('');
    } catch (err) {
      console.error('Failed to load orders:', err);
      setError('Failed to load orders');
      setOrders([]);
    }
  };

  const loadCustomers = async () => {
    try {
      const res = await customerAPI.getAll();
      setCustomers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Failed to load customers:', err);
      setCustomers([]);
    }
  };

  const loadProducts = async () => {
    try {
      const res = await productAPI.getAll();
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Failed to load products:', err);
      setProducts([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const items = form.items.map(item => ({
        product_id: parseInt(item.product_id),
        quantity: parseInt(item.quantity)
      }));
      await orderAPI.create({
        customer_id: parseInt(form.customer_id),
        items
      });
      setForm({ customer_id: '', items: [{ product_id: '', quantity: '' }] });
      await loadOrders();
      setError('');
    } catch (err) {
      setError(err.response?.data?.detail || 'Error creating order');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Cancel this order?')) {
      try {
        await orderAPI.delete(id);
        await loadOrders();
      } catch (err) {
        setError('Failed to delete order');
      }
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...form.items];
    newItems[index][field] = value;
    setForm({ ...form, items: newItems });
  };

  const addItem = () => {
    setForm({ ...form, items: [...form.items, { product_id: '', quantity: '' }] });
  };

  if (loading) {
    return <div className="orders"><p>Loading...</p></div>;
  }

  return (
    <div className="orders">
      <h2>Orders</h2>
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="form">
        <select
          value={form.customer_id}
          onChange={(e) => setForm({ ...form, customer_id: e.target.value })}
          required
        >
          <option value="">Select Customer</option>
          {customers && customers.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <div className="items">
          {form.items && form.items.map((item, idx) => (
            <div key={idx} className="item-row">
              <select
                value={item.product_id}
                onChange={(e) => handleItemChange(idx, 'product_id', e.target.value)}
                required
              >
                <option value="">Select Product</option>
                {products && products.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} (${p.price})</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
                required
                min="1"
              />
            </div>
          ))}
        </div>

        <button type="button" onClick={addItem}>Add Item</button>
        <button type="submit">Create Order</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Items</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.length > 0 ? (
            orders.map((o) => (
              <tr key={o.id}>
                <td>#{o.id}</td>
                <td>{customers && customers.find(c => c.id === o.customer_id)?.name || 'Unknown'}</td>
                <td>${o.total_amount ? o.total_amount.toFixed(2) : '0.00'}</td>
                <td>{o.items ? o.items.length : 0}</td>
                <td>
                  <button onClick={() => handleDelete(o.id)}>Cancel</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No orders yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
