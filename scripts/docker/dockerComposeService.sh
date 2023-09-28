#!/bin/bash -eu
# ----------------------------------------------
#
# コンテナ制御
#
# ----------------------------------------------

# ----------------------------------------------
# オペレーションチェック
# ----------------------------------------------
usage() {
    echo "Usage: \"$0\" {up|down|update_web|start_web}"
}

if [ "$#" -eq 0 ]; then
  usage
  exit 1
fi

# ----------------------------------------------
# コマンドライン定数
# ----------------------------------------------
readonly OPERATION=$1

# ----------------------------------------------
# 定数定義
# ----------------------------------------------
readonly ENV_FILE=docker-compose.env

# ----------------------------------------------
# 変数定義
# ----------------------------------------------

# ----------------------------------------------
# 関数定義
# ----------------------------------------------

start_container() {
    docker-compose --env-file "${ENV_FILE}" up -d || {
        echo "Failed to execute: docker-compose --env-file ${ENV_FILE} up -d" >&2
        exit 1
    }
}

stop_container() {
    docker-compose --env-file "${ENV_FILE}" down || {
        echo "Failed to execute: docker-compose --env-file ${ENV_FILE} down" >&2
        exit 1
    }
}

update_web_container() {
    docker-compose --env-file "${ENV_FILE}" pull web || {
        echo "Failed to execute: docker-compose --env-file ${ENV_FILE} pull web" >&2
        exit 1
    }
}

start_web_container() {
    docker-compose --env-file "${ENV_FILE}" up -d web || {
        echo "Failed to execute: docker-compose --env-file ${ENV_FILE} up -d web" >&2
        exit 1
    }
}

main() {

  case ${OPERATION} in
    "up")
      start_container 
      ;;
    "down")
      stop_container
      ;;
    "update_web")
      update_web_container
      ;;
    "start_web")
      start_web_container
      ;;
    *)
      usage
      ;;
  esac

}

main "$@"
exit $?