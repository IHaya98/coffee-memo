# Coffee Memo - コーヒー記録アプリ

飲んだコーヒーを記録して、味の傾向を分析できるアプリケーションです。

## 機能

- ☕ コーヒー記録の追加・編集・削除
- 📊 味の評価（酸味・苦み・甘み・香り）
- 📈 統計・分析機能
- 🔍 検索・フィルタリング
- 📱 レスポンシブデザイン（モバイル・PC対応）

## 技術スタック

- **フロントエンド**: Next.js 15, TypeScript, Tailwind CSS
- **バックエンド**: Next.js API Routes, Prisma ORM
- **データベース**: PostgreSQL (Neon)
- **デプロイ**: Vercel
- **開発環境**: devcontainer

## セットアップ

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd coffee-memo
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 環境変数の設定

`.env.local` ファイルを作成し、以下の環境変数を設定してください：

```env
DATABASE_URL="postgresql://username:password@localhost:5432/coffee_memo?schema=public"
```

### 4. データベースのセットアップ

```bash
# Prismaクライアントの生成
npm run db:generate

# データベースマイグレーション
npm run db:migrate
```

### 5. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認できます。

## データベーススキーマ

```sql
CREATE TABLE coffee_records (
  id SERIAL PRIMARY KEY,
  variety VARCHAR(100) NOT NULL, -- 品種
  shop VARCHAR(100) NOT NULL,    -- 店舗名
  price DECIMAL(10,2),           -- 金額
  acidity INTEGER CHECK (acidity >= 1 AND acidity <= 5), -- 酸味
  bitterness INTEGER CHECK (bitterness >= 1 AND bitterness <= 5), -- 苦み
  sweetness INTEGER CHECK (sweetness >= 1 AND sweetness <= 5), -- 甘み
  aroma INTEGER CHECK (aroma >= 1 AND aroma <= 5), -- 香り
  comment TEXT,                  -- コメント
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 利用可能なスクリプト

- `npm run dev` - 開発サーバーを起動
- `npm run build` - プロダクションビルド
- `npm run start` - プロダクションサーバーを起動
- `npm run lint` - ESLintでコードをチェック
- `npm run db:push` - データベーススキーマをプッシュ
- `npm run db:generate` - Prismaクライアントを生成
- `npm run db:migrate` - データベースマイグレーションを実行
- `npm run db:studio` - Prisma Studioを起動

## デプロイ

### Vercelへのデプロイ

1. Vercelアカウントを作成
2. GitHubリポジトリを接続
3. 環境変数を設定
4. デプロイを実行

### 環境変数の設定

Vercelのダッシュボードで以下の環境変数を設定してください：

- `DATABASE_URL`: PostgreSQLデータベースの接続URL

## 開発環境

このプロジェクトはdevcontainerに対応しています。VS Codeでプロジェクトを開くと、自動的に開発環境が構築されます。

## ライセンス

MIT License

## 貢献

プルリクエストやイシューの報告を歓迎します。

## 更新履歴

### v1.0.0
- 初回リリース
- 基本的なコーヒー記録機能
- 統計・分析機能
- レスポンシブデザイン