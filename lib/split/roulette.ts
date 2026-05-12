import type { MemberInput, PaymentResult, RoundingUnit } from "./types";
import { calculateNormalSplit } from "./normal";

export const calculateRouletteSplit = (
  totalAmount: number,
  members: MemberInput[],
  roundingUnit: RoundingUnit,
): PaymentResult[] => calculateNormalSplit(totalAmount, members, roundingUnit);
