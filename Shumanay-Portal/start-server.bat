@echo off
REM Shumanay Portal - Web Server Launcher
REM Windows batch file to start a simple HTTP server

cd /d "%~dp0"

echo.
echo ========================================
echo Shumanay Tumani Hokimligi - Web Portal
echo ========================================
echo.
echo Server boshlanyapdi...
echo.
echo Brauzeringizni oching va quyidagiga o'ting:
echo http://localhost:8000
echo.
echo Server to'xtatish uchun: Ctrl+C
echo.

python -m http.server 8000

pause
