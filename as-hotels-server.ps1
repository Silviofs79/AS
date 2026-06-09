param(
  [string]$Root = ".",
  [int]$Port = 8000
)

$rootFull = [System.IO.Path]::GetFullPath($Root).TrimEnd("\") + "\"
$serverSocket = $null
$listener = $null

try {
  $serverSocket = [System.Net.Sockets.Socket]::new(
    [System.Net.Sockets.AddressFamily]::InterNetworkV6,
    [System.Net.Sockets.SocketType]::Stream,
    [System.Net.Sockets.ProtocolType]::Tcp
  )
  $serverSocket.DualMode = $true
  $serverSocket.Bind([System.Net.IPEndPoint]::new([System.Net.IPAddress]::IPv6Any, $Port))
  $serverSocket.Listen(128)
} catch {
  if ($serverSocket) {
    $serverSocket.Dispose()
    $serverSocket = $null
  }

  $listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $Port)
  $listener.Start()
}

function Get-MimeType([string]$Path) {
  switch ([System.IO.Path]::GetExtension($Path).ToLowerInvariant()) {
    ".html" { return "text/html; charset=utf-8" }
    ".css" { return "text/css; charset=utf-8" }
    ".js" { return "application/javascript; charset=utf-8" }
    ".png" { return "image/png" }
    ".jpg" { return "image/jpeg" }
    ".jpeg" { return "image/jpeg" }
    ".svg" { return "image/svg+xml" }
    default { return "application/octet-stream" }
  }
}

function Send-Response($Stream, [int]$Status, [string]$Text, [byte[]]$Body, [string]$Type) {
  $header = "HTTP/1.1 $Status $Text`r`nContent-Type: $Type`r`nContent-Length: $($Body.Length)`r`nConnection: close`r`n`r`n"
  $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
  $Stream.Write($headerBytes, 0, $headerBytes.Length)
  $Stream.Write($Body, 0, $Body.Length)
}

while ($true) {
  $client = $null
  $stream = $null

  try {
    if ($serverSocket) {
      $client = $serverSocket.Accept()
      $stream = [System.Net.Sockets.NetworkStream]::new($client, $true)
    } else {
      $client = $listener.AcceptTcpClient()
      $stream = $client.GetStream()
    }

    $reader = [System.IO.StreamReader]::new($stream)
    $requestLine = $reader.ReadLine()

    while (($line = $reader.ReadLine()) -and $line.Length -gt 0) {}

    $urlPath = "/"
    if ($requestLine -match "^\S+\s+([^\s?]+)") {
      $urlPath = [System.Uri]::UnescapeDataString($matches[1])
    }

    if ($urlPath -eq "/") {
      $urlPath = "/index.html"
    }

    $relative = $urlPath.TrimStart("/").Replace("/", [System.IO.Path]::DirectorySeparatorChar)
    $target = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($Root, $relative))

    if (-not $target.StartsWith($rootFull, [System.StringComparison]::OrdinalIgnoreCase)) {
      Send-Response $stream 403 "Forbidden" ([System.Text.Encoding]::UTF8.GetBytes("403 Forbidden")) "text/plain; charset=utf-8"
    } elseif (-not (Test-Path -LiteralPath $target -PathType Leaf)) {
      Send-Response $stream 404 "Not Found" ([System.Text.Encoding]::UTF8.GetBytes("404 Not Found")) "text/plain; charset=utf-8"
    } else {
      Send-Response $stream 200 "OK" ([System.IO.File]::ReadAllBytes($target)) (Get-MimeType $target)
    }
  } catch {
    if ($stream) {
      $body = [System.Text.Encoding]::UTF8.GetBytes("500 Internal Server Error")
      Send-Response $stream 500 "Internal Server Error" $body "text/plain; charset=utf-8"
    }
  } finally {
    if ($stream) {
      $stream.Dispose()
    } elseif ($client) {
      $client.Close()
    }
  }
}
