# 実装方針・作業メモ

## 実装前チェック

実装や改修を始める前に、必ず以下を確認します。

1. `documents/`配下の設計書
2. `AGENTS.md`
3. `node_modules/next/dist/docs/`の関連ドキュメント
4. 既存の`app/`構成とTailwind CSS設定

## 実装順序案

1. 型、定数、計算ロジックを`lib/split/`へ作成する。
2. 計算ロジックの単体確認を行う。
3. `app/page.tsx`をクライアントコンポーネントとして画面状態を管理する。
4. トップ画面、入力画面、結果画面の順にコンポーネントを作る。
5. コピー機能、X共有、ルーレット演出を追加する。
6. READMEへ起動方法と機能概要を追記する。
7. `npm run lint`と`npm run build`で確認する。

## 状態管理案

```ts
type Screen = "top" | "input" | "result";

type AppState = {
  screen: Screen;
  mode: SplitMode | null;
  totalAmount: string;
  memberCount: number;
  members: MemberInput[];
  roundingUnit: RoundingUnit;
  randomIntensity: RandomIntensity;
  result: PaymentResult[] | null;
  comment: string;
  errors: string[];
};
```

## README記載内容

READMEには以下を含めます。

- アプリ名
- 機能概要
- 対応モード
- 技術スタック
- 起動方法
  - `npm install`
  - `npm run dev`
  - `npm run build`
- 注意事項
  - DB不要
  - 外部API不要
  - フロントエンド完結

## 品質確認

### 必須

- `npm run lint`
- `npm run build`
- スマートフォン幅の表示確認
- PC幅の表示確認

### 重点確認

- 合計金額と支払い合計が一致する。
- バリデーションエラーが適切に出る。
- コピー機能が動作する。
- X共有リンクが生成される。
- 端数負担者が明確に分かる。

## 注意点

- 金額は浮動小数点ではなく整数で扱う。
- 入力値は文字列として受け取り、計算前に整数へ変換する。
- ランダム処理の結果も最後に必ず合計検証する。
- 計算ロジックはUIから独立させる。
- ルーレット演出は計算結果を変更しない。
