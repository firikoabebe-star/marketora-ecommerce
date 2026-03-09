# 💰 How to See ETB Currency Changes

## ⚠️ Important: Stop All Running Servers First

You currently have the backend running in another terminal. Please follow these steps:

### Step 1: Stop All Servers

**In your terminal where backend is running:**
- Press `Ctrl + C` to stop the backend server

**Check for any other running processes:**
```powershell
# Find processes on port 5000
netstat -ano | findstr :5000

# If you see a PID, kill it:
taskkill /F /PID <PID_NUMBER>
```

### Step 2: Clear Browser Cache

**Important:** The frontend might be caching the old price format.

**In your browser:**
1. Press `Ctrl + Shift + Delete`
2. Select "Cached images and files"
3. Click "Clear data"

**OR** use hard refresh:
- Press `Ctrl + F5` (Windows)
- Or `Ctrl + Shift + R`

### Step 3: Start Backend

**Open Terminal 1:**
```bash
cd backend
npm run dev
```

**Wait for:**
```
info: Server running in development mode on port 5000
info: Database connected successfully
```

### Step 4: Start Frontend

**Open Terminal 2 (NEW terminal):**
```bash
cd frontend
npm run dev
```

**Wait for:**
```
✓ Ready in 2s
- Local: http://localhost:3000
```

### Step 5: View Changes

1. **Open browser:** http://localhost:3000
2. **Hard refresh:** Press `Ctrl + F5`
3. **Browse products**

You should now see prices like:
- **ETB 18,500.00** (instead of $150.00)
- **ETB 19,800.00** (instead of $160.00)
- **ETB 8,000.00** (instead of $65.00)

## 🔍 Verify Changes

### Check Product Listing Page
- Go to "All Products"
- Prices should show "ETB 18,500.00" format

### Check Product Detail Page
- Click on any product
- Price should show "ETB 18,500.00"

### Check Cart
- Add items to cart
- Cart total should be in ETB
- Example: 2 items = ETB 37,000.00

### Check Checkout
- Go to checkout
- Order total should be in ETB

## 🐛 Troubleshooting

### If you still see USD ($):

1. **Clear browser cache completely**
   - Close all browser tabs
   - Clear cache
   - Restart browser

2. **Check the utils file:**
   ```bash
   # In project root
   cat frontend/src/lib/utils.ts
   ```
   Should show: `currency: 'ETB'`

3. **Restart frontend with clean cache:**
   ```bash
   cd frontend
   rm -rf .next
   npm run dev
   ```

4. **Try incognito/private browsing:**
   - Open new incognito window
   - Visit http://localhost:3000
   - Should show ETB prices

### If backend won't start:

```powershell
# Kill all node processes
Get-Process -Name node | Stop-Process -Force

# Wait 5 seconds
Start-Sleep -Seconds 5

# Start backend again
cd backend
npm run dev
```

## ✅ Expected Results

### Homepage
```
Air Max 270
ETB 18,500.00
```

### Product Page
```
Air Max 270
ETB 18,500.00

Size: [US 8] [US 9] [US 10]
Color: [Black] [White]
Quantity: [1]

[Add to Cart]
```

### Cart
```
Shopping Cart

Air Max 270 x 2
ETB 37,000.00

Total: ETB 37,000.00
```

## 📝 Quick Test

1. Stop all servers
2. Clear browser cache
3. Start backend (Terminal 1)
4. Start frontend (Terminal 2)
5. Open http://localhost:3000 in incognito mode
6. Check prices - should be ETB format

---

**If you follow these steps, you WILL see the ETB currency!** 🇪🇹
