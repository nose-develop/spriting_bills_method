export type SplitMode = "normal" | "weighted" | "random" | "roulette";

export type RoundingUnit = 1 | 10 | 100;

export type MemberRole = "boss" | "senior" | "peer" | "junior" | "student";

export type RandomIntensity = "gentle" | "normal" | "hell";

export type MemberInput = {
  id: string;
  name: string;
  role: MemberRole;
};

export type PaymentResult = {
  memberId: string;
  name: string;
  role?: MemberRole;
  weight?: number;
  amount: number;
  isRemainderPayer?: boolean;
};

export type CalculationResult = {
  payments: PaymentResult[];
  comment: string;
  total: number;
  mode: SplitMode;
};

export type CalculationInput = {
  mode: SplitMode;
  totalAmount: number;
  members: MemberInput[];
  roundingUnit: RoundingUnit;
  randomIntensity: RandomIntensity;
};

export type ValidationInput = {
  totalAmount: string;
  memberCount: number;
  members: MemberInput[];
};
