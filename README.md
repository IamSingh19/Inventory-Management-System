# Inventory & Order Management System

A production-ready full-stack application for managing products, customers, orders, and inventory with a React frontend, FastAPI backend, and PostgreSQL database.

## Features

- **Product Management**: Create, read, update, and delete products with SKU and inventory tracking.
- **Customer Management**: Create, list, view, and delete customers with unique email validation.
- **Order Management**: Create, view, and cancel orders with automatic stock deduction and total calculation.
- **Dashboard**: Summary statistics for products, customers, orders, and low-stock products.
- **Responsive UI**: Mobile-friendly interface with form validation, error messages, and success messages.
- **Docker Containerization**: Full Docker and Docker Compose setup for local and deployment workflows.

## Tech Stack

- **Backend**: Python, FastAPI, SQLAlchemy, PostgreSQL
- **Frontend**: React, Vite, Axios
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose

## Local Development

### Prerequisites

- Docker and Docker Compose
- Or: Python 3.11+, Node.js 18+, PostgreSQL 15+

### Using Docker Compose

```bash
cp .env.example .env
docker-compose up --build
```

Access the local application:

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Manual Setup

Backend:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload
```

Frontend:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Deployment Links

- GitHub Repository: https://github.com/IamSingh19/Inventory-Management-System
- Live Frontend: https://inventory-management-system-lovat-delta.vercel.app
- Live Backend API: https://inventory-management-sys-b6po.onrender.com
- Live API Docs: https://inventory-management-sys-b6po.onrender.com/docs
- Docker Hub Backend Image: https://hub.docker.com/r/iamsingh1906/inventory-backend

## API Endpoints

### Products

- `POST /products` - Create product
- `GET /products` - List all products
- `GET /products/{id}` - Get product details
- `PUT /products/{id}` - Update product
- `DELETE /products/{id}` - Delete product

### Customers

- `POST /customers` - Create customer
- `GET /customers` - List all customers
- `GET /customers/{id}` - Get customer details
- `DELETE /customers/{id}` - Delete customer

### Orders

- `POST /orders` - Create order
- `GET /orders` - List all orders
- `GET /orders/{id}` - Get order details
- `DELETE /orders/{id}` - Cancel order

### Stats

- `GET /stats` - Get dashboard statistics
- `GET /health` - Health check

## Business Logic

- Product SKU must be unique.
- Customer email must be unique.
- Product quantity must be greater than 0.
- Orders cannot be placed if inventory is insufficient.
- Creating an order automatically reduces available stock.
- Order total is calculated automatically by the backend.
- Canceling an order restores stock.
- APIs validate request data and return appropriate HTTP status codes.

## Environment Variables

The project uses environment variables for database, API, and CORS configuration. Copy `.env.example` to `.env` for Docker Compose, and configure hosting-provider environment variables for deployed services.

Required variables:

- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`
- `DATABASE_URL`
- `SECRET_KEY`
- `CORS_ORIGINS`
- `VITE_API_URL`

## Project Structure

```text
.
|-- backend/
|   |-- main.py
|   |-- models.py
|   |-- schemas.py
|   |-- database.py
|   |-- routes/
|   |-- requirements.txt
|   |-- Dockerfile
|   `-- .dockerignore
|-- frontend/
|   |-- src/
|   |   |-- components/
|   |   |-- utils/
|   |   |-- api.js
|   |   |-- App.jsx
|   |   |-- main.jsx
|   |   `-- index.css
|   |-- index.html
|   |-- vite.config.js
|   |-- package.json
|   |-- Dockerfile
|   `-- .dockerignore
|-- .env.example
|-- docker-compose.yml
`-- README.md
```

## License

MIT
