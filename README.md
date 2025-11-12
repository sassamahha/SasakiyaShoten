# ささきや書店 (Sasakiya Shoten)

ささきや書店は、日本の Kindle タイトルに特化したマルチテナント型の紹介サイトテンプレートです。ASIN を登録するだけで Amazon PA-API から書誌情報を取得し、無料/有料プランに応じたアフィリエイトタグを自動で付与します。公開ストアは `@username` 形式の URL で閲覧でき、同一配下でダッシュボードや設定も管理できます。

## 技術スタック

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Prisma + PostgreSQL (Supabase など)
- NextAuth (Email / Google)、Stripe Billing（今後連携予定）
- Amazon Product Advertising API (PA-API v5, JP)

## 主なディレクトリ

- `src/app` – App Router ページと API ルート
- `src/lib` – 共通ユーティリティ (`buildAmazonUrl`, `paapi` など)
- `prisma` – Prisma スキーマ

## 主要機能 (MVP 想定)

- ASIN 登録フォームと書籍管理ダッシュボード（ドラフト追加、公開切替、並び順変更）
- テナントごとの棚ページ `/@{username}`（Rewrite で `/u/[handle]` にマッピング）
- 無料プランは既定タグ、有料プランは独自タグで Amazon リンクを生成
- Amazon PA-API 経由での書誌情報取得（環境変数が未設定の場合は手動オーバーライド）
- NextAuth による Email / Google 認証とテナントオーナー判定

## 開発メモ

1. 環境変数を設定

   ```env
   DATABASE_URL="postgresql://..."
   NEXTAUTH_SECRET="..."
   NEXTAUTH_URL="http://localhost:3000"
   EMAIL_FROM="no-reply@sasakiya.dev"
   GOOGLE_CLIENT_ID="..."
   GOOGLE_CLIENT_SECRET="..."
   AMZ_ASSOC_TAG_DEFAULT="SasakiyaTag-22"
   PAAPI_ACCESS_KEY="..."
   PAAPI_SECRET_KEY="..."
   PAAPI_PARTNER_TAG="..."
   STRIPE_SECRET_KEY="..." # 課金導線の連携時に使用予定
   ```

2. 依存関係をインストール (例: pnpm)

   ```bash
   pnpm install
   ```

3. Prisma のマイグレーション

   ```bash
   pnpm prisma migrate dev
   ```

4. 開発サーバーを起動

   ```bash
   pnpm dev
   ```

## ライセンス

MIT
