# Webアプリ(GCE)とCloud Functions(GCF)の接続設定
---

特になし

- GCFの認証はなし
- 上り（内向き）設定 すべてのトラフィックを許可する
- HTTPトリガー受信時、CORS制限をかける

```
docker system prune -a
docker volume prune
```
