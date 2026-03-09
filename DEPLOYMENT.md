# Deployment Guide

This guide covers deploying the eCommerce platform to production environments.

## 🚀 Deployment Options

### Option 1: Docker Compose (Recommended for VPS)

Perfect for deploying to a VPS (DigitalOcean, AWS EC2, etc.)

1. **Prepare your server**
```bash
# Install Docker and Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

2. **Clone repository**
```bash
git clone <your-repo-url>
cd ecommerce-platform
```

3. **Update environment variables**
```bash
# Edit docker-compose.yml and update:
# - JWT secrets (use strong random strings)
# - Database password
# - FRONTEND_URL (your domain)
```

4. **Deploy**
```bash
docker-compose up -d
```

5. **Setup reverse proxy (Nginx)**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

6. **Setup SSL with Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

### Option 2: Vercel (Frontend) + Railway/Render (Backend)

**Frontend on Vercel:**

1. Push code to GitHub
2. Import project to Vercel
3. Set environment variable:
   - `NEXT_PUBLIC_API_URL=https://your-backend-url.com/api`
4. Deploy

**Backend on Railway:**

1. Create new project on Railway
2. Add PostgreSQL database
3. Deploy from GitHub
4. Set environment variables:
   - `DATABASE_URL` (auto-provided by Railway)
   - `JWT_SECRET`
   - `JWT_REFRESH_SECRET`
   - `FRONTEND_URL`
   - `NODE_ENV=production`
5. Add build command: `npm run build && npx prisma migrate deploy && npx prisma db seed`
6. Add start command: `npm start`

### Option 3: AWS (Production-Grade)

**Architecture:**
- Frontend: AWS Amplify or S3 + CloudFront
- Backend: ECS Fargate or EC2
- Database: RDS PostgreSQL
- Load Balancer: Application Load Balancer
- CDN: CloudFront

**Steps:**

1. **Setup RDS PostgreSQL**
   - Create RDS instance
   - Note connection string

2. **Deploy Backend to ECS**
   - Build Docker image
   - Push to ECR
   - Create ECS task definition
   - Deploy to Fargate

3. **Deploy Frontend**
   - Build Next.js app
   - Deploy to Amplify or S3
   - Setup CloudFront distribution

4. **Configure Security**
   - Setup security groups
   - Configure IAM roles
   - Enable SSL/TLS

## 🔒 Production Checklist

### Security
- [ ] Change all default passwords
- [ ] Use strong JWT secrets (32+ characters)
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Set secure cookie flags
- [ ] Enable rate limiting
- [ ] Setup firewall rules
- [ ] Regular security updates

### Performance
- [ ] Enable caching
- [ ] Setup CDN for static assets
- [ ] Optimize images
- [ ] Enable gzip compression
- [ ] Database connection pooling
- [ ] Add database indexes

### Monitoring
- [ ] Setup error tracking (Sentry)
- [ ] Configure logging
- [ ] Setup uptime monitoring
- [ ] Database backups
- [ ] Performance monitoring

### Environment Variables

**Backend Production Variables:**
```env
DATABASE_URL=postgresql://user:password@host:5432/dbname
PORT=5000
NODE_ENV=production
JWT_SECRET=<strong-random-secret-32-chars>
JWT_REFRESH_SECRET=<strong-random-secret-32-chars>
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
FRONTEND_URL=https://yourdomain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Frontend Production Variables:**
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
```

## 📊 Database Migration

**Run migrations in production:**
```bash
# Using Docker
docker-compose exec backend npx prisma migrate deploy

# Direct
cd backend
npx prisma migrate deploy
```

**Seed production data:**
```bash
# Only run once for initial setup
docker-compose exec backend npx prisma db seed
```

## 🔄 CI/CD Pipeline

**GitHub Actions Example:**

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Build and push Docker images
        run: |
          docker-compose build
          docker-compose push
      
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /app
            git pull
            docker-compose up -d
```

## 🐛 Troubleshooting

**Database connection issues:**
```bash
# Check database is running
docker-compose ps

# View logs
docker-compose logs postgres

# Test connection
docker-compose exec postgres psql -U postgres -d ecommerce_db
```

**Backend not starting:**
```bash
# View logs
docker-compose logs backend

# Check migrations
docker-compose exec backend npx prisma migrate status
```

**Frontend build errors:**
```bash
# Clear cache
rm -rf frontend/.next
rm -rf frontend/node_modules
cd frontend && npm install
```

## 📈 Scaling

**Horizontal Scaling:**
- Use load balancer
- Multiple backend instances
- Redis for session storage
- Database read replicas

**Vertical Scaling:**
- Increase server resources
- Optimize database queries
- Add caching layer
- CDN for static assets

## 💾 Backup Strategy

**Database Backups:**
```bash
# Automated daily backup
docker-compose exec postgres pg_dump -U postgres ecommerce_db > backup_$(date +%Y%m%d).sql

# Restore from backup
docker-compose exec -T postgres psql -U postgres ecommerce_db < backup_20240101.sql
```

**File Backups:**
- User uploaded images
- Application logs
- Configuration files

## 🔐 SSL/TLS Setup

**Using Let's Encrypt:**
```bash
# Install certbot
sudo apt install certbot

# Get certificate
sudo certbot certonly --standalone -d yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

## 📞 Support

For deployment issues:
1. Check logs: `docker-compose logs`
2. Verify environment variables
3. Check database connectivity
4. Review security group rules
5. Verify DNS settings

---

Remember to test thoroughly in a staging environment before deploying to production!
