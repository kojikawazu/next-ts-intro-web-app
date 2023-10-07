#!/bin/bash
# ----------------------------------------------------------------
# 
# - 実行準備
#
# ----------------------------------------------------------------

# 関数定義

# シェル実行関数
pre_exec() {
  local _exec_dir=$1
  local _exec_sh=$2
  local _exec_path=${_exec_dir}/${_exec_sh}
  local _current_permission=0

  _current_permission=$(stat --format='%a' ${_exec_path})
  if [ ${_current_permission} -ne 755 ]; then
    sudo chmod 755 ${_exec_path}
  fi

  echo "Call..."
  echo "${_exec_path}"

  bash ${_exec_path}

  echo "finish."
  return 0
}

# Dockerの準備
pre_docker_compose() {
  local _exec_dir=./docker
  local _exec_sh=preDockerCompose.sh

  pre_exec "${_exec_dir}" "${_exec_sh}"

  return 0
}

# Dockerの準備
set_env() {
  local _exec_dir=./env
  local _exec_sh=setEnv.sh

  pre_exec "${_exec_dir}" "${_exec_sh}"
  return 0
}

main() {
  # Dockerの準備
  pre_docker_compose
}

main
exit $?