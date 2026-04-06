#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RUNTIME_DIR="${ROOT_DIR}/.runtime"
PID_FILE="${RUNTIME_DIR}/next-dev.pid"

if [[ ! -f "${PID_FILE}" ]]; then
  echo "종료할 PID 파일이 없습니다. (이미 종료되었거나 run.sh로 실행하지 않았습니다.)"
  exit 0
fi

TARGET_PID="$(cat "${PID_FILE}")"

if [[ -z "${TARGET_PID}" ]]; then
  rm -f "${PID_FILE}"
  echo "PID 정보가 비어 있어 정리만 수행했습니다."
  exit 0
fi

if ! kill -0 "${TARGET_PID}" 2>/dev/null; then
  rm -f "${PID_FILE}"
  echo "프로세스가 이미 종료되어 PID 파일만 정리했습니다. PID=${TARGET_PID}"
  exit 0
fi

kill "${TARGET_PID}" 2>/dev/null || true

for _ in {1..10}; do
  if ! kill -0 "${TARGET_PID}" 2>/dev/null; then
    rm -f "${PID_FILE}"
    echo "정상 종료되었습니다. PID=${TARGET_PID}"
    exit 0
  fi
  sleep 0.5
done

kill -9 "${TARGET_PID}" 2>/dev/null || true
rm -f "${PID_FILE}"
echo "강제 종료되었습니다. PID=${TARGET_PID}"
