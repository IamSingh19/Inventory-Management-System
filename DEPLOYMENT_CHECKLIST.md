# Deployment Checklist

## Pre-Deployment

- [ ] All code committed to Git
- [ ] GitHub repository created and code pushed
- [ ] Environment variables documented
- [ ] Database schema verified
- [ ] API endpoints tested locally
- [ ] Frontend tested locally
- [ ] Docker images build successfully

## Backend Deployment (Render)

### Step 1: Create Render Account
- [ ] Sign up at https://render.com
- [ ] Verify email

### Step 2: Connect GitHub
- [ ] Go to Render Dashboard
- [ ] Click "New +" → "Web Service"
- [ ] Select "Connect a repository"
- [ ] Authorize GitHub and select your repository

### Step 3: Configure Backend Service
- [ ] **Name**: `inventory-api`
- [ ] **Environment**: Python 3
- [ ] **Region**: Choose closest to your users
- [ ] **Branch**: main
- [ ] **Build Command**: `pip install -r requirements.txt`
- [ ] **Start Command**: `uvicorn main:app --host 0.0.0.0 --port 8000`
- [ ] **Root Directory**: `backend`

### Step 4: Set Environment Variables
In Render dashboard, add:
```
DATABASE_URL=postgresql://[user]:[password]@[host]:[port]/[database]
SECRET_KEY=[generate-random-secure-key]
DEBUG=False
```

### Step 5: Create PostgreSQL Database
Option A: Use Render PostgreSQL
- [ ] In Render, click "New +" → "PostgreSQL"
- [ ] Configure database
- [ ] Copy connection string to `DATABASE_URL`

Option B: Use External Database (Neon, Railway, etc.)
- [ ] Create PostgreSQL instance
- [ ] Copy connection string to `DATABASE_URL`

### Step 6: Deploy
- [ ] Click "Create Web Service"
- [ ] Wait for deployment to complete
- [ ] Check logs for errors
- [ ] Test health endpoint: `https://your-api.onrender.com/health`
- [ ] Test API docs: `https://your-api.onrender.com/docs`

### Step 7: Verify Backend
- [ ] Health check returns 200
- [ ] API documentation loads
- [ ] Can create a product via API
- [ ] Can create a customer via API
- [ ] Can create an order via API
- [ ] Stats endpoint returns data

## Frontend Deployment (Vercel)

### Step 1: Create Vercel Account
- [ ] Sign up at https://vercel.com
- [ ] Verify email

### Step 2: Import Project
- [ ] Go to Vercel Dashboard
- [ ] Click "Add New..." → "Project"
- [ ] Select "Import Git Repository"
- [ ] Select your GitHub repository

### Step 3: Configure Frontend
- [ ] **Framework Preset**: Vite
- [ ] **Root Directory**: `frontend`
- [ ] **Build Command**: `npm run build`
- [ ] **Output Directory**: `dist`
- [ ] **Install Command**: `npm ci`

### Step 4: Set Environment Variables
Add in Vercel:
```
VITE_API_URL=https://your-api.onrender.com
```

### Step 5: Deploy
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete
- [ ] Check build logs for errors
- [ ] Visit your Vercel URL

### Step 6: Verify Frontend
- [ ] Frontend loads without errors
- [ ] Navigation works
- [ ] Dashboard displays stats
- [ ] Can create a product
- [ ] Can create a customer
- [ ] Can create an order
- [ ] Can view all items

## Integration Testing

### Test Product Management
- [ ] Create product with valid data
- [ ] Verify SKU uniqueness constraint
- [ ] Update product quantity
- [ ] Delete product
- [ ] Verify product appears in dashboard

### Test Customer Management
- [ ] Create customer with valid data
- [ ] Verify email uniqueness constraint
- [ ] Delete customer
- [ ] Verify customer appears in dashboard

### Test Order Management
- [ ] Create order with valid customer and product
- [ ] Verify stock is deducted
- [ ] Verify order total is calculated correctly
- [ ] Create order with multiple items
- [ ] Cancel order and verify stock is restored
- [ ] Verify insufficient stock error

### Test Dashboard
- [ ] Total products count is correct
- [ ] Total customers count is correct
- [ ] Total orders count is correct
- [ ] Low stock products count is correct
- [ ] Stats update in real-time

### Test Error Handling
- [ ] Invalid product data shows error
- [ ] Duplicate SKU shows error
- [ ] Duplicate email shows error
- [ ] Insufficient stock shows error
- [ ] Invalid customer ID shows error
- [ ] Invalid product ID shows error

## Post-Deployment

- [ ] Document live URLs
- [ ] Share URLs with stakeholders
- [ ] Monitor error logs
- [ ] Set up monitoring/alerts
- [ ] Plan backup strategy
- [ ] Document scaling considerations
- [ ] Create runbook for common issues

## Live URLs

After deployment, update these:

**Backend API**: https://your-api.onrender.com
**Frontend**: https://your-frontend.vercel.app
**API Documentation**: https://your-api.onrender.com/docs

## Troubleshooting

### Backend won't start
- Check Render logs
- Verify DATABASE_URL format
- Ensure all environment variables are set
- Check Python version compatibility

### Frontend can't connect to backend
- Verify VITE_API_URL is correct
- Check CORS settings in backend
- Verify backend is running
- Check browser console for errors

### Database connection errors
- Verify DATABASE_URL is correct
- Check database is running
- Verify firewall allows connections
- Check credentials are correct

### Deployment fails
- Check build logs
- Verify all dependencies are in requirements.txt
- Check for syntax errors
- Verify file paths are correct

## Rollback Plan

If deployment fails:
1. Check error logs
2. Fix the issue locally
3. Commit and push to GitHub
4. Redeploy from Render/Vercel dashboard
5. Or revert to previous commit if needed

## Performance Optimization

- [ ] Enable caching headers
- [ ] Optimize database queries
- [ ] Use connection pooling
- [ ] Monitor response times
- [ ] Set up CDN for static assets
- [ ] Consider adding Redis for caching

## Security Checklist

- [ ] Change SECRET_KEY to secure random value
- [ ] Set DEBUG=False in production
- [ ] Use HTTPS (automatic on Vercel/Render)
- [ ] Validate all inputs
- [ ] Use parameterized queries (SQLAlchemy does this)
- [ ] Implement rate limiting if needed
- [ ] Regular security updates
- [ ] Monitor for suspicious activity
