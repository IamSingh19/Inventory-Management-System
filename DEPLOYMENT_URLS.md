# Deployment URLs

Update this file after deployment with your live URLs.

## GitHub Repository
```
https://github.com/YOUR_USERNAME/inventory-management
```

## Backend (Render)
```
API URL: https://your-api.onrender.com
API Docs: https://your-api.onrender.com/docs
Health Check: https://your-api.onrender.com/health
```

## Frontend (Vercel)
```
Frontend URL: https://your-frontend.vercel.app
```

## Database
```
Provider: [Render PostgreSQL / Neon / Railway / Other]
Connection String: [Your DATABASE_URL]
```

## Docker Hub (Optional)
```
Backend Image: docker.io/YOUR_USERNAME/inventory-api:latest
Frontend Image: docker.io/YOUR_USERNAME/inventory-frontend:latest
```

## Testing URLs

### Test Product Creation
```bash
curl -X POST https://your-api.onrender.com/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "sku": "TEST-001",
    "price": 99.99,
    "quantity": 10
  }'
```

### Test Health Check
```bash
curl https://your-api.onrender.com/health
```

### Test Stats
```bash
curl https://your-api.onrender.com/stats
```

## Deployment Dates

- Backend Deployed: [Date]
- Frontend Deployed: [Date]
- Last Updated: [Date]

## Environment Variables Set

### Backend (Render)
- [ ] DATABASE_URL
- [ ] SECRET_KEY
- [ ] DEBUG=False

### Frontend (Vercel)
- [ ] VITE_API_URL

## Verification Checklist

- [ ] Backend health check returns 200
- [ ] API documentation loads
- [ ] Frontend loads without errors
- [ ] Can create a product
- [ ] Can create a customer
- [ ] Can create an order
- [ ] Dashboard displays stats
- [ ] Stock deduction works
- [ ] Order cancellation restores stock
- [ ] Error handling works

## Support

For issues or questions:
1. Check logs in Render dashboard
2. Check build logs in Vercel
3. Review DEPLOYMENT.md for troubleshooting
4. Check browser console for frontend errors
