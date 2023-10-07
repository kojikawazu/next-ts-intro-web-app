#!/bin/bash
# -----------------------------------------------------
#
# NGINXの設定
#
# -----------------------------------------------------

readonly CURRENT_DIR=$(cd $(/usr/bin/dirname $0); pwd)

main() {
  local _project_dir=$(cd ~; pwd)/projects

  if [ ! -f "${_project_dir}/nginx/conf.d" ]; then
    mkdir -p ${_project_dir}/nginx/conf.d
  fi

  cp -fp ${_project_dir}/etc/nginx/default.conf ${_project_dir}/nginx/conf.d
}

main "$@"
exit $?
