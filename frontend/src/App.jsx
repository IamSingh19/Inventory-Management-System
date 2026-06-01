import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Customers from './components/Customers';
import Orders from './components/Orders';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <Products />;
      case 'customers':
        return <Customers />;
      case 'orders':
        return <Orders />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <nav>
        <h1>📦 Inventory</h1>
        <ul>
          <li>
            <button
              className={currentPage === 'dashboard' ? 'active' : ''}
              onClick={() => setCurrentPage('dashboard')}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              className={currentPage === 'products' ? 'active' : ''}
              onClick={() => setCurrentPage('products')}
            >
              Products
            </button>
          </li>
          <li>
            <button
              className={currentPage === 'customers' ? 'active' : ''}
              onClick={() => setCurrentPage('customers')}
            >
              Customers
            </button>
          </li>
          <li>
            <button
              className={currentPage === 'orders' ? 'active' : ''}
              onClick={() => setCurrentPage('orders')}
            >
              Orders
            </button>
          </li>
        </ul>
      </nav>
      <div className="main-content">
        <div className="container">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default App;
