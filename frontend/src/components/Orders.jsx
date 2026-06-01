import React, { useState, useEffect } from 'react';
import { orderAPI, customerAPI, productAPI } from '../api';
import { getErrorMessage } from '../utils/errors';
import './Orders.css';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ customer_id: '', items: [{ product_id: '', quantity: '' }] });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetailsLoading, setOrderDetailsLoading] = useState(false);

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
    setError('');
    setSuccess('');

    const customerId = Number.parseInt(form.customer_id, 10);
    if (Number.isNaN(customerId)) {
      setError('Customer is required');
      return;
    }

    const items = form.items.map(item => ({
      product_id: Number.parseInt(item.product_id, 10),
      quantity: Number.parseInt(item.quantity, 10)
    }));

    if (items.some(item => Number.isNaN(item.product_id))) {
      setError('Product is required for every order item');
      return;
    }

    if (items.some(item => Number.isNaN(item.quantity) || item.quantity <= 0)) {
      setError('Quantity must be greater than 0 for every order item');
      return;
    }

    try {
      await orderAPI.create({
        customer_id: customerId,
        items
      });
      setForm({ customer_id: '', items: [{ product_id: '', quantity: '' }] });
      await loadOrders();
      await loadProducts();
      setSelectedOrder(null);
      setSuccess('Order created successfully');
    } catch (err) {
      setError(getErrorMessage(err, 'Error creating order'));
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Cancel this order?')) {
      setError('');
      setSuccess('');
      try {
        await orderAPI.delete(id);
        await loadOrders();
        await loadProducts();
        if (selectedOrder?.id === id) {
          setSelectedOrder(null);
        }
        setSuccess('Order canceled successfully');
      } catch (err) {
        setError(getErrorMessage(err, 'Failed to delete order'));
      }
    }
  };

  const handleViewDetails = async (id) => {
    setError('');
    setSuccess('');
    setOrderDetailsLoading(true);

    try {
      const res = await orderAPI.getById(id);
      setSelectedOrder(res.data);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to load order details'));
    } finally {
      setOrderDetailsLoading(false);
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

  const getCustomerName = (customerId) => {
    return customers.find(customer => customer.id === customerId)?.name || 'Unknown';
  };

  const getProductName = (productId) => {
    return products.find(product => product.id === productId)?.name || `Product #${productId}`;
  };

  const formatCurrency = (amount) => `$${Number(amount || 0).toFixed(2)}`;

  if (loading) {
    return <div className="orders"><p>Loading...</p></div>;
  }

  return (
    <div className="orders">
      <h2>Orders</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      
      <form onSubmit={handleSubmit} className="form" noValidate>
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
                <td>{getCustomerName(o.customer_id)}</td>
                <td>{formatCurrency(o.total_amount)}</td>
                <td>{o.items ? o.items.length : 0}</td>
                <td>
                  <button onClick={() => handleViewDetails(o.id)}>View Details</button>
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

      {orderDetailsLoading && <div className="details-panel">Loading order details...</div>}

      {selectedOrder && !orderDetailsLoading && (
        <section className="details-panel">
          <div className="details-header">
            <div>
              <h3>Order #{selectedOrder.id}</h3>
              <p>{getCustomerName(selectedOrder.customer_id)}</p>
            </div>
            <button type="button" onClick={() => setSelectedOrder(null)}>Close</button>
          </div>

          <div className="details-summary">
            <span>Total: {formatCurrency(selectedOrder.total_amount)}</span>
            <span>Items: {selectedOrder.items?.length || 0}</span>
          </div>

          <table className="details-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Line Total</th>
              </tr>
            </thead>
            <tbody>
              {(selectedOrder.items || []).map((item) => (
                <tr key={item.id}>
                  <td>{getProductName(item.product_id)}</td>
                  <td>{item.quantity}</td>
                  <td>{formatCurrency(item.price)}</td>
                  <td>{formatCurrency(item.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}
