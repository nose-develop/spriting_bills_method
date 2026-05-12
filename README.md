# 飲み代ガチャ

居酒屋や飲み会の会計時に、スマートフォンですぐ使える割り勘Webアプリです。

## 機能概要

- 通常割り勘
- 上司多め割り勘
- 完全ランダム割り勘
- 端数ルーレット
- 結果コピー
- X共有リンク生成

## 技術スタック

- Next.js
- React
- TypeScript
- Tailwind CSS

## 起動方法

```bash
npm install
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

## ビルド

```bash
npm run build
```

## 注意事項

- ログイン機能はありません。
- データベースは使用しません。
- 外部APIは使用しません。
- 入力内容と計算結果はブラウザ上のstateで管理します。
