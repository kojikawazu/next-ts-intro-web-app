# HTTPS対応
---

```yml
# docker-compose.ymlを以下に修正
  nginx:
    image: nginx:latest
    container_name: nginx-reverse-proxy
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d
      - ./certbot-www:/var/www/certbot
      - ./certs:/etc/letsencrypt
    depends_on:
      - web

  # Let's Encryptの証明書作成bot
  certbot:
    image: certbot/certbot
    volumes:
      - ./certs:/etc/letsencrypt
      - ./certbot-etc:/etc/certbot
      - ./certbot-www:/var/www/certbot
    depends_on:
      - nginx
```

```conf
# 以下に修正します。
server {
    listen 80;
    server_name introtechkk.com;

    location ~ /.well-known/acme-challenge {
        allow all;
        root /var/www/certbot;
        try_files $uri =404;
    }

    location / {
        proxy_pass http://web:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Let's Encryptの初回認証
# --emailは自身のEメールにします。
# ドメインは設定したドメイン名にします
docker-compose run --rm certbot certonly --webroot --webroot-path=/var/www/certbot --email Eメール --agree-tos --no-eff-email --force-renewal -d ドメイン

# 権限エラーで失敗するのでディレクトリ作成
cd ~/projects
sudo mkdir -p certbot-www/.well-known/acme-challenge
cd certbot-www/.well-known/acme-challenge
sudo touch test
sudo chmod 666 test
echo "test" > test
cd ~/projects

# WindowsPCでcurlするとファイル取得でき、アクセス可能なこと確認できる
curl http://introtechkk.com/.well-known/acme-challenge/test

# 他にもGCEのファイアーウォールルールの設定を行う
# これは一時的です
IPアドレス：0.0.0.0/0
ポート：TCP：80,443,3000

# Let's Encryptの初回認証(再)
docker-compose run --rm certbot certonly --webroot --webroot-path=/var/www/certbot --email Eメール --agree-tos --no-eff-email --force-renewal -d ドメイン

# 証明書
/etc/letsencrypt/live/introtechkk.com/fullchain.pem
# 秘密鍵
/etc/letsencrypt/live/introtechkk.com/privkey.pem

# 生成：2023年09月23日
# 有効期限：2023年12月21日

# NGINXのリロード
docker-compose down
docker-compose up -d
```