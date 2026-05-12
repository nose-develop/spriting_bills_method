import type { MemberInput, PaymentResult, RoundingUnit } from "./types";

export const floorToUnit = (value: number, unit: RoundingUnit) =>
  Math.floor(value / unit) * unit;

export const sumPayments = (payments: PaymentResult[]) =>
  payments.reduce((sum, payment) => sum + payment.amount, 0);

export const getDisplayName = (member: MemberInput, index: number) =>
  member.name.trim() || `メンバー${index + 1}`;

export const randomIndex = (length: number) => Math.floor(Math.random() * length);

export const pickRandom = <T>(items: T[]) => items[randomIndex(items.length)];

export const assertTotalMatches = (payments: PaymentResult[], totalAmount: number) => {
  if (sumPayments(payments) !== totalAmount) {
    throw new Error("計算結果の合計が合計金額と一致しません");
  }
};
