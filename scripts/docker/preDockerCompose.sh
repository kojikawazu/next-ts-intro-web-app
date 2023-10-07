#!/bin/bash
# ----------------------------------------------------------------
# 
# - Dockerコンテナ準備
#
# ----------------------------------------------------------------

# 定数定義
readonly DEPLOY_PERMISSION=755
readonly DEPLOY_OWNER="k_kawa_lin_315"

declare -ar deployList=(\
"docker-compose.yml" \
"Dockerfile")

# 関数定義

# Dockerの準備
pre_docker() {
  local _src_dir=~/projects/docker
  local _dst_dir=~/projects
  local _deploy_permission=${DEPLOY_PERMISSION}
  local _deploy_owner="${DEPLOY_OWNER}:${DEPLOY_OWNER}"

  echo "pre_docker() start..."

  # プロジェクトのルートディレクトリへデプロイ
  echo "Deploy."
  for file in ${deployList[@]}
  do
    local _src_path=${_src_dir}/${file}
    local _dst_path=${_dst_dir}/${file}
    
    echo "${_src_path} -> ${_dst_path}"
    sudo cp -p ${_src_path} ${_dst_path}
    sudo chmod ${_deploy_permission} ${_dst_path}
    sudo chown ${_deploy_owner} ${_dst_path}
  done

  echo "end."
  echo "pre_docker() finish..."
  return 0
}

main() {
  # Dockerの準備
  pre_docker
}

main
exit $?