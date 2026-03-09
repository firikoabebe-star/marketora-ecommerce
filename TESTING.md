# Testing Guide

## 🧪 Manual Testing Checklist

### Authentication Flow

**Registration:**
- [ ] Navigate to /register
- [ ] Fill in all fields (firstName, lastName, email, password)
- [ ] Submit form
- [ ] Verify redirect to homepage
- [ ] Verify user is logged in (name appears in navbar)
- [ ] Verify access token in localStorage
- [ ] Verify refresh token cookie is set

**Login:**
- [ ] Navigate to /login
- [ ] Enter valid credentials
- [ ] Submit form
- [ ] Verify redirect to homepage
- [ ] Verify user is logged in
- [ ] Test with invalid credentials (should show error)
- [ ] Test with empty fields (should show validation)

**Logout:**
- [ ] Click logout button
- [ ] Verify redirect to homepage
- [ ] Verify user is logged out
- [ ] Verify tokens are cleared
- [ ] Try accessing protected routes (should redirect to login)

**Token Refresh:**
- [ ] Login and wait 15+ minutes
- [ ] Make an API request
- [ ] Verify token is automatically refreshed
- [ ] Verify no interruption in user experience

---

### Product Browsing

**Product Listing:**
- [ ] Navigate to /products
- [ ] Verify products load correctly
- [ ] Verify images display
- [ ] Verify prices format correctly
- [ ] Test pagination (if more than 12 products)
- [ ] Click on a product card
- [ ] Verify navigation to product detail page

**Filtering:**
- [ ] Test category filter
- [ ] Test price range filter (min and max)
- [ ] Test size filter
- [ ] Test color filter
- [ ] Test multiple filters together
- [ ] Verify URL updates with filters
- [ ] Verify results match filters
- [ ] Clear filters and verify reset

**Sorting:**
- [ ] Sort by newest
- [ ] Sort by price (low to high)
- [ ] Sort by price (high to low)
- [ ] Verify products reorder correctly

**Search:**
- [ ] Enter search term
- [ ] Verify matching products appear
- [ ] Test with no results
- [ ] Test with special characters

---

### Product Detail Page

**Display:**
- [ ] Verify product name displays
- [ ] Verify price displays correctly
- [ ] Verify description displays
- [ ] Verify all images load
- [ ] Verify category displays

**Image Gallery:**
- [ ] Click thumbnail images
- [ ] Verify main image changes
- [ ] Test with single image product
- [ ] Test with multiple images

**Variant Selection:**
- [ ] Select different sizes
- [ ] Select different colors
- [ ] Verify selection highlights
- [ ] Test all available combinations

**Add to Cart:**
- [ ] Select size and color
- [ ] Set quantity
- [ ] Click "Add to Cart"
- [ ] Verify success message
- [ ] Verify cart badge updates
- [ ] Test without login (should redirect)
- [ ] Test with out-of-stock variant

---

### Shopping Cart

**View Cart:**
- [ ] Navigate to /cart
- [ ] Verify all items display
- [ ] Verify product images
- [ ] Verify prices
- [ ] Verify quantities
- [ ] Verify total calculation

**Update Quantity:**
- [ ] Click + button
- [ ] Verify quantity increases
- [ ] Verify total updates
- [ ] Click - button
- [ ] Verify quantity decreases
- [ ] Test setting quantity to 0 (should remove)

**Remove Item:**
- [ ] Click remove button
- [ ] Verify item is removed
- [ ] Verify total updates
- [ ] Verify cart badge updates

**Empty Cart:**
- [ ] Remove all items
- [ ] Verify "cart is empty" message
- [ ] Verify "Continue Shopping" button

---

### Checkout Flow

**Checkout Page:**
- [ ] Navigate to /checkout with items in cart
- [ ] Verify order summary displays
- [ ] Verify all cart items show
- [ ] Verify total is correct

**Shipping Form:**
- [ ] Fill in all shipping fields
- [ ] Test form validation (empty fields)
- [ ] Test invalid postal code
- [ ] Test invalid phone number
- [ ] Submit form
- [ ] Verify order is created
- [ ] Verify redirect to order details

