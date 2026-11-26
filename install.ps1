# Instalador de uma linha (Windows PowerShell):
#   irm https://raw.githubusercontent.com/UnnicaATM1/animate-video-pro/main/install.ps1 | iex
$repo = if ($env:ANIMATE_REPO) { $env:ANIMATE_REPO } else { "UnnicaATM1/animate-video-pro" }
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { Write-Host "Node.js 20+ é necessário: https://nodejs.org"; exit 1 }
$major = [int](node -p "process.versions.node.split('.')[0]")
if ($major -lt 20) { Write-Host "Node $major encontrado; atualize para 20+."; exit 1 }
npx -y "github:$repo" @args
