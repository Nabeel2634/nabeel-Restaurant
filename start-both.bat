@echo off
echo Starting Restaurant Reviews Application...
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && node test-server.js"

echo Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause > nul
