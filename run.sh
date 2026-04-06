#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RUNTIME_DIR="${ROOT_DIR}/.runtime"
PID_FILE="${RUNTIME_DIR}/next-dev.pid"
LOG_FILE="${RUNTIME_DIR}/next-dev.log"

mkdir -p "${RUNTIME_DIR}"

if [[ -f "${PID_FILE}" ]]; then
  EXISTING_PID="$(cat "${PID_FILE}")"
  if [[ -n "${EXISTING_PID}" ]] && kill -0 "${EXISTING_PID}" 2>/dev/null; then
    echo "이미 실행 중입니다. PID=${EXISTING_PID}"
    echo "로그: ${LOG_FILE}"
    exit 0
  fi
  rm -f "${PID_FILE}"
fi

cd "${ROOT_DIR}"

if [[ ! -d "node_modules" ]]; then
  echo "node_modules가 없어 npm install을 먼저 실행합니다."
  npm install
fi

nohup npm run dev >"${LOG_FILE}" 2>&1 &
NEW_PID=$!
echo "${NEW_PID}" >"${PID_FILE}"

sleep 2

if kill -0 "${NEW_PID}" 2>/dev/null; then
  echo "실행 완료: http://localhost:3000"
  echo "PID: ${NEW_PID}"
  echo "로그: ${LOG_FILE}"
  exit 0
fi

rm -f "${PID_FILE}"
echo "실행에 실패했습니다. 로그를 확인해 주세요: ${LOG_FILE}"
tail -n 20 "${LOG_FILE}" || true
exit 1
