# Inventory & Order Management System

A production-ready full-stack application for managing products, customers, and orders with a React frontend, FastAPI backend, and PostgreSQL database.

## Features

- **Product Management**: Create, read, update, delete products with SKU and inventory tracking
- **Customer Management**: Manage customer information with unique email validation
- **Order Management**: Create orders with automatic stock deduction and total calculation
- **Dashboard**: Real-time statistics including low stock alerts
- **Responsive UI**: Mobile-friendly interface with clean design
- **Docker Containerization**: Full Docker and Docker Compose setup for easy deployment

## Tech Stack

- **Backend**: Python, FastAPI, SQLAlchemy, PostgreSQL
- **Frontend**: React, Vite, Axios
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose

## Local Development

### Prerequisites
- Docker and Docker Compose installed
- Or: Python 3.11+, Node.js 18+, PostgreSQL 15+

### Using Docker Compose (Recommended)

```bash
docker-compose up --build
```

Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Manual Setup

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
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

## Business Logic

- Product SKU must be unique
- Customer email must be unique
- Product quantity cannot be negative
- Orders cannot be placed if inventory is insufficient
- Creating an order automatically reduces available stock
- Order total is calculated automatically by the backend
- Canceling an order restores stock

## Deployment

### Backend (Render)
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set environment variables:
   - `DATABASE_URL`: PostgreSQL connection string
   - `SECRET_KEY`: Random secret key
5. Deploy

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Set environment variable:
   - `VITE_API_URL`: Backend API URL
4. Deploy

## Project Structure

```
.
├── backend/
│   ├── main.py           # FastAPI app
│   ├── models.py         # SQLAlchemy models
│   ├── schemas.py        # Pydantic schemas
│   ├── database.py       # Database configuration
│   ├── routes/           # API route handlers
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .dockerignore
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── api.js        # API client
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── Dockerfile
│   └── .dockerignore
├── docker-compose.yml
└── README.md
```

## License

MIT
