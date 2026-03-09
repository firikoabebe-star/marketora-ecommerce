# 💰 Currency Update - Ethiopian Birr (ETB)

## ✅ Changes Made

The application has been updated to use **Ethiopian Birr (ETB)** instead of USD.

### Price Adjustments

All prices have been converted using an approximate rate of **1 USD = 123 ETB**:

| Product | Old Price (USD) | New Price (ETB) |
|---------|----------------|-----------------|
| Air Max 270 | $150 | ETB 18,500 |
| React Infinity Run | $160 | ETB 19,800 |
| Sportswear Hoodie | $65 | ETB 8,000 |

### What Was Updated

1. **Frontend Price Formatting** (`frontend/src/lib/utils.ts`)
   - Changed currency from USD to ETB
   - Updated number formatting to display Ethiopian Birr

2. **Database Seed Data** (`backend/prisma/seed.ts`)
   - Updated all product prices to ETB
   - Prices reflect Ethiopian market rates

3. **Documentation**
   - Updated SETUP_COMPLETE.md with new prices

## 🔄 How to Apply Changes

The database has already been re-seeded with the new prices. If you need to refresh:

```bash
cd backend
npm run prisma:seed
```

## 💵 Price Display Format

Prices will now display as:
- **ETB 18,500.00** (with comma separators)
- **ETB 8,000.00**
- **ETB 19,800.00**

## 📊 Adding New Products

When adding new products, use ETB prices. Example price ranges:

### Budget Range
- T-Shirts: ETB 1,500 - 3,000
- Basic Shoes: ETB 3,000 - 6,000
- Accessories: ETB 500 - 2,000

### Mid Range
- Casual Wear: ETB 4,000 - 8,000
- Sports Shoes: ETB 8,000 - 15,000
- Jackets: ETB 6,000 - 12,000

### Premium Range
- Designer Shoes: ETB 15,000 - 25,000
- Premium Clothing: ETB 10,000 - 20,000
- Luxury Items: ETB 20,000+

## 🌍 Ethiopian Market Context

Current approximate exchange rates (as reference):
- 1 USD ≈ 123 ETB
- 1 EUR ≈ 130 ETB
- 1 GBP ≈ 150 ETB

## 🛠️ Technical Details

### Frontend Format Function

```typescript
export function formatPrice(price: number | string): string {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ETB',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numPrice);
}
```

### Database Schema

Prices are stored as `Decimal(10, 2)` which supports:
- Maximum: 99,999,999.99 ETB
- Minimum: 0.01 ETB
- Precision: 2 decimal places

## ✅ Verification

To verify the changes are working:

1. **Start the application:**
   ```bash
   # Backend (if not running)
   cd backend
   npm run dev

   # Frontend (new terminal)
   cd frontend
   npm run dev
   ```

2. **Check prices:**
   - Visit http://localhost:3000
   - Browse products
   - Prices should show as "ETB 18,500.00" format

3. **Test checkout:**
   - Add items to cart
   - View cart totals
   - Complete checkout
   - All amounts should be in ETB

## 🎯 Future Considerations

If you need to support multiple currencies:

1. Add a currency field to the database
2. Store prices in a base currency
3. Use a currency conversion API
4. Allow users to select their preferred currency
5. Update the formatPrice function to accept currency parameter

---

**All prices are now in Ethiopian Birr (ETB)!** 🇪🇹
