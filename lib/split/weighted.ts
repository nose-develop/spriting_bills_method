import { ROLE_WEIGHTS } from "./constants";
import type { MemberInput, PaymentResult, RoundingUnit } from "./types";
import { assertTotalMatches, floorToUnit, getDisplayName, sumPayments } from "./utils";

export const calculateWeightedSplit = (
  totalAmount: number,
  members: MemberInput[],
  roundingUnit: RoundingUnit,
): PaymentResult[] => {
  const weightTotal = members.reduce((sum, member) => sum + ROLE_WEIGHTS[member.role], 0);
  const rawAmounts = members.map((member) => (totalAmount * ROLE_WEIGHTS[member.role]) / weightTotal);

  const payments = members.map((member, index) => ({
    memberId: member.id,
    name: getDisplayName(member, index),
    role: member.role,
    weight: ROLE_WEIGHTS[member.role],
    amount: floorToUnit(rawAmounts[index], roundingUnit),
  }));

  let diff = totalAmount - sumPayments(payments);
  const adjustmentOrder = payments
    .map((payment, index) => ({
      index,
      gap: rawAmounts[index] - payment.amount,
    }))
    .sort((a, b) => b.gap - a.gap);

  let cursor = 0;
  while (diff > 0) {
    const target = adjustmentOrder[cursor % adjustmentOrder.length].index;
    const increment = diff >= roundingUnit ? roundingUnit : diff;
    payments[target].amount += increment;
    diff -= increment;
    cursor += 1;
  }

  assertTotalMatches(payments, totalAmount);
  return payments;
};
