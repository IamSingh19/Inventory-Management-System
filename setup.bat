@echo off
REM Local development setup script for Windows

echo Setting up Inventory Management System...

REM Backend setup
echo Setting up backend...
cd backend
python -m venv venv
call venv\Scripts\activate.bat
pip install -r requirements.txt
copy .env.example .env
echo Backend setup complete!

REM Frontend setup
echo Setting up frontend...
cd ..\frontend
call npm install
copy .env.example .env
echo Frontend setup complete!

echo.
echo Setup complete!
echo.
echo To start development:
echo 1. Backend: cd backend && venv\Scripts\activate && uvicorn main:app --reload
echo 2. Frontend: cd frontend && npm run dev
echo.
echo Or use Docker Compose:
echo docker-compose up --build
