# コーヒー記録アプリ タスクリスト

## プロジェクト概要
飲んだコーヒーを記録するアプリケーションの開発
- 技術スタック: Next.js + Neon Database + Vercel
- デザイン: レスポンシブ（モバイル・PC対応）
- 開発環境: devcontainer対応

## タスクリスト

### 1. プロジェクト初期設定
- [x] Next.jsプロジェクトの作成
- [x] TypeScript設定
- [x] ESLint/Prettier設定
- [x] devcontainer設定（.devcontainer/devcontainer.json）
- [x] 必要な依存関係のインストール

### 2. データベース設計・設定
- [ ] Neonデータベースアカウント作成
- [x] データベーススキーマ設計
  - [x] コーヒー記録テーブル設計
  - [x] 味の属性テーブル設計
  - [ ] 店舗テーブル設計（オプション）
- [x] Prisma ORM設定
- [x] データベース接続設定
- [x] マイグレーションファイル作成

### 3. UI/UX設計
- [x] デザインシステムの決定（Tailwind CSS推奨）
- [x] レスポンシブレイアウト設計
- [x] モバイルファーストデザイン
- [x] コンポーネント設計
  - [x] ヘッダーコンポーネント
  - [x] コーヒー記録フォーム
  - [x] コーヒー一覧表示
  - [x] 味の属性選択UI

### 4. コア機能実装
- [x] コーヒー記録フォーム
  - [x] 品種入力フィールド
  - [x] 店舗名入力フィールド
  - [x] 金額入力フィールド
  - [x] 日時選択
- [x] 味の属性記録機能
  - [x] 酸味レベル（1-5段階）
  - [x] 苦みレベル（1-5段階）
  - [x] 甘みレベル（1-5段階）
  - [x] 香りレベル（1-5段階）
  - [x] コメント欄
- [x] データ保存機能
- [x] バリデーション実装

### 5. データ表示機能
- [x] コーヒー記録一覧表示
- [x] 記録の詳細表示
- [x] 検索・フィルタリング機能
  - [x] 品種での検索
  - [x] 店舗での検索
  - [ ] 日付範囲でのフィルタ
- [x] ソート機能（日付、金額、評価順）

### 6. 統計・分析機能
- [x] 飲んだコーヒー数の表示
- [x] 平均金額の計算
- [x] お気に入り店舗の表示
- [x] 味の傾向分析（グラフ表示）

### 7. データ管理機能
- [ ] 記録の編集機能
- [x] 記録の削除機能
- [ ] データエクスポート機能（CSV/JSON）

### 8. パフォーマンス・最適化
- [ ] 画像最適化（店舗ロゴなど）
- [x] データベースクエリ最適化
- [x] キャッシュ戦略の実装
- [ ] ページネーション実装

### 9. テスト実装
- [ ] 単体テスト（Jest）
- [ ] 統合テスト
- [ ] E2Eテスト（Playwright推奨）
- [ ] テストカバレッジの確保

### 10. デプロイ・本番環境
- [ ] Vercelプロジェクト作成
- [ ] 環境変数設定
- [ ] データベース接続設定
- [ ] ドメイン設定（オプション）
- [ ] CI/CDパイプライン設定

### 11. ドキュメント・保守
- [x] README.md作成
- [ ] API仕様書作成
- [ ] デプロイ手順書作成
- [x] エラーハンドリング実装
- [x] ログ機能実装

## 技術仕様

### フロントエンド
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod（バリデーション）

### バックエンド
- Next.js API Routes
- Prisma ORM
- Neon Database (PostgreSQL)

### デプロイ
- Vercel
- GitHub Actions（CI/CD）

### 開発環境
- devcontainer
- VS Code
- Docker

## データベーススキーマ（予定）

```sql
-- コーヒー記録テーブル
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

## 完了基準
- [x] 全てのコア機能が動作する
- [x] モバイル・PC両方で適切に表示される
- [ ] Vercelにデプロイされ、本番環境で動作する
- [x] devcontainerで開発環境が構築できる
- [ ] 基本的なテストが通る
