import type { ValidationInput } from "./types";

export const validateInput = ({ totalAmount, memberCount }: ValidationInput) => {
  const errors: string[] = [];
  const normalizedAmount = totalAmount.replace(/,/g, "").trim();
  const amount = Number(normalizedAmount);

  if (!normalizedAmount) {
    errors.push("合計金額を入力してください");
  } else if (!Number.isInteger(amount) || amount <= 0) {
    errors.push("合計金額は1円以上の整数で入力してください");
  }

  if (memberCount < 2) {
    errors.push("人数は2人以上にしてください");
  }

  if (Number.isInteger(amount) && amount > 0 && amount < memberCount) {
    errors.push("全員が1円以上払える合計金額を入力してください");
  }

  return {
    amount,
    errors,
  };
};
