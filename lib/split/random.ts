import type { MemberInput, PaymentResult, RandomIntensity, RoundingUnit } from "./types";
import { assertTotalMatches, floorToUnit, getDisplayName, randomIndex, sumPayments } from "./utils";

const getRandomWeight = (intensity: RandomIntensity) => {
  if (intensity === "gentle") {
    return 0.8 + Math.random() * 0.4;
  }

  if (intensity === "normal") {
    return 0.4 + Math.random() * 1.4;
  }

  const value = Math.random();
  return 0.1 + value * value * 3.4;
};

const getMinimumAmount = (
  totalAmount: number,
  memberCount: number,
  roundingUnit: RoundingUnit,
) => {
  const unitMinimum = roundingUnit === 1 ? 1 : roundingUnit;
  return totalAmount >= unitMinimum * memberCount ? unitMinimum : 1;
};

export const calculateRandomSplit = (
  totalAmount: number,
  members: MemberInput[],
  roundingUnit: RoundingUnit,
  intensity: RandomIntensity,
): PaymentResult[] => {
  const minimumAmount = getMinimumAmount(totalAmount, members.length, roundingUnit);
  const baseTotal = minimumAmount * members.length;
  const remaining = totalAmount - baseTotal;

  if (remaining < 0) {
    throw new Error("全員が1円以上払うには合計金額が足りません");
  }

  const weights = members.map(() => getRandomWeight(intensity));
  const weightTotal = weights.reduce((sum, weight) => sum + weight, 0);

  const payments = members.map((member, index) => ({
    memberId: member.id,
    name: getDisplayName(member, index),
    amount: minimumAmount + floorToUnit((remaining * weights[index]) / weightTotal, roundingUnit),
  }));

  let diff = totalAmount - sumPayments(payments);
  while (diff > 0) {
    const index = randomIndex(payments.length);
    const increment = diff >= roundingUnit ? roundingUnit : diff;
    payments[index].amount += increment;
    diff -= increment;
  }

  if (payments.some((payment) => payment.amount <= 0)) {
    throw new Error("0円以下の支払い結果が発生しました");
  }

  assertTotalMatches(payments, totalAmount);
  return payments;
};
