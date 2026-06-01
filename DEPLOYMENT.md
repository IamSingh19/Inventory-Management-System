# Deployment Guide

## Prerequisites
- GitHub account
- Render account (for backend)
- Vercel account (for frontend)
- Docker Hub account (optional, for image hosting)

## Step 1: Push to GitHub

```bash
# Initialize GitHub repo (if not already done)
git remote add origin https://github.com/YOUR_USERNAME/inventory-management.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy Backend to Render

1. Go to [render.com](https://render.com)
2. Sign up/Login
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: inventory-api
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port 8000`
   - **Root Directory**: `backend`

6. Add Environment Variables:
   ```
   DATABASE_URL=postgresql://[user]:[password]@[host]:[port]/[database]
   SECRET_KEY=[generate-random-key]
   DEBUG=False
   ```

7. Click "Create Web Service"

### Getting PostgreSQL URL for Render

Option A: Use Render's PostgreSQL
1. In Render dashboard, click "New +" → "PostgreSQL"
2. Configure database
3. Copy the connection string to `DATABASE_URL`

Option B: Use external PostgreSQL (e.g., Neon, Railway)
1. Create PostgreSQL instance on your chosen provider
2. Copy connection string to `DATABASE_URL`

## Step 3: Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login
3. Click "Add New..." → "Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

6. Add Environment Variables:
   ```
   VITE_API_URL=https://your-render-backend-url.onrender.com
   ```

7. Click "Deploy"

## Step 4: Update Frontend API URL

After backend is deployed:
1. Go to Vercel project settings
2. Update `VITE_API_URL` to your Render backend URL
3. Redeploy

## Step 5: Test Integration

1. Visit your Vercel frontend URL
2. Create a test product
3. Create a test customer
4. Create a test order
5. Verify dashboard stats update

## Troubleshooting

### Backend won't start
- Check logs in Render dashboard
- Verify DATABASE_URL is correct
- Ensure all environment variables are set

### Frontend can't connect to backend
- Check VITE_API_URL in Vercel environment variables
- Verify backend is running and accessible
- Check browser console for CORS errors

### Database connection errors
- Verify DATABASE_URL format
- Check database is running
- Ensure firewall allows connections

## Production Checklist

- [ ] Change SECRET_KEY to a secure random value
- [ ] Set DEBUG=False
- [ ] Configure proper database backups
- [ ] Set up monitoring/alerts
- [ ] Enable HTTPS (automatic on Vercel/Render)
- [ ] Configure CORS properly for production domain
- [ ] Test all CRUD operations
- [ ] Verify error handling works
- [ ] Test with multiple concurrent users

## Scaling Considerations

- Use connection pooling for database
- Add caching layer (Redis)
- Implement rate limiting
- Add API authentication if needed
- Monitor performance metrics
