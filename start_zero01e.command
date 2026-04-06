#!/bin/zsh
set -euo pipefail

cd /Users/a01/Codex_Pro/zero01e-site
./run.sh

echo ""
echo "실행 명령이 완료되었습니다."
echo "로그: /Users/a01/Codex_Pro/zero01e-site/.runtime/next-dev.log"
echo "종료는 stop_zero01e.command를 실행하세요."
echo ""
read -k 1 "?아무 키나 누르면 창을 닫습니다..."
echo ""
