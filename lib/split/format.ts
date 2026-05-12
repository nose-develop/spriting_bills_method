import { MODE_LABELS, ROLE_LABELS } from "./constants";
import type { CalculationResult, PaymentResult } from "./types";

export const formatYen = (amount: number) =>
  new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(amount);

export const formatResultText = (result: CalculationResult) => {
  const lines = [
    "飲み代ガチャ 結果",
    `モード: ${MODE_LABELS[result.mode]}`,
    `合計: ${formatYen(result.total)}`,
    "",
    ...result.payments.map((payment) => formatPaymentLine(payment)),
    "",
    result.comment,
  ];

  return lines.join("\n");
};

const formatPaymentLine = (payment: PaymentResult) => {
  const roleText = payment.role ? `（${ROLE_LABELS[payment.role]}）` : "";
  const mark = payment.isRemainderPayer ? " 端数担当" : "";
  return `${payment.name}${roleText}: ${formatYen(payment.amount)}${mark}`;
};
