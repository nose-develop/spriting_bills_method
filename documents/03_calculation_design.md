# 計算ロジック設計

## 基本原則

- すべての計算関数は純粋関数として分離します。
- UIコンポーネント内に金額配分ロジックを直接書きません。
- どのモードでも、最終的に`sum(results.amount) === totalAmount`を検証します。
- 不一致が発生した場合はエラーとして扱い、結果画面へ進めません。
- 金額は浮動小数点ではなく整数で扱います。

## 推奨ファイル構成

```text
app/
  page.tsx
components/
  TopScreen.tsx
  InputScreen.tsx
  ResultScreen.tsx
  MemberFields.tsx
  ModeSpecificSettings.tsx
  PaymentCard.tsx
lib/
  split/
    types.ts
    constants.ts
    normal.ts
    weighted.ts
    random.ts
    roulette.ts
    validation.ts
    format.ts
```

## 丸め方

端数処理単位が`unit`の場合、各支払い額は原則として`unit`単位に丸めます。

```ts
const floorToUnit = (value: number, unit: RoundingUnit) =>
  Math.floor(value / unit) * unit;
```

ただし、合計金額自体が`unit`で割り切れない場合、差額調整を担当するメンバーの金額には`unit`未満の端数が含まれる可能性を許容します。合計金額との一致を最優先します。

## 通常割り勘アルゴリズム

1. `base = floorToUnit(totalAmount / memberCount, unit)`を計算する。
2. 全員の支払い額を`base`にする。
3. `remainder = totalAmount - base * memberCount`を計算する。
4. `remainder > 0`の場合、ランダムに選んだ1人へ`remainder`を加算する。
5. 合計検証を行う。

## 上司多め割り勘アルゴリズム

1. 各メンバーの倍率を取得する。
2. `weightTotal`を計算する。
3. 各メンバーの理論値`rawAmount = totalAmount * weight / weightTotal`を計算する。
4. 各メンバーを`floorToUnit(rawAmount, unit)`で仮確定する。
5. `diff = totalAmount - sum(flooredAmounts)`を計算する。
6. `diff`を調整対象者に配分する。
7. 合計検証を行う。

### 差額調整方針

- まず、理論値と丸め後金額の差が大きい人を優先して調整する。
- 同点の場合はランダムまたは入力順で決める。
- `diff`が`unit`以上なら`unit`ずつ配分する。
- 最後に`unit`未満が残る場合は1人に加算する。

## 完全ランダム割り勘アルゴリズム

### 最小支払い額

0円の人を出さないため、各メンバーに最低`minAmount`を割り当てます。

- `unit`が1の場合: `minAmount = 1`
- `unit`が10または100の場合: `minAmount = unit`
- ただし`totalAmount < minAmount * memberCount`の場合は、最低額を1円に下げる

### 配分手順

1. 全員に`minAmount`を割り当てる。
2. 残額`remaining = totalAmount - minAmount * memberCount`を計算する。
3. 強度に応じてランダムな重みを人数分生成する。
4. 残額を重みに応じて仮配分する。
5. 端数処理単位で丸める。
6. 差額をランダムなメンバーへ配分し、合計を一致させる。
7. 0円以下がないことを検証する。

### 強度別重み生成

| 強度 | 重み生成イメージ |
| --- | --- |
| やさしい | `0.8 - 1.2`程度の狭い乱数 |
| 普通 | `0.4 - 1.8`程度の乱数 |
| 地獄 | 乱数を二乗するなど偏りを強くする |

## 端数ルーレットアルゴリズム

1. 通常割り勘アルゴリズムを実行する。
2. `remainder > 0`の場合、端数負担者を`isRemainderPayer: true`にする。
3. ルーレット演出は計算結果を変えない表示上の効果として扱う。

## バリデーション

| 条件 | エラー文例 |
| --- | --- |
| 合計金額が未入力 | 合計金額を入力してください |
| 合計金額が0円以下 | 合計金額は1円以上で入力してください |
| 人数が2人未満 | 人数は2人以上にしてください |
| 計算結果の合計不一致 | 計算結果の合計が合計金額と一致しません |

## テスト観点

- 1円単位、10円単位、100円単位で合計が一致する。
- 合計金額が人数で割り切れる場合、端数負担者が不要になる。
- 合計金額が人数で割り切れない場合、差額が1人以上に正しく配分される。
- 上司多め割り勘で倍率が支払い額に反映される。
- 完全ランダム割り勘で0円の人が出ない。
- 再計算でランダム結果が変化し得る。
