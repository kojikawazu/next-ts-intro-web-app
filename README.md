# 自己紹介用のWebアプリケーション
---

以前構築していた自己紹介用のWebアプリをリニューアルしました。
URLは以下になります。

```bash
https://introtechkk.com
```

基本的に1ページ完結でシンプルに「私はこういう人です」と見ていただけることをコンセプトに開発しました。

コンポーネントは以下となります。
- ヘッダー
- 自己PR
- キャリア
- スキル
- お問い合わせフォーム
- フッター

全ての技術選定一覧を以下に記載しました。

- フロントエンド
  - 言語 
    - TypeScript 5
  - FW 
    - Next.js 13
    - TailwindCSS
  - 実行環境
    - Node.js 16
    
- バックエンドAPI
  - サーバレス
    - Cloud Functions
    - JavaScript
  - 実行環境
    - Node.js 20
 
- クラウド(GCP) 
  - VM環境
    - Compute Engine
  - ユーザー
    - Cloud IAM
    - サービスアカウント
  - リソース関係
    - Cloud Storage(画像、JSON)
    - Secret Manager(非公開文字列)
    - Artifact Registory(コンテナイメージ)
  - VPC
    - ファイアーウォールルール

- コード管理
  - GitHub

- CI/CD
  - GitHub Actions

- ドキュメント関係
  - Markdown
  - drawio
- デザイン関係
  - Figma
  - PhotoShop

※ バックエンドAPIは情報漏洩を防止し、公開できるようになるまでは非公開としてます。