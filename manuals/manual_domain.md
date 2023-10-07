
お名前.comでドメイン購入
Cloud DNSを使う。
お名前.comでネームサーバに登録
72時間ほど待つ

```file
default.conf

server {
    listen 80;
    server_name introtechkk.com;

    location / {
        proxy_pass http://web:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```