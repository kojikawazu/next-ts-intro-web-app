#!/bin/bash
# -----------------------------------------------------
#
# 環境変数の設定
#
# -----------------------------------------------------

readonly CURRENT_DIR=$(cd $(/usr/bin/dirname $0); pwd)

main() {
  local _project_dir=$(cd ~; pwd)/projects

  cd ${_project_dir}

  # .envの作成
  cat docker-compose.yml | grep "NODE_ENV" > .env
  cat docker-compose.yml | grep "APP_ENV" >> .env

  # .env.localの作成
  cat docker-compose.yml | grep "NEXT_PUBLIC_" > .env.local

  sed -i -e "s/[ \t]*//g" .env
  sed -i -e "s/^-//g" .env
  sed -i -e "s/[ \t]*//g" .env.local
  sed -i -e "s/^-//g" .env.local
  chmod 644 .env
  chmod 644 .env.local

  cd ${CURRENT_DIR}
  
  return 0
}

main "$@"
exit $?