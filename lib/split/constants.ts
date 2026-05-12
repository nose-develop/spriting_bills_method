import type { MemberRole, RandomIntensity, RoundingUnit, SplitMode } from "./types";

export const MODE_LABELS: Record<SplitMode, string> = {
  normal: "通常割り勘",
  weighted: "上司多め割り勘",
  random: "完全ランダム割り勘",
  roulette: "端数ルーレット",
};

export const MODE_DESCRIPTIONS: Record<SplitMode, string> = {
  normal: "きれいに割って、端数だけ運に任せる平和なモード。",
  weighted: "立場ごとの倍率で、ちょっと大人な支払いバランスに。",
  random: "誰がいくら払うかはガチャ次第。会計にドラマを。",
  roulette: "端数の行方をルーレット風に決める盛り上げモード。",
};

export const ROLE_LABELS: Record<MemberRole, string> = {
  boss: "上司",
  senior: "先輩",
  peer: "同期",
  junior: "後輩",
  student: "学生",
};

export const ROLE_WEIGHTS: Record<MemberRole, number> = {
  boss: 1.6,
  senior: 1.2,
  peer: 1,
  junior: 0.8,
  student: 0.6,
};

export const RANDOM_INTENSITY_LABELS: Record<RandomIntensity, string> = {
  gentle: "やさしい",
  normal: "普通",
  hell: "地獄",
};

export const ROUNDING_UNITS: RoundingUnit[] = [1, 10, 100];

export const DEFAULT_MEMBER_ROLE: MemberRole = "peer";
