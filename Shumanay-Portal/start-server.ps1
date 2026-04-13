# Shumanay Portal - PowerShell Server Launcher
# Mac/Linux friendly version

$currentPath = Get-Location
Write-Host ""
Write-Host "========================================"
Write-Host "Shumanay Tumani Hokimligi - Web Portal"
Write-Host "========================================"
Write-Host ""
Write-Host "Server boshlanyapdi..."
Write-Host ""
Write-Host "Brauzeringizni oching va quyidagiga o'ting:"
Write-Host "http://localhost:8000"
Write-Host ""
Write-Host "Server to'xtatish uchun: Ctrl+C"
Write-Host ""

# Try Python 3 first, then Python
try {
    python -m http.server 8000
} catch {
    try {
        python3 -m http.server 8000
    } catch {
        Write-Host "Xato: Python o'rnatilmagan!"
        Write-Host "Iltimos, Python 3.x o'rnatib qayta urinib ko'ring."
        pause
    }
}
