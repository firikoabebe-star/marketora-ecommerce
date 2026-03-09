# 🚀 START HERE

Welcome to your production-ready eCommerce platform! This guide will get you up and running in minutes.

## ⚡ Quick Start (Choose One)

### Option A: Docker (Easiest - Recommended)

**Windows:**
```powershell
.\setup.ps1
```

**Mac/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

**That's it!** Your application will be running at:
- 🌐 Frontend: http://localhost:3000
- 🔧 Backend: http://localhost:5000

### Option B: Manual Setup

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## 🎯 First Steps

### 1. Open the Application
Visit http://localhost:3000 in your browser

### 2. Login with Test Account
```
Email: user@example.com
Password: user123
```

Or create a new account by clicking "Register"

### 3. Try These Features
- ✅ Browse products
- ✅ Filter by category, price, size, color
- ✅ View product details
- ✅ Add items to cart
- ✅ Complete checkout
- ✅ View order history

### 4. Test Admin Features
Login as admin:
```
Email: admin@ecommerce.com
Password: admin123
```

Use API endpoints to:
- Create products
- Manage categories
- Update order status
- View all orders

## 📚 Documentation Guide

| Read This | When You Need To |
|-----------|------------------|
| [QUICKSTART.md](QUICKSTART.md) | Get detailed setup instructions |
| [API.md](API.md) | Understand API endpoints |
| [FEATURES.md](FEATURES.md) | Learn about all features |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Understand system design |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Deploy to production |
| [TESTING.md](TESTING.md) | Test the application |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Get project overview |

## 🛠️ Common Tasks

### View Database
```bash
cd backend
npm run prisma:studio
```
Opens at http://localhost:5555

### View Logs
```bash
docker-compose logs -f
```

### Stop Application
```bash
docker-compose down
```

### Restart Application
```bash
docker-compose restart
```

### Reset Database (Warning: Deletes all data)
```bash
cd backend
npx prisma migrate reset
npm run prisma:seed
```

## 🎨 Customize Your Store

### 1. Update Branding
- Edit `frontend/src/components/layout/Navbar.tsx` (change "STORE" to your brand)
- Update colors in `frontend/tailwind.config.ts`
- Add your logo

### 2. Add Products
Use the API or Prisma Studio to add your products:
```bash
cd backend
npm run prisma:studio
```

### 3. Configure Categories
Update categories to match your business:
- Edit `backend/prisma/seed.ts`
- Run `npm run prisma:seed`

### 4. Update Environment Variables
- Backend: `backend/.env`
- Frontend: `frontend/.env.local`

## 🚨 Troubleshooting

### Port Already in Use
```bash
# Stop the application
docker-compose down

# Or change ports in docker-compose.yml
```

### Database Connection Error
```bash
# Restart database
docker-compose restart postgres

# Check logs
docker-compose logs postgres
```

### Frontend Can't Connect to Backend
- Verify backend is running: http://localhost:5000/health
- Check `NEXT_PUBLIC_API_URL` in `frontend/.env.local`

### Need to Start Fresh
```bash
# Remove all containers and data
docker-compose down -v

# Run setup again
.\setup.ps1  # Windows
./setup.sh   # Mac/Linux
```

## 📱 Test on Mobile

### Find Your Local IP
**Windows:**
```powershell
ipconfig
```

**Mac/Linux:**
```bash
ifconfig
```

### Access from Mobile
```
http://YOUR_IP:3000
```

## 🎯 Next Steps

### For Development
1. ✅ Explore the codebase
2. ✅ Read the documentation
3. ✅ Customize the design
4. ✅ Add your products
5. ✅ Test all features

### For Production
1. ✅ Read [DEPLOYMENT.md](DEPLOYMENT.md)
2. ✅ Update environment variables
3. ✅ Setup domain and SSL
4. ✅ Configure payment gateway
5. ✅ Setup email service
6. ✅ Add monitoring
7. ✅ Deploy!

## 🆘 Need Help?

### Check These First
1. Is Docker running?
2. Are ports 3000, 5000, 5432 available?
3. Did you run the setup script?
4. Are there any errors in the logs?

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Verify Services
```bash
# Check running containers
docker-compose ps

# Check health
curl http://localhost:5000/health
```

## 📊 Project Structure

```
ecommerce-platform/
├── backend/           # Express.js API
├── frontend/          # Next.js App
├── docker-compose.yml # Container setup
├── setup.sh          # Setup script (Mac/Linux)
├── setup.ps1         # Setup script (Windows)
└── *.md              # Documentation
```

## 🎓 What You Have

✅ Full-stack TypeScript application  
✅ Modern React with Next.js 14  
✅ RESTful API with Express.js  
✅ PostgreSQL database  
✅ JWT authentication  
✅ Shopping cart & checkout  
✅ Order management  
✅ Admin capabilities  
✅ Responsive design  
✅ Docker containerization  
✅ Production-ready code  
✅ Comprehensive documentation  

## 🚀 Ready to Build?

Your eCommerce platform is ready! Start by exploring the application, then dive into the code to customize it for your needs.

**Happy coding!** 🎉

---

**Quick Links:**
- 🌐 Frontend: http://localhost:3000
- 🔧 Backend: http://localhost:5000
- 💾 Database: http://localhost:5555 (Prisma Studio)
- 📚 [Full Documentation](README.md)

**Default Credentials:**
- Admin: admin@ecommerce.com / admin123
- User: user@example.com / user123
