$ErrorActionPreference = "Stop"

$root = [System.IO.Path]::GetFullPath($PSScriptRoot)
$prefix = "http://127.0.0.1:4173/"
$startUrl = "${prefix}admin.html"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)

$mimeTypes = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "text/javascript; charset=utf-8"
  ".json" = "application/json; charset=utf-8"
  ".svg"  = "image/svg+xml"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".gif"  = "image/gif"
  ".webp" = "image/webp"
  ".ico"  = "image/x-icon"
  ".woff" = "font/woff"
  ".woff2" = "font/woff2"
}

try {
  $listener.Start()
  Write-Host "Servidor local iniciado en $prefix" -ForegroundColor Green
  Write-Host "Se abrira el superpanel en el navegador." -ForegroundColor Green
  Write-Host "Para detenerlo, presiona Ctrl+C en esta ventana." -ForegroundColor Yellow
  Start-Process $startUrl

  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    try {
      if ($request.HttpMethod -notin @("GET", "HEAD")) {
        $response.StatusCode = 405
        continue
      }

      $relativePath = [System.Uri]::UnescapeDataString($request.Url.AbsolutePath).TrimStart("/")
      if ([string]::IsNullOrWhiteSpace($relativePath)) {
        $relativePath = "index.html"
      }

      $relativePath = $relativePath.Replace("/", [System.IO.Path]::DirectorySeparatorChar)
      $filePath = [System.IO.Path]::GetFullPath((Join-Path $root $relativePath))

      if (-not $filePath.StartsWith($root, [System.StringComparison]::OrdinalIgnoreCase)) {
        $response.StatusCode = 403
        continue
      }

      if (-not (Test-Path -LiteralPath $filePath -PathType Leaf)) {
        $response.StatusCode = 404
        continue
      }

      $extension = [System.IO.Path]::GetExtension($filePath).ToLowerInvariant()
      $response.ContentType = if ($mimeTypes.ContainsKey($extension)) {
        $mimeTypes[$extension]
      } else {
        "application/octet-stream"
      }

      $bytes = [System.IO.File]::ReadAllBytes($filePath)
      $response.StatusCode = 200
      $response.ContentLength64 = $bytes.Length

      if ($request.HttpMethod -eq "GET") {
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
      }
    } catch {
      $response.StatusCode = 500
      Write-Host "Error atendiendo una solicitud: $($_.Exception.Message)" -ForegroundColor Red
    } finally {
      $response.OutputStream.Close()
    }
  }
} catch {
  Write-Host "No se pudo iniciar el servidor local: $($_.Exception.Message)" -ForegroundColor Red
  exit 1
} finally {
  if ($listener.IsListening) {
    $listener.Stop()
  }
  $listener.Close()
}
