import { MODE_LABELS } from "./constants";
import { calculateNormalSplit } from "./normal";
import { calculateRandomSplit } from "./random";
import { calculateRouletteSplit } from "./roulette";
import type { CalculationInput, CalculationResult } from "./types";
import { calculateWeightedSplit } from "./weighted";

const NORMAL_COMMENTS = [
  "今日はきれいめ割り勘です。",
  "端数は運命の一杯ということで。",
  "平和な会計になりました。",
];

const WEIGHTED_COMMENTS = [
  "頼れる人ほど少し多め、いい夜です。",
  "今日は先輩方の背中が大きく見えます。",
  "バランスよくごちそうさまです。",
];

const RANDOM_COMMENTS = [
  "ガチャの神様はこう言っています。",
  "これはもう運命です。",
  "次の一杯で記憶を上書きしましょう。",
  "会計にドラマが生まれました。",
];

const ROULETTE_COMMENTS = [
  "端数担当、堂々の決定です。",
  "ルーレットは静かに仕事をしました。",
  "今日のラッキー会計係が決まりました。",
];

const pickComment = (comments: string[]) =>
  comments[Math.floor(Math.random() * comments.length)];

export const calculateSplit = (input: CalculationInput): CalculationResult => {
  const payments =
    input.mode === "normal"
      ? calculateNormalSplit(input.totalAmount, input.members, input.roundingUnit)
      : input.mode === "weighted"
        ? calculateWeightedSplit(input.totalAmount, input.members, input.roundingUnit)
        : input.mode === "random"
          ? calculateRandomSplit(
              input.totalAmount,
              input.members,
              input.roundingUnit,
              input.randomIntensity,
            )
          : calculateRouletteSplit(input.totalAmount, input.members, input.roundingUnit);

  const comment =
    input.mode === "normal"
      ? pickComment(NORMAL_COMMENTS)
      : input.mode === "weighted"
        ? pickComment(WEIGHTED_COMMENTS)
        : input.mode === "random"
          ? pickComment(RANDOM_COMMENTS)
          : pickComment(ROULETTE_COMMENTS);

  return {
    payments,
    comment: `${MODE_LABELS[input.mode]}: ${comment}`,
    total: input.totalAmount,
    mode: input.mode,
  };
};

export type {
  CalculationInput,
  CalculationResult,
  MemberInput,
  MemberRole,
  PaymentResult,
  RandomIntensity,
  RoundingUnit,
  SplitMode,
} from "./types";
