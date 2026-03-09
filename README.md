# Premium eCommerce Platform

A production-level full-stack eCommerce platform built with modern technologies, featuring a Nike-inspired design with premium UX and scalable architecture.

## 🚀 Tech Stack

### Frontend
- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Zustand** (state management)
- **Axios** (API layer)

### Backend
- **Node.js** with **Express.js**
- **TypeScript**
- **PostgreSQL** database
- **Prisma ORM**
- **JWT** authentication
- **Bcrypt** password hashing

### DevOps
- **Docker** & **Docker Compose**
- Environment variables configuration
- Production-ready build scripts

## ✨ Features

### Customer Features
- 🏠 Modern homepage with hero section and featured products
- 🛍️ Product listing with advanced filters (category, price, size, color)
- 🔍 Product detail pages with image gallery and variant selection
- 🛒 Persistent shopping cart (database-stored)
- 💳 Checkout flow with order management
- 📦 Order history and tracking
- 🔐 User authentication (register/login)
- 📱 Fully responsive design
- ✨ Smooth animations and transitions

### Admin Features
- 📊 Product management (CRUD operations)
- 📁 Category management
- 📋 Order management with status updates
- 👥 User management

## 📦 Installation & Setup

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- PostgreSQL (if running locally without Docker)

### Quick Start with Docker

1. **Clone the repository**
```bash
git clone <repository-url>
cd ecommerce-platform
```

2. **Start all services**
```bash
docker-compose up --build
```

This will:
- Start PostgreSQL database
- Run database migrations
- Seed initial data
- Start backend API on http://localhost:5000
- Start frontend on http://localhost:3000

3. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/health

### Local Development Setup

#### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
# .env file is already configured
# Update DATABASE_URL if needed
```

4. **Run database migrations**
```bash
npm run prisma:migrate
```

5. **Seed the database**
```bash
npm run prisma:seed
```

6. **Start development server**
```bash
npm run dev
```

Backend will run on http://localhost:5000

#### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
# .env.local is already configured
# Update NEXT_PUBLIC_API_URL if needed
```

4. **Start development server**
```bash
npm run dev
```

Frontend will run on http://localhost:3000

## 🗄️ Database Schema

The application uses a relational PostgreSQL database with the following models:

- **User** - User accounts with role-based access
- **Category** - Product categories with hierarchy support
- **Product** - Product information
- **ProductVariant** - Size/color variants with stock tracking
- **Cart** - User shopping carts
- **CartItem** - Items in cart
- **Order** - Customer orders
- **OrderItem** - Items in orders
- **Wishlist** - User wishlists (optional feature)
- **WishlistItem** - Items in wishlist

## 🔐 Default Credentials

After seeding, you can login with:

**Admin Account:**
- Email: admin@ecommerce.com
- Password: admin123

**Test User Account:**
- Email: user@example.com
- Password: user123

## 📁 Project Structure

```
ecommerce-platform/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── services/         # Business logic
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Auth, validation, error handling
│   │   ├── config/           # Database configuration
│   │   └── utils/            # Helper functions
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema
│   │   └── seed.ts           # Seed data
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── app/              # Next.js pages (App Router)
│   │   ├── components/       # React components
│   │   ├── lib/              # Utilities and API client
│   │   └── store/            # Zustand state management
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:slug` - Get product by slug
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:slug` - Get category by slug
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/:itemId` - Update cart item
- `DELETE /api/cart/items/:itemId` - Remove cart item
- `DELETE /api/cart` - Clear cart

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create order
- `GET /api/orders/all` - Get all orders (Admin)
- `PATCH /api/orders/:id/status` - Update order status (Admin)

## 🎨 Design Features

- Clean, modern Nike-inspired design
- Premium spacing and typography
- Smooth page transitions with Framer Motion
- Responsive mobile-first layout
- Optimized images with Next.js Image component
- Loading states and skeletons
- Error handling with user-friendly messages

## 🔒 Security Features

- JWT access and refresh tokens
- HTTP-only cookies for refresh tokens
- Password hashing with bcrypt
- Role-based access control
- Rate limiting
- CORS configuration
- Helmet.js security headers
- Input validation with Zod

## 📊 Performance Optimizations

- Server-side rendering with Next.js
- Image optimization
- Code splitting
- Lazy loading
- Database indexing
- Connection pooling with Prisma

## 🧪 Testing

```bash
# Backend
cd backend
npm run lint

# Frontend
cd frontend
npm run lint
```

## 🚀 Production Deployment

### Build for Production

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

### Environment Variables for Production

Update the following in production:
- `JWT_SECRET` - Strong random secret
- `JWT_REFRESH_SECRET` - Strong random secret
- `DATABASE_URL` - Production database URL
- `FRONTEND_URL` - Production frontend URL
- `NODE_ENV=production`

## 📝 Additional Features (Optional)

- Stripe payment integration
- Wishlist functionality
- Dark mode support
- Product reviews and ratings
- Email notifications
- Admin dashboard UI
- Analytics integration

## 🤝 Contributing

This is a production-ready template. Feel free to customize and extend based on your needs.

## 📄 License

MIT License - feel free to use this project for commercial purposes.

---

Built with ❤️ using modern web technologies