**Post-Checkout:**
- [ ] Verify cart is cleared
- [ ] Verify order appears in order history
- [ ] Verify order details are correct

---

### Order Management

**Order History:**
- [ ] Navigate to /orders
- [ ] Verify all orders display
- [ ] Verify order dates
- [ ] Verify order totals
- [ ] Verify order statuses
- [ ] Click on an order

**Order Details:**
- [ ] Verify order number
- [ ] Verify order date
- [ ] Verify order status
- [ ] Verify all items display
- [ ] Verify item quantities
- [ ] Verify item prices
- [ ] Verify shipping address
- [ ] Verify total calculation

---

### Responsive Design

**Mobile (< 768px):**
- [ ] Test navigation menu (hamburger)
- [ ] Test product grid (1 column)
- [ ] Test product detail page
- [ ] Test cart page
- [ ] Test checkout form
- [ ] Test all buttons are tappable
- [ ] Test form inputs are usable

**Tablet (768px - 1024px):**
- [ ] Test navigation
- [ ] Test product grid (2 columns)
- [ ] Test filters (collapsible)
- [ ] Test all pages

**Desktop (> 1024px):**
- [ ] Test full navigation
- [ ] Test product grid (3-4 columns)
- [ ] Test sidebar filters
- [ ] Test hover effects
- [ ] Test all pages

---

### Performance Testing

**Page Load Times:**
- [ ] Homepage loads < 2 seconds
- [ ] Product listing loads < 2 seconds
- [ ] Product detail loads < 1 second
- [ ] Cart loads < 1 second

**Image Loading:**
- [ ] Images load progressively
- [ ] Lazy loading works
- [ ] No layout shift on image load

**API Response Times:**
- [ ] Product list API < 500ms
- [ ] Product detail API < 200ms
- [ ] Cart operations < 300ms
- [ ] Order creation < 500ms

---

### Security Testing

**Authentication:**
- [ ] Cannot access protected routes without login
- [ ] Cannot access admin routes as regular user
- [ ] Tokens expire correctly
- [ ] Refresh token rotation works
- [ ] Logout clears all tokens

**Authorization:**
- [ ] Regular users cannot create products
- [ ] Regular users cannot update order status
- [ ] Regular users cannot view all orders
- [ ] Users can only view their own orders

**Input Validation:**
- [ ] SQL injection attempts fail
- [ ] XSS attempts are sanitized
- [ ] Invalid email formats rejected
- [ ] Weak passwords rejected
- [ ] Invalid data types rejected

**Rate Limiting:**
- [ ] Make 100+ requests in 15 minutes
- [ ] Verify rate limit kicks in
- [ ] Verify error message
- [ ] Wait and verify access restored

---

## 🔧 API Testing with cURL

### Test Authentication
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123",
    "firstName": "Test",
    "lastName": "User"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'

# Save the token from response
TOKEN="your-jwt-token"
```

### Test Products
```bash
# Get all products
curl http://localhost:5000/api/products

# Get products with filters
curl "http://localhost:5000/api/products?page=1&limit=12&sortBy=price-asc"

# Get product by slug
curl http://localhost:5000/api/products/air-max-270

# Get featured products
curl http://localhost:5000/api/products/featured
```

### Test Cart
```bash
# Get cart
curl http://localhost:5000/api/cart \
  -H "Authorization: Bearer $TOKEN"

# Add to cart
curl -X POST http://localhost:5000/api/cart/items \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "product-uuid",
    "quantity": 1,
    "size": "M",
    "color": "Black"
  }'

# Update cart item
curl -X PUT http://localhost:5000/api/cart/items/item-uuid \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"quantity": 2}'

# Remove from cart
curl -X DELETE http://localhost:5000/api/cart/items/item-uuid \
  -H "Authorization: Bearer $TOKEN"
