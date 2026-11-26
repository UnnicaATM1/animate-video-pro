#!/usr/bin/env sh
# Instalador de uma linha (macOS/Linux):
#   curl -fsSL https://raw.githubusercontent.com/UnnicaATM1/animate-video-pro/main/install.sh | sh
set -e
REPO="${ANIMATE_REPO:-UnnicaATM1/animate-video-pro}"
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js 20+ é necessário: https://nodejs.org"; exit 1
fi
MAJOR=$(node -p 'process.versions.node.split(".")[0]')
if [ "$MAJOR" -lt 20 ]; then echo "Node $MAJOR encontrado; atualize para 20+."; exit 1; fi
# </dev/tty mantém as perguntas interativas mesmo quando o script vem por pipe
exec npx -y "github:$REPO" "$@" </dev/tty
