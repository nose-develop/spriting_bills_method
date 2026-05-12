import type { MemberInput, PaymentResult, RoundingUnit } from "./types";
import { assertTotalMatches, floorToUnit, getDisplayName, randomIndex } from "./utils";

export const calculateNormalSplit = (
  totalAmount: number,
  members: MemberInput[],
  roundingUnit: RoundingUnit,
): PaymentResult[] => {
  const baseAmount = floorToUnit(totalAmount / members.length, roundingUnit);
  const remainder = totalAmount - baseAmount * members.length;
  const remainderPayerIndex = remainder > 0 ? randomIndex(members.length) : -1;

  const payments = members.map((member, index) => ({
    memberId: member.id,
    name: getDisplayName(member, index),
    amount: baseAmount + (index === remainderPayerIndex ? remainder : 0),
    isRemainderPayer: index === remainderPayerIndex,
  }));

  assertTotalMatches(payments, totalAmount);
  return payments;
};
