Premium eCommerce Platform

A production-ready full-stack eCommerce platform built with modern technologies, featuring a scalable architecture, secure authentication, and a premium user experience.

Tech Stack

Frontend

Next.js (App Router)
TypeScript
Tailwind CSS
Framer Motion
Zustand
Axios

Backend

Node.js
Express.js
PostgreSQL
Prisma ORM
JWT Authentication
Bcrypt

DevOps

Docker
Docker Compose
Environment-based configuration
Features

Customer

Product browsing and filtering
Product variants (size, color)
Shopping cart (persistent)
Secure checkout
Order history
Authentication (Register/Login)
Fully responsive design

Admin

Product management
Category management
Order management
User management
Installation
Using Docker (Recommended)
git clone <repository-url>
cd ecommerce-platform
docker-compose up --build

Services

Frontend: http://localhost:3000
Backend: http://localhost:5000/api
Health: http://localhost:5000/health
Local Development

Backend

cd backend
npm install
npm run prisma:migrate
npm run prisma:seed
npm run dev

Frontend

cd frontend
npm install
npm run dev
Environment Variables

Backend .env:

DATABASE_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=
FRONTEND_URL=
NODE_ENV=

Frontend .env.local:

NEXT_PUBLIC_API_URL=
Database Models
User
Category
Product
ProductVariant
Cart
CartItem
Order
OrderItem
Wishlist (optional)
API Overview

Auth

POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout

Products

GET    /api/products
GET    /api/products/featured
GET    /api/products/:slug
POST   /api/products        (Admin)
PUT    /api/products/:id    (Admin)
DELETE /api/products/:id    (Admin)

Cart

GET    /api/cart
POST   /api/cart/items
PUT    /api/cart/items/:itemId
DELETE /api/cart/items/:itemId
DELETE /api/cart

Orders

GET    /api/orders
GET    /api/orders/:id
POST   /api/orders
GET    /api/orders/all      (Admin)
PATCH  /api/orders/:id/status (Admin)
Production Build

Backend

cd backend
npm run build
npm start

Frontend

cd frontend
npm run build
npm start
Security
JWT authentication (access + refresh)
HTTP-only cookies
Password hashing (bcrypt)
Role-based access control
Rate limiting
Helmet security headers
Input validation
License

MIT License