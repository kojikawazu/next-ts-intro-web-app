


https://yunabe.hatenablog.com/entry/2023/06/04/220618



## WebコンテナをプルしてDockerコンテナビルド & 起動

```bash
# Artifact Registoryへのアクセス許可
gcloud auth configure-docker asia-northeast1-docker.pkg.dev

# Dockerコンテナビルド & 起動
docker-compose up --build -d
```