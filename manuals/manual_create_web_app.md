# Webアプリケーション構築手順書
---


## Google Comupute Engine(GCE)の作成:
---
WebアプリケーションのVM環境をクラウドに構築します。

- Google Cloud Console にログイン
  - Google Cloud Console にアクセスしてログインします。

- プロジェクトを選択/作成
  - 左上のプロジェクトのドロップダウンから適切なプロジェクトを選択するか、新しいプロジェクトを作成します。

- Navigation menu から Compute Engine を選択
  - 左側のメニューから「Compute Engine」を選び、「VM インスタンス」をクリックします。

- VM インスタンスを作成
  -「VM インスタンスを作成」ボタンをクリックします。
  - 設定を入力
    - 名前: インスタンスの名前を入力します。
    - リージョンとゾーン: インスタンスをデプロイするリージョンとゾーンを選択します。
    - マシンのタイプ: 必要に応じてCPUとメモリのサイズを選択します。
    - ブートディスク: 「変更」をクリックして、Ubuntuの適切なバージョンを選びます。例えば「Ubuntu 20.04 LTS」など。
    - ファイアウォール: 必要に応じてHTTPトラフィックやHTTPSトラフィックを許可します。
    - ネットワーク タグを作成しておくこと

- インスタンスの作成
  - 全ての設定が完了したら、「作成」ボタンをクリックしてインスタンスを作成します。

- SSH接続
  - VM インスタンスのリストで作成したインスタンスの横にある「SSH」ボタンをクリックすると、ブラウザベースのSSHクライアントで直接インスタンスに接続できます。

## VMにDockerのインストール

```bash
# まずは更新
sudo apt update
# 必要なパッケージのインストール
sudo apt -y install apt-transport-https ca-certificates curl software-properties-common

# Dockerのダウンロード
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
# リポジトリのダウンロード
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
# dockerのインストール
sudo apt update
sudo apt -y install docker-ce
# 現在のユーザーをdockerグループに追加する
# sudoなしでdockerコマンド実行可能
sudo usermod -aG docker ${USER}
# docker-composeのインストール
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 終わったら一度ログアウトしてください
```

## VMのマシンイメージ化

Dockerとdocker-composeのインストールが完了したら、このVMのイメージを作成し、それをテンプレートとして使用できるようにします。

- Navigation menu から「Compute Engine」 > 「マシンイメージ」を選択します。
- 「マシンイメージの作成」をクリックします。
- 名前、説明を入力します。
- ソースタイプとして「ディスク」を選択し、先ほど設定を完了したディスク（VMのディスク）を選択します。
- 必要なら他のオプションも設定し、「イメージの作成」をクリックします。

# VMのインスタンステンプレート化


# ローカル環境からssh接続設定

- ローカル環境でSSHキーの生成
- 公開キーをGCP VMインスタンスに追加
  - 左のメニューから「Compute Engine」 > 「VMインスタンス」をクリックします。
  - 対象のインスタンスの名前をクリックして、詳細ページに移動します。
  - 「SSHキー」セクションに進みます。
  - 「編集」ボタンをクリックし、公開キーを追加します。
    - ログインユーザの設定も忘れずに！ 

# ローカルマシンからSSH接続

```bash
ssh -i [秘密キー] [YOUR_GCE_USERNAME]@[YOUR_GCE_EXTERNAL_IP]

# 秘密キー：作成した秘密鍵のフルパス
# YOUR_GCE_USERNAM：ログインユーザ
# YOUR_GCE_EXTERNAL_IP：外部IP
```

# ファイルの転送

scpコマンドやWinSCPを使い、ファイルを転送します。

```bash
cd /home/[ユーザー名]
mkdir -p [プロジェクトを入れるディレクトリ]
```

# Docker composeの実行

- VM環境に再ログイン(ssh)します。

- ディレクトリの確認をします。

```bash
cd /home/[ユーザー名]
ls -l
cd [プロジェクトを入れるディレクトリ]
ls -l

# 無事にプロジェクトがデプロイされたことを確認する
```

- Docker composeコマンドを実行する

```bash
# Dockerコンテナのビルドと起動をバックグラウンドで実行する
# コンテナの起動からWebアプリのプロセスが生成される
docker-compose up --build -d

# 実行完了後、以下コマンドを実行する
# コンテナイメージとコンテナプロセスまで生成されている
docker-compose images
docker-compose ps
```

# ファイアーウォールの設定

- 自身のIPアドレスを取得する
  - https://www.whatismyip.com/

- GCP コンソールにアクセスします。
- 左側のナビゲーションメニューから「VPC ネットワーク」 -> 「ファイアウォール」を選択します。
- 「ファイアウォールルールの作成」をクリックします。
- 必要な情報を入力します：
  - 名前: 適切な名前を付けます（例：allow-http-myip）。
  - ターゲットタグ: このルールを適用したい VM インスタンスに割り当てるためのネットワークタグを入力します（例：http-allow）。
  - ソース IP アドレス範囲: 先ほどメモしたあなたの IP アドレスを入力します。
  - 指定されたプロトコルとポート: tcp:80 と入力して HTTP 接続を許可します。
「作成」をクリックしてファイアウォールルールを保存します。

# Webアプリの起動確認

```bash
# ブラウザで確認する
http://[WebアプリのURL]　
```
