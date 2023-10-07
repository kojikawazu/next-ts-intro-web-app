



## Production用イメージを使う(Artifact Registry)
---

#### サービスアカウント
使用サービスアカウントに以下IAMを付与する。
- Artifact Registry 読み取り


#### まずはDockerに対する認証を行う

```bash
# Dockerに対する認証
gcloud auth configure-docker

# Artifact Registryに対する認証
gcloud auth configure-docker asia-northeast1-docker.pkg.dev
```

#### docker-composeを使用したコンテナビルド & 起動

```bash
# 必要なファイルは以下だけ
./etc/nginx/conf.d/default.conf

# コンテナプル & ビルド & 起動
docker-compose up --build -d
```