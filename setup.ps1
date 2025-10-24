# Quick Start Script for Windows PowerShell
# This script helps you set up and run both frontend and backend

Write-Host "🚀 Task Manager - Quick Start Setup" -ForegroundColor Cyan
Write-Host "====================================`n" -ForegroundColor Cyan

# Check if .NET is installed
Write-Host "Checking prerequisites..." -ForegroundColor Yellow
try {
    $dotnetVersion = dotnet --version
    Write-Host "✅ .NET SDK installed: $dotnetVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ .NET SDK not found. Please install .NET 8.0 SDK" -ForegroundColor Red
    Write-Host "Download from: https://dotnet.microsoft.com/download/dotnet/8.0" -ForegroundColor Yellow
    exit 1
}

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js" -ForegroundColor Red
    Write-Host "Download from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host "`n📦 Installing dependencies..." -ForegroundColor Yellow

# Backend setup
Write-Host "`nSetting up Backend (ASP.NET Core API)..." -ForegroundColor Cyan
Set-Location TaskManager.Api
dotnet restore
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Backend setup failed" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Backend dependencies installed" -ForegroundColor Green
Set-Location ..

# Frontend setup
Write-Host "`nSetting up Frontend (React)..." -ForegroundColor Cyan
Set-Location task-manager-ui
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend setup failed" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green
Set-Location ..

Write-Host "`n✅ Setup Complete!" -ForegroundColor Green
Write-Host "`n📝 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Start the Backend API:" -ForegroundColor Yellow
Write-Host "   cd TaskManager.Api" -ForegroundColor White
Write-Host "   dotnet run" -ForegroundColor White
Write-Host "`n2. In a NEW terminal, start the Frontend:" -ForegroundColor Yellow
Write-Host "   cd task-manager-ui" -ForegroundColor White
Write-Host "   npm start" -ForegroundColor White
Write-Host "`n3. Open browser at: http://localhost:3000" -ForegroundColor Yellow
Write-Host "`n🎉 Happy Testing!" -ForegroundColor Cyan
