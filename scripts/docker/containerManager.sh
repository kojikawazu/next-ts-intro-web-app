#!/bin/bash -eu
# ----------------------------------------------
#
# コンテナ管理シェル
#
# ----------------------------------------------

# ----------------------------------------------
# 定数定義
# ----------------------------------------------
readonly CURRENT_DIR=$(cd $(dirname $0); pwd)
readonly TARGET_SHELL=dockerComposeService.sh

# SIGTERM シグナルハンドラを設定 (サービス停止時に呼び出される)
trap 'shutdown' SIGTERM

shutdown() {
  ${CURRENT_DIR}/${TARGET_SHELL} down
  exit 0
}

main(){
  # 初回実行
  ${CURRENT_DIR}/${TARGET_SHELL} up

  while true; do
    sleep 60
  done
}

main "$@"
exit $?