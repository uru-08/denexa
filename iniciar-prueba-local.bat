@echo off
setlocal
cd /d "%~dp0"
title DENEXA - Prueba local del superpanel

echo.
echo Iniciando la prueba local segura de DENEXA...
echo No cierres esta ventana mientras uses el superpanel.
echo Para terminar, volve a esta ventana y presiona Ctrl+C.
echo.

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0servidor-local.ps1"

if errorlevel 1 (
  echo.
  echo No se pudo iniciar la prueba local.
  echo Copia el mensaje de error y envialo en el chat.
  pause
)

endlocal
