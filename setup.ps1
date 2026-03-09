# PowerShell setup script for Windows

Write-Host "🚀 Setting up eCommerce Platform..." -ForegroundColor Green
Write-Host ""

# Check if Docker is installed
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Docker is not installed. Please install Docker Desktop first." -ForegroundColor Red
    exit 1
}

# Check if Docker Compose is available
if (-not (Get-Command docker-compose -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Docker Compose is not installed. Please install Docker Compose first." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Docker and Docker Compose are installed" -ForegroundColor Green
Write-Host ""

# Stop any existing containers
Write-Host "🛑 Stopping existing containers..." -ForegroundColor Yellow
docker-compose down

# Build and start containers
Write-Host "🏗️  Building and starting containers..." -ForegroundColor Yellow
docker-compose up -d --build

# Wait for database to be ready
Write-Host "⏳ Waiting for database to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Run migrations
Write-Host "📊 Running database migrations..." -ForegroundColor Yellow
docker-compose exec -T backend npx prisma migrate deploy

# Seed database
Write-Host "🌱 Seeding database..." -ForegroundColor Yellow
docker-compose exec -T backend npx prisma db seed

Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Application URLs:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:3000"
Write-Host "   Backend:  http://localhost:5000"
Write-Host "   Health:   http://localhost:5000/health"
Write-Host ""
Write-Host "👤 Default Credentials:" -ForegroundColor Cyan
Write-Host "   Admin:  admin@ecommerce.com / admin123"
Write-Host "   User:   user@example.com / user123"
Write-Host ""
Write-Host "📝 View logs:" -ForegroundColor Cyan
Write-Host "   docker-compose logs -f"
Write-Host ""
Write-Host "🛑 Stop application:" -ForegroundColor Cyan
Write-Host "   docker-compose down"
Write-Host ""
