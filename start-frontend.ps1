Write-Host "Starting React Frontend..." -ForegroundColor Green
Set-Location "frontend"
Write-Host "Current directory: $(Get-Location)" -ForegroundColor Yellow
Write-Host "Running npm start..." -ForegroundColor Yellow
npm start
