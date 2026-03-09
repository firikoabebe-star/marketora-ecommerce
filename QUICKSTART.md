# Quick Start Guide

Get your eCommerce platform running in 5 minutes!

## 🚀 Option 1: Docker (Recommended)

### Prerequisites
- Docker Desktop installed
- 4GB RAM available
- Ports 3000, 5000, 5432 available

### Steps

**Windows:**
```powershell
# Run the setup script
.\setup.ps1
```

**Mac/Linux:**
```bash
# Make script executable
chmod +x setup.sh

# Run the setup script
./setup.sh
```

**Manual Docker Setup:**
```bash
# Start all services
docker-compose up -d --build

# Wait 10 seconds for database to initialize

# Run migrations
docker-compose exec backend npx prisma migrate deploy

# Seed database
docker-compose exec backend npx prisma db seed
```

### Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/health

### Default Login Credentials

**Admin Account:**
- Email: `admin@ecommerce.com`
- Password: `admin123`

**Test User:**
- Email: `user@example.com`
- Password: `user123`

---

## 💻 Option 2: Local Development

### Prerequisites
- Node.js 20+
- PostgreSQL 16+
- npm or yarn

### Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Setup database (make sure PostgreSQL is running)
# Update DATABASE_URL in .env if needed

# Run migrations
npm run prisma:migrate

# Seed database
npm run prisma:seed

# Start development server
npm run dev
```

Backend runs on: http://localhost:5000

### Frontend Setup

```bash
# Open new terminal
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on: http://localhost:3000

---

## 🧪 Test the Application

### 1. Browse Products
- Visit http://localhost:3000
- Click "Shop Now" or navigate to "All Products"
- Try filtering by category, price, size, color

### 2. Register & Login
- Click "Register" in the navigation
- Create a new account
- Or use the test credentials above

### 3. Add to Cart
- Click on any product
- Select size and color
- Click "Add to Cart"
- View cart from the cart icon

### 4. Checkout
- Go to cart
- Click "Proceed to Checkout"
- Fill in shipping information
- Place order

### 5. View Orders
- Click "Orders" in navigation
- See your order history
- Click on an order to view details

### 6. Admin Features (Login as admin)
- Create products via API
- Manage categories
- Update order status
- View all orders

---

## 📊 View Database

### Using Prisma Studio
```bash
cd backend
npm run prisma:studio
```

Opens at: http://localhost:5555

### Using psql
```bash
# Connect to database
docker-compose exec postgres psql -U postgres -d ecommerce_db

# Or locally
psql -U postgres -d ecommerce_db
```

---

## 🛠️ Common Commands

### Docker Commands
```bash
# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Restart services
docker-compose restart

# Rebuild and restart
docker-compose up -d --build

# Remove all data (including database)
docker-compose down -v
```

### Backend Commands
```bash
cd backend

# Development
npm run dev

# Build for production
npm run build

# Start production
npm start

# Run migrations
npm run prisma:migrate

# Seed database
npm run prisma:seed

# Open Prisma Studio
npm run prisma:studio

# Lint code
npm run lint

# Format code
npm run format
```

### Frontend Commands
```bash
cd frontend

# Development
npm run dev

# Build for production
npm run build

# Start production
npm start

# Lint code
npm run lint

# Format code
npm run format
```

---

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000  # Mac/Linux
netstat -ano | findstr :3000  # Windows

# Kill the process or change port in docker-compose.yml
```

### Database Connection Error
```bash
# Check if PostgreSQL is running
docker-compose ps

# Restart database
docker-compose restart postgres

# Check logs
docker-compose logs postgres
```

### Frontend Can't Connect to Backend
- Verify backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in frontend/.env.local
- Check CORS settings in backend

### Prisma Migration Errors
```bash
# Reset database (WARNING: deletes all data)
cd backend
npx prisma migrate reset

# Then seed again
npm run prisma:seed
```

### Docker Build Errors
```bash
# Clean Docker cache
docker system prune -a

# Rebuild from scratch
docker-compose build --no-cache
docker-compose up -d
```

---

## 📱 Test on Mobile

### Using ngrok (expose localhost)
```bash
# Install ngrok
npm install -g ngrok

# Expose frontend
ngrok http 3000

# Update NEXT_PUBLIC_API_URL to use ngrok backend URL
```

### Using Local Network
```bash
# Find your local IP
ipconfig  # Windows
ifconfig  # Mac/Linux

# Access from mobile browser
http://YOUR_IP:3000
```

---

## 🎯 Next Steps

1. **Customize Design**
   - Update colors in `frontend/tailwind.config.ts`
   - Modify components in `frontend/src/components`
   - Add your logo and branding

2. **Add Features**
   - Implement Stripe payments
   - Add product reviews
   - Create admin dashboard UI
   - Add email notifications

3. **Deploy to Production**
   - See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed guide
   - Update environment variables
   - Setup SSL certificates
   - Configure domain

4. **Optimize Performance**
   - Add Redis caching
   - Setup CDN
   - Optimize images
   - Add monitoring

---

## 📚 Documentation

- [README.md](README.md) - Project overview
- [API.md](API.md) - API documentation
- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture
- [FEATURES.md](FEATURES.md) - Feature documentation
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide

---

## 🆘 Need Help?

- Check the troubleshooting section above
- Review the logs: `docker-compose logs -f`
- Verify environment variables
- Ensure all ports are available
- Check database connection

---

Happy coding! 🚀
