# Architecture Documentation

## 🏗️ System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Next.js 14 Frontend (React + TypeScript)            │  │
│  │  - App Router                                         │  │
│  │  - Server Components                                  │  │
│  │  - Client Components                                  │  │
│  │  - Zustand State Management                          │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/HTTPS
                              │ REST API
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Application Layer                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Express.js Backend (Node.js + TypeScript)           │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐    │  │
│  │  │Controllers │  │ Services   │  │Middleware  │    │  │
│  │  └────────────┘  └────────────┘  └────────────┘    │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐    │  │
│  │  │   Routes   │  │   Utils    │  │   Config   │    │  │
│  │  └────────────┘  └────────────┘  └────────────┘    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Prisma ORM
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        Data Layer                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  PostgreSQL Database                                  │  │
│  │  - Users, Products, Orders, Cart                     │  │
│  │  - Categories, Variants, Wishlist                    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

### Backend Architecture

```
backend/
├── src/
│   ├── controllers/          # Request handlers
│   │   ├── auth.controller.ts
│   │   ├── product.controller.ts
│   │   ├── cart.controller.ts
│   │   ├── order.controller.ts
│   │   └── category.controller.ts
│   │
│   ├── services/             # Business logic
│   │   ├── auth.service.ts
│   │   ├── product.service.ts
│   │   ├── cart.service.ts
│   │   ├── order.service.ts
│   │   └── category.service.ts
│   │
│   ├── routes/               # API routes
│   │   ├── index.ts
│   │   ├── auth.routes.ts
│   │   ├── product.routes.ts
│   │   ├── cart.routes.ts
│   │   ├── order.routes.ts
│   │   └── category.routes.ts
│   │
│   ├── middleware/           # Express middleware
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   │
│   ├── config/               # Configuration
│   │   └── database.ts
│   │
│   ├── utils/                # Utilities
│   │   ├── AppError.ts
│   │   ├── jwt.ts
│   │   └── logger.ts
│   │
│   ├── app.ts                # Express app setup
│   └── server.ts             # Server entry point
│
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Seed data
│
└── Dockerfile
```

### Frontend Architecture

```
frontend/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page
│   │   ├── globals.css       # Global styles
│   │   │
│   │   ├── products/         # Products pages
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── cart/             # Cart page
│   │   │   └── page.tsx
│   │   │
│   │   ├── checkout/         # Checkout page
│   │   │   └── page.tsx
│   │   │
│   │   ├── orders/           # Orders pages
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── login/            # Auth pages
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   │
│   ├── components/           # React components
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileMenu.tsx
│   │   │
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── FeaturedProducts.tsx
│   │   │   └── CategoryGrid.tsx
│   │   │
│   │   └── products/
│   │       ├── ProductCard.tsx
│   │       └── ProductFilters.tsx
│   │
│   ├── lib/                  # Utilities
│   │   ├── api.ts            # API client
│   │   └── utils.ts          # Helper functions
│   │
│   └── store/                # State management
│       ├── authStore.ts
│       └── cartStore.ts
│
└── Dockerfile
```

## 🔄 Data Flow

### Authentication Flow

```
1. User submits login form
   ↓
2. Frontend sends POST /api/auth/login
   ↓
3. Backend validates credentials
   ↓
4. Generate JWT access token (15min)
   ↓
5. Generate refresh token (7 days)
   ↓
6. Set refresh token in HTTP-only cookie
   ↓
7. Return access token + user data
   ↓
8. Frontend stores access token in localStorage
   ↓
9. Frontend stores user in Zustand store
   ↓
10. Redirect to home page
```

### Product Browsing Flow

```
1. User visits /products
   ↓
2. Frontend fetches GET /api/products?filters
   ↓
3. Backend queries database with Prisma
   ↓
4. Apply filters, pagination, sorting
   ↓
5. Return products + pagination data
   ↓
6. Frontend renders product grid
   ↓
7. User clicks product
   ↓
8. Navigate to /products/[slug]
   ↓
9. Fetch product details
   ↓
10. Render product page with variants
```

### Add to Cart Flow

```
1. User selects variant and quantity
   ↓
2. Click "Add to Cart"
   ↓
3. Check authentication
   ↓
4. POST /api/cart/items with product data
   ↓
5. Backend validates stock availability
   ↓
6. Check if item exists in cart
   ↓
7. Update quantity or create new cart item
   ↓
8. Return updated cart
   ↓
9. Update Zustand cart store
   ↓
10. Show success message
```

