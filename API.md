# API Documentation

Base URL: `http://localhost:5000/api`

## 📋 Table of Contents
- [Authentication](#authentication)
- [Products](#products)
- [Categories](#categories)
- [Cart](#cart)
- [Orders](#orders)
- [Error Responses](#error-responses)

---

## Authentication

### Register User
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (201):**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "USER",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "accessToken": "jwt-token"
  }
}
```

### Login
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "USER"
    },
    "accessToken": "jwt-token"
  }
}
```

**Note:** Refresh token is set in HTTP-only cookie

### Refresh Token
```http
POST /api/auth/refresh
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "accessToken": "new-jwt-token"
  }
}
```

### Logout
```http
POST /api/auth/logout
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Logged out successfully"
}
```

---

## Products

### Get All Products
```http
GET /api/products
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 12)
- `categoryId` (string): Filter by category ID
- `minPrice` (number): Minimum price
- `maxPrice` (number): Maximum price
- `size` (string): Filter by size
- `color` (string): Filter by color
- `search` (string): Search in name/description
- `sortBy` (string): Sort option (newest, price-asc, price-desc)

**Example:**
```http
GET /api/products?page=1&limit=12&categoryId=uuid&sortBy=price-asc
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "products": [
      {
        "id": "uuid",
        "name": "Product Name",
        "slug": "product-name",
        "description": "Product description",
        "price": "99.99",
        "images": ["url1", "url2"],
        "featured": false,
        "category": {
          "id": "uuid",
          "name": "Category Name",
          "slug": "category-slug"
        },
        "variants": [
          {
            "id": "uuid",
            "size": "M",
            "color": "Black",
            "sku": "SKU-123",
            "stock": 10
          }
        ]
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 100,
      "totalPages": 9
    }
  }
}
```

### Get Featured Products
```http
GET /api/products/featured
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "products": [...]
  }
}
```

### Get Product by Slug
```http
GET /api/products/:slug
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "product": {
      "id": "uuid",
      "name": "Product Name",
      "slug": "product-name",
      "description": "Detailed description",
      "price": "99.99",
      "images": ["url1", "url2"],
      "category": {...},
      "variants": [...]
    }
  }
}
```

### Create Product (Admin Only)
```http
POST /api/products
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "New Product",
  "slug": "new-product",
  "description": "Product description",
  "price": 99.99,
  "categoryId": "uuid",
  "images": ["url1", "url2"],
  "featured": false,
  "variants": [
    {
      "size": "M",
      "color": "Black",
      "sku": "SKU-123",
      "stock": 10
    }
  ]
}
```

**Response (201):**
```json
{
  "status": "success",
  "data": {
    "product": {...}
  }
}
```

### Update Product (Admin Only)
```http
PUT /api/products/:id
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "Updated Name",
  "price": 89.99,
  "featured": true
}
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "product": {...}
  }
}
```

### Delete Product (Admin Only)
```http
DELETE /api/products/:id
Authorization: Bearer {token}
```

**Response (204):** No content

---

## Categories

### Get All Categories
```http
GET /api/categories
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "categories": [
      {
        "id": "uuid",
        "name": "Men's",
        "slug": "mens",
        "description": "Men's collection",
        "imageUrl": "url",
        "children": [],
        "_count": {
          "products": 25
        }
      }
    ]
  }
}
```

### Get Category by Slug
```http
GET /api/categories/:slug
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "category": {
      "id": "uuid",
      "name": "Men's",
      "slug": "mens",
      "products": [...]
    }
  }
}
```

### Create Category (Admin Only)
```http
POST /api/categories
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "New Category",
  "slug": "new-category",
  "description": "Category description",
  "imageUrl": "url",
  "parentId": "uuid" // optional
}
```

**Response (201):**
```json
{
  "status": "success",
  "data": {
    "category": {...}
  }
}
```

### Update Category (Admin Only)
```http
PUT /api/categories/:id
Authorization: Bearer {token}
```

### Delete Category (Admin Only)
```http
DELETE /api/categories/:id
Authorization: Bearer {token}
```

---

## Cart

### Get User Cart
```http
GET /api/cart
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "cart": {
      "id": "uuid",
      "userId": "uuid",
      "items": [
        {
          "id": "uuid",
          "productId": "uuid",
          "quantity": 2,
          "size": "M",
          "color": "Black",
          "product": {
            "id": "uuid",
            "name": "Product Name",
            "slug": "product-slug",
            "price": "99.99",
            "images": ["url"]
          }
        }
      ]
    }
  }
}
```

### Add Item to Cart
```http
POST /api/cart/items
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "productId": "uuid",
  "quantity": 1,
  "size": "M",
  "color": "Black"
}
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "cart": {...}
  }
}
```

### Update Cart Item
```http
PUT /api/cart/items/:itemId
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "quantity": 3
}
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "cart": {...}
  }
}
```

### Remove Cart Item
```http
DELETE /api/cart/items/:itemId
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "cart": {...}
  }
}
```

### Clear Cart
```http
DELETE /api/cart
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "cart": {...}
  }
}
```

---

## Orders

### Create Order
```http
POST /api/orders
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "shippingAddress": "123 Main St",
  "city": "New York",
  "postalCode": "10001",
  "country": "USA",
  "phone": "+1234567890"
}
```

**Response (201):**
```json
{
  "status": "success",
  "data": {
    "order": {
      "id": "uuid",
      "userId": "uuid",
      "status": "PENDING",
      "total": "199.98",
      "shippingAddress": "123 Main St",
      "city": "New York",
      "postalCode": "10001",
      "country": "USA",
      "phone": "+1234567890",
      "items": [
        {
          "id": "uuid",
          "productId": "uuid",
          "quantity": 2,
          "price": "99.99",
          "size": "M",
          "color": "Black",
          "product": {...}
        }
      ],
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### Get User Orders
```http
GET /api/orders
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "orders": [...]
  }
}
```

### Get Order by ID
```http
GET /api/orders/:id
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "order": {...}
  }
}
```

### Get All Orders (Admin Only)
```http
GET /api/orders/all
Authorization: Bearer {token}
```

**Query Parameters:**
- `status` (string): Filter by status (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED)
- `page` (number): Page number
- `limit` (number): Items per page

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "orders": [...],
    "pagination": {...}
  }
}
```

### Update Order Status (Admin Only)
```http
PATCH /api/orders/:id/status
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "status": "SHIPPED"
}
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "order": {...}
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "status": "error",
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "status": "error",
  "message": "No token provided"
}
```

### 403 Forbidden
```json
{
  "status": "error",
  "message": "Forbidden: Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "status": "error",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "status": "error",
  "message": "Internal server error"
}
```

---

## Rate Limiting

- Window: 15 minutes
- Max Requests: 100 per IP
- Response when exceeded:
```json
{
  "message": "Too many requests from this IP, please try again later."
}
```

---

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer {your-jwt-token}
```

Tokens expire after 15 minutes. Use the refresh endpoint to get a new access token.

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","firstName":"Test","lastName":"User"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Get Products
```bash
curl http://localhost:5000/api/products
```

### Get Cart (with auth)
```bash
curl http://localhost:5000/api/cart \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

For more examples and interactive testing, consider setting up Swagger/OpenAPI documentation.
