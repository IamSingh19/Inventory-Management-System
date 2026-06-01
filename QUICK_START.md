# Quick Start Guide

## Local Development (No Docker)

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL 15+

### Backend Setup

```bash
cd backend
python -m venv venv

# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
```

Update `.env` with your PostgreSQL connection string:
```
DATABASE_URL=postgresql://user:password@localhost:5432/inventory_db
```

Start the backend:
```bash
uvicorn main:app --reload
```

Backend will be available at: http://localhost:8000
API docs: http://localhost:8000/docs

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend will be available at: http://localhost:3000

## Using Docker Compose

```bash
docker-compose up --build
```

This will start:
- PostgreSQL on port 5432
- Backend API on port 8000
- Frontend on port 3000

## Testing the API

```bash
cd backend
python test_api.py
```

This runs comprehensive tests for all endpoints and business logic.

## Project Structure

```
inventory-management/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── models.py            # SQLAlchemy ORM models
│   ├── schemas.py           # Pydantic request/response schemas
│   ├── database.py          # Database configuration
│   ├── routes/              # API route handlers
│   │   ├── products.py
│   │   ├── customers.py
│   │   └── orders.py
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── test_api.py
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Customers.jsx
│   │   │   └── Orders.jsx
│   │   ├── api.js           # Axios API client
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
├── docker-compose.yml
├── README.md
├── DEPLOYMENT.md
└── QUICK_START.md
```

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

## Features

✅ Product Management (CRUD)
✅ Customer Management (CRUD)
✅ Order Management with multi-item support
✅ Automatic stock deduction
✅ Dashboard with real-time stats
✅ Low stock alerts
✅ Responsive UI
✅ Full Docker containerization
✅ Production-ready error handling
✅ Input validation
✅ Unique constraints (SKU, Email)

## Next Steps

1. **Local Testing**: Run the application locally and test all features
2. **GitHub**: Push to GitHub repository
3. **Backend Deployment**: Deploy to Render
4. **Frontend Deployment**: Deploy to Vercel
5. **Integration Testing**: Test live URLs

See `DEPLOYMENT.md` for detailed deployment instructions.
