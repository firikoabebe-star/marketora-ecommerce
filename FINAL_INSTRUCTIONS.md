# 🎯 FINAL INSTRUCTIONS - See ETB Currency

## ✅ What Has Been Changed

1. **Price Formatting Function** - Updated to use ETB
2. **Database Prices** - All products now have ETB prices
3. **Seed Data** - Re-seeded with new prices

## 🚀 FOLLOW THESE STEPS EXACTLY

### Step 1: Stop Everything

**Close ALL terminals running the app**
- Stop backend (Ctrl + C)
- Stop frontend (Ctrl + C)

**Kill any remaining processes:**
```powershell
Get-Process -Name node | Stop-Process -Force
```

### Step 2: Test Currency Format (Optional but Recommended)

**Open this file in your browser:**
```
D:\websites\Ecommerce\frontend\TEST_CURRENCY.html
```

This will show you if your browser supports ETB formatting.
You should see:
- ETB 18,500.00
- ETB 19,800.00
- ETB 8,000.00

### Step 3: Start Backend

**Terminal 1:**
```bash
cd D:\websites\Ecommerce\backend
npm run dev
```

**Wait for this message:**
```
info: Server running in development mode on port 5000
info: Database connected successfully
```

### Step 4: Start Frontend

**Terminal 2 (NEW terminal):**
```bash
cd D:\websites\Ecommerce\frontend
npm run dev
```

**Wait for:**
```
✓ Ready in 2s
- Local: http://localhost:3000
```

### Step 5: Clear Browser Cache

**VERY IMPORTANT:**

**Option A - Hard Refresh:**
1. Open http://localhost:3000
2. Press `Ctrl + Shift + R` (or `Ctrl + F5`)
3. This forces reload without cache

**Option B - Clear Cache:**
1. Press `Ctrl + Shift + Delete`
2. Select "Cached images and files"
3. Click "Clear data"
4. Reload page

**Option C - Incognito Mode (Best):**
1. Open new incognito/private window
2. Go to http://localhost:3000
3. Fresh session, no cache

### Step 6: Verify ETB Prices

**You should see:**

**Homepage:**
```
Air Max 270
ETB 18,500.00
```

**Product Listing:**
```
Air Max 270          React Infinity Run
ETB 18,500.00       ETB 19,800.00
```

**Product Detail:**
```
Air Max 270
ETB 18,500.00

Description: The Nike Air Max 270 delivers...
```

**Cart:**
```
Shopping Cart
Air Max 270 x 1
ETB 18,500.00

Total: ETB 18,500.00
```

## 🐛 If You Still See USD ($)

### Problem: Browser Cache

**Solution:**
```bash
# Stop frontend
# Delete .next folder
cd D:\websites\Ecommerce\frontend
Remove-Item -Recurse -Force .next

# Restart frontend
npm run dev
```

Then open in **incognito mode**.

### Problem: Old Data in Database

**Solution:**
```bash
cd D:\websites\Ecommerce\backend
npm run prisma:seed
```

### Problem: Frontend Not Updated

**Verify the file:**
```bash
# Check if utils.ts has ETB
cat D:\websites\Ecommerce\frontend\src\lib\utils.ts
```

Should contain:
```typescript
currency: 'ETB',
```

## 📊 Expected vs Actual

| Product | Old (USD) | New (ETB) | What You Should See |
|---------|-----------|-----------|---------------------|
| Air Max 270 | $150.00 | 18500 | **ETB 18,500.00** |
| React Infinity Run | $160.00 | 19800 | **ETB 19,800.00** |
| Sportswear Hoodie | $65.00 | 8000 | **ETB 8,000.00** |

## ✅ Checklist

- [ ] Stopped all servers
- [ ] Killed all node processes
- [ ] Started backend (port 5000)
- [ ] Started frontend (port 3000)
- [ ] Cleared browser cache OR used incognito
- [ ] Opened http://localhost:3000
- [ ] Checked prices show "ETB" not "$"

## 🎯 Quick Commands

**Kill all node:**
```powershell
Get-Process -Name node | Stop-Process -Force
```

**Start backend:**
```powershell
cd D:\websites\Ecommerce\backend
npm run dev
```

**Start frontend (new terminal):**
```powershell
cd D:\websites\Ecommerce\frontend
npm run dev
```

**Clear frontend cache:**
```powershell
cd D:\websites\Ecommerce\frontend
Remove-Item -Recurse -Force .next
npm run dev
```

## 🔍 Debug Info

**Check what's in database:**
```bash
cd backend
npm run prisma:studio
```
Open http://localhost:5555
Check `products` table - prices should be 18500, 19800, 8000

**Check frontend code:**
```bash
cat frontend\src\lib\utils.ts | findstr ETB
```
Should show: `currency: 'ETB',`

## 💡 Pro Tip

**Always use incognito mode when testing currency changes!**

This ensures you're seeing the latest code without any browser caching issues.

---

## 🎉 SUCCESS CRITERIA

When you see this, you're done:

```
✅ Homepage shows: ETB 18,500.00
✅ Products show: ETB format
✅ Cart shows: ETB totals
✅ Checkout shows: ETB amounts
✅ No $ symbols anywhere
```

**Follow these steps and you WILL see ETB currency!** 🇪🇹