### Checkout Flow

```
1. User reviews cart
   ↓
2. Navigate to /checkout
   ↓
3. Enter shipping information
   ↓
4. Submit order
   ↓
5. POST /api/orders with shipping data
   ↓
6. Backend validates cart items
   ↓
7. Calculate order total
   ↓
8. Create order with items
   ↓
9. Clear cart items
   ↓
10. Return order confirmation
   ↓
11. Redirect to order details
```

## 🔐 Security Architecture

### Authentication & Authorization

```
┌─────────────────────────────────────────────────────────┐
│                    Security Layers                       │
├─────────────────────────────────────────────────────────┤
│  1. Rate Limiting (100 req/15min)                       │
│  2. CORS Configuration                                   │
│  3. Helmet Security Headers                             │
│  4. JWT Token Validation                                │
│  5. Role-Based Access Control                           │
│  6. Input Validation (Zod)                              │
│  7. SQL Injection Prevention (Prisma)                   │
│  8. XSS Protection                                      │
└─────────────────────────────────────────────────────────┘
```

### Token Management

```
Access Token (JWT):
- Stored in localStorage
- Short-lived (15 minutes)
- Sent in Authorization header
- Contains: userId, email, role

Refresh Token (JWT):
- Stored in HTTP-only cookie
- Long-lived (7 days)
- Secure flag in production
- SameSite: strict
- Used to get new access token
```

## 📊 Database Schema

### Entity Relationship Diagram

```
┌──────────┐       ┌──────────────┐       ┌──────────┐
│   User   │──────<│     Cart     │>──────│ CartItem │
└──────────┘       └──────────────┘       └──────────┘
     │                                           │
     │                                           │
     │             ┌──────────────┐              │
     └────────────<│    Order     │              │
                   └──────────────┘              │
                         │                       │
                         │                       │
                   ┌──────────────┐              │
                   │  OrderItem   │              │
                   └──────────────┘              │
                         │                       │
                         │                       │
                   ┌──────────────┐◄─────────────┘
                   │   Product    │
                   └──────────────┘
                         │
                         │
                   ┌──────────────┐
                   │ProductVariant│
                   └──────────────┘
                         │
                         │
                   ┌──────────────┐
                   │   Category   │
                   └──────────────┘
```

## 🚀 Deployment Architecture

### Docker Compose Setup

```
┌─────────────────────────────────────────────────────────┐
│                    Docker Network                        │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Frontend   │  │   Backend    │  │  PostgreSQL  │ │
│  │  Container   │  │  Container   │  │  Container   │ │
│  │              │  │              │  │              │ │
│  │  Next.js     │  │  Express.js  │  │  Database    │ │
│  │  Port: 3000  │  │  Port: 5000  │  │  Port: 5432  │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│         │                  │                  │         │
│         └──────────────────┴──────────────────┘         │
└─────────────────────────────────────────────────────────┘
```

### Production Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      CloudFlare CDN                      │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    Load Balancer                         │
└─────────────────────────────────────────────────────────┘
                          │
          ┌───────────────┴───────────────┐
          ▼                               ▼
┌──────────────────┐           ┌──────────────────┐
│  Frontend Server │           │  Backend Server  │
│  (Next.js)       │           │  (Express.js)    │
│  - Static Assets │           │  - API Endpoints │
│  - SSR           │           │  - Business Logic│
└──────────────────┘           └──────────────────┘
                                        │
                                        ▼
                              ┌──────────────────┐
                              │  PostgreSQL DB   │
                              │  - Primary       │
                              │  - Read Replica  │
                              └──────────────────┘
```

## 🔄 API Design

### RESTful Principles

```
Resource-based URLs:
- /api/products
- /api/products/:id
- /api/cart
- /api/orders

HTTP Methods:
- GET: Retrieve resources
- POST: Create resources
- PUT/PATCH: Update resources
- DELETE: Remove resources

Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error
```

### Response Format

```json
{
  "status": "success",
  "data": {
    "products": [...],
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 100,
      "totalPages": 9
    }
  }
}
```

## 📈 Scalability Considerations

### Horizontal Scaling
- Stateless backend servers
- Load balancer distribution
- Database connection pooling
- Redis for session storage

### Vertical Scaling
- Optimize database queries
- Add database indexes
- Implement caching
- CDN for static assets

### Performance Optimization
- Database query optimization
- API response caching
- Image optimization
- Code splitting
- Lazy loading

---

This architecture is designed for scalability, maintainability, and security, following industry best practices and modern development patterns.
