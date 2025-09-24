@echo off
echo Starting UniHUB Server...
echo.
echo The application will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.
python -m http.server 3000
