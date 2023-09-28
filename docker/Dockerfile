# ベースとなるイメージを指定
FROM node:16.17.1

# ---------------------------------------------------
# ユーザ設定
# ---------------------------------------------------
RUN adduser --disabled-password --gecos '' appuser

# ---------------------------------------------------
# 作業ディレクトリの設定
# ---------------------------------------------------
WORKDIR /app
RUN chown -R appuser:appuser /app

# ---------------------------------------------------
# 依存関係のファイルをコピー
# ---------------------------------------------------
COPY package*.json ./
RUN chown appuser:appuser /app/package*.json

# ---------------------------------------------------
# 依存関係のインストール
# ---------------------------------------------------
RUN npm install --only=production

# ---------------------------------------------------
# アプリケーションのソースをコピー
# ---------------------------------------------------
COPY . .

# ---------------------------------------------------
# ファイル配置
# ---------------------------------------------------
RUN chown -R appuser:appuser /app
RUN mv -f /app/scripts/entrypoint/entryPoint.sh /app/.
RUN mv -f /app/scripts/docker/dockerComposeService.sh /app/.
RUN mv -f /app/etc/services/containerControl.service /etc/systemd/system/.

# ---------------------------------------------------
# 所有者変更
# ---------------------------------------------------
RUN chmod +x *.sh
RUN sudo chmod 755 /etc/systemd/system/containerControl.service
RUN chown root:root /etc/systemd/system/containerControl.service
RUN printf "$(ls -altr /app)\n"

# ---------------------------------------------------
# ビルド
# ---------------------------------------------------
USER appuser
RUN npm run build
RUN printf "$(ls -altr /app)\n"

# ---------------------------------------------------
# 不要な環境変数の削除
# ---------------------------------------------------
RUN sed -i -e "s/NEXT_PUBLIC_BUILD_WORD=.*//" /app/.env

# ---------------------------------------------------
# サービスの設定
# ---------------------------------------------------
RUN sudo systemctl daemon-reload
RUN sudo systemctl enable containerControl
RUN sudo systemctl start containerControl

# ---------------------------------------------------
# 3000番ポートを公開
# ---------------------------------------------------
EXPOSE 3000

# ---------------------------------------------------
# コンテナ起動時に実行するコマンド
# ---------------------------------------------------
ENTRYPOINT ["/app/entryPoint.sh"]
