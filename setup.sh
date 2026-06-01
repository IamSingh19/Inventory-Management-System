#!/bin/bash
# Local development setup script

echo "Setting up Inventory Management System..."

# Backend setup
echo "Setting up backend..."
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
echo "Backend setup complete!"

# Frontend setup
echo "Setting up frontend..."
cd ../frontend
npm install
cp .env.example .env
echo "Frontend setup complete!"

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start development:"
echo "1. Backend: cd backend && source venv/bin/activate && uvicorn main:app --reload"
echo "2. Frontend: cd frontend && npm run dev"
echo ""
echo "Or use Docker Compose:"
echo "docker-compose up --build"