```

### Test Orders
```bash
# Create order
curl -X POST http://localhost:5000/api/orders \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "shippingAddress": "123 Main St",
    "city": "New York",
    "postalCode": "10001",
    "country": "USA",
    "phone": "+1234567890"
  }'

# Get user orders
curl http://localhost:5000/api/orders \
  -H "Authorization: Bearer $TOKEN"

# Get order by ID
curl http://localhost:5000/api/orders/order-uuid \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🧪 API Testing with Postman

### Setup
1. Import the following as environment variables:
   - `BASE_URL`: http://localhost:5000/api
   - `TOKEN`: (will be set after login)

### Collection Structure

**Authentication:**
- POST {{BASE_URL}}/auth/register
- POST {{BASE_URL}}/auth/login
- POST {{BASE_URL}}/auth/refresh
- POST {{BASE_URL}}/auth/logout

**Products:**
- GET {{BASE_URL}}/products
- GET {{BASE_URL}}/products/featured
- GET {{BASE_URL}}/products/:slug
- POST {{BASE_URL}}/products (Admin)
- PUT {{BASE_URL}}/products/:id (Admin)
- DELETE {{BASE_URL}}/products/:id (Admin)

**Categories:**
- GET {{BASE_URL}}/categories
- GET {{BASE_URL}}/categories/:slug
- POST {{BASE_URL}}/categories (Admin)
- PUT {{BASE_URL}}/categories/:id (Admin)
- DELETE {{BASE_URL}}/categories/:id (Admin)

**Cart:**
- GET {{BASE_URL}}/cart
- POST {{BASE_URL}}/cart/items
- PUT {{BASE_URL}}/cart/items/:itemId
- DELETE {{BASE_URL}}/cart/items/:itemId
- DELETE {{BASE_URL}}/cart

**Orders:**
- POST {{BASE_URL}}/orders
- GET {{BASE_URL}}/orders
- GET {{BASE_URL}}/orders/:id
- GET {{BASE_URL}}/orders/all (Admin)
- PATCH {{BASE_URL}}/orders/:id/status (Admin)

---

## 🐛 Common Issues & Solutions

### Issue: Products not loading
**Check:**
- Backend is running
- Database is seeded
- Network tab for errors
- Console for errors

### Issue: Images not displaying
**Check:**
- Image URLs are valid
- CORS is configured
- Network tab for 404s
- Image optimization settings

### Issue: Cart not updating
**Check:**
- User is logged in
- Token is valid
- API response in network tab
- Zustand store state

### Issue: Cannot place order
**Check:**
- Cart has items
- All form fields filled
- Shipping address valid
- Backend logs for errors

---

## 📊 Test Data

### Test Users
```
Admin:
- Email: admin@ecommerce.com
- Password: admin123

User:
- Email: user@example.com
- Password: user123
```

### Test Products
After seeding, you'll have:
- Air Max 270 (Men's, $150)
- React Infinity Run (Men's, $160)
- Sportswear Hoodie (Women's, $65)

### Test Categories
- Men's
- Women's
- Kids

---

## ✅ Pre-Deployment Checklist

- [ ] All manual tests pass
- [ ] All API endpoints tested
- [ ] Responsive design verified
- [ ] Performance acceptable
- [ ] Security tests pass
- [ ] Error handling works
- [ ] Loading states work
- [ ] Empty states work
- [ ] Form validation works
- [ ] Authentication flow works
- [ ] Authorization works
- [ ] Database migrations work
- [ ] Seed data works
- [ ] Docker build succeeds
- [ ] Environment variables set
- [ ] Logs are clean
- [ ] No console errors

---

## 🚀 Automated Testing (Future)

### Unit Tests
- Service layer tests
- Utility function tests
- Component tests

### Integration Tests
- API endpoint tests
- Database operation tests
- Authentication flow tests

### E2E Tests
- User journey tests
- Checkout flow tests
- Admin operations tests

### Tools to Consider
- Jest (unit tests)
- Supertest (API tests)
- Playwright (E2E tests)
- React Testing Library (component tests)

---

Happy testing! 🧪
