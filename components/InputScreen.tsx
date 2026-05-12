import { MemberFields } from "@/components/MemberFields";
import { ModeSpecificSettings } from "@/components/ModeSpecificSettings";
import { MODE_LABELS, ROUNDING_UNITS } from "@/lib/split/constants";
import type { MemberInput, RandomIntensity, RoundingUnit, SplitMode } from "@/lib/split";

const BOTTOM_AMOUNT_ERROR_MEMBER_THRESHOLD = 5;

type InputScreenProps = {
  errors: string[];
  memberCount: number;
  members: MemberInput[];
  mode: SplitMode;
  randomIntensity: RandomIntensity;
  roundingUnit: RoundingUnit;
  totalAmount: string;
  onBack: () => void;
  onCalculate: () => void;
  onChangeMember: (id: string, updates: Partial<MemberInput>) => void;
  onChangeMemberCount: (count: number) => void;
  onChangeRandomIntensity: (intensity: RandomIntensity) => void;
  onChangeRoundingUnit: (unit: RoundingUnit) => void;
  onChangeTotalAmount: (value: string) => void;
};

export function InputScreen({
  errors,
  memberCount,
  members,
  mode,
  randomIntensity,
  roundingUnit,
  totalAmount,
  onBack,
  onCalculate,
  onChangeMember,
  onChangeMemberCount,
  onChangeRandomIntensity,
  onChangeRoundingUnit,
  onChangeTotalAmount,
}: InputScreenProps) {
  const normalizedTotalAmount = totalAmount.replace(/,/g, "").trim();
  const amountValue = Number(normalizedTotalAmount);
  const bottomAmountErrors =
    errors.length > 0 && memberCount >= BOTTOM_AMOUNT_ERROR_MEMBER_THRESHOLD
      ? !normalizedTotalAmount
        ? ["合計金額を入力してください"]
        : !Number.isInteger(amountValue) || amountValue <= 0
          ? ["合計金額は1円以上の整数で入力してください"]
          : []
      : [];

  return (
    <section className="min-h-dvh px-5 py-8">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <header className="space-y-2">
          <button
            className="text-sm font-semibold text-orange-300 underline-offset-4 hover:underline"
            onClick={onBack}
            type="button"
          >
            トップに戻る
          </button>
          <h1 className="text-3xl font-black text-yellow-200">{MODE_LABELS[mode]}</h1>
          <p className="text-sm leading-6 text-zinc-400">合計金額と参加メンバーを入れてください。</p>
        </header>

        {errors.length > 0 ? (
          <div className="rounded-lg border border-red-400/50 bg-red-950/60 p-4 text-sm text-red-100">
            <p className="font-bold">入力を確認してください</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="grid gap-5 rounded-lg border border-orange-400/20 bg-zinc-900/80 p-4">
          <label className="grid gap-2 text-sm font-medium text-zinc-300">
            合計金額
            <div className="relative">
              <input
                className="h-14 w-full rounded-md border border-zinc-700 bg-zinc-950 px-4 pr-12 text-right text-2xl font-black text-zinc-50 outline-none transition placeholder:text-zinc-600 focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/30"
                inputMode="numeric"
                onChange={(event) => onChangeTotalAmount(event.target.value)}
                placeholder="12000"
                type="text"
                value={totalAmount}
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
                円
              </span>
            </div>
          </label>

          <label className="grid gap-2 text-sm font-medium text-zinc-300">
            人数
            <input
              className="h-12 rounded-md border border-zinc-700 bg-zinc-950 px-3 text-base text-zinc-50 outline-none transition focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/30"
              min={2}
              onChange={(event) => onChangeMemberCount(Number(event.target.value))}
              type="number"
              value={memberCount}
            />
          </label>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-zinc-300">端数処理単位</legend>
            <div className="grid grid-cols-3 gap-2">
              {ROUNDING_UNITS.map((unit) => (
                <button
                  className={`h-12 rounded-md border text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-yellow-300 ${
                    roundingUnit === unit
                      ? "border-yellow-300 bg-yellow-300 text-zinc-950"
                      : "border-zinc-700 bg-zinc-950 text-zinc-200 hover:border-orange-300"
                  }`}
                  key={unit}
                  onClick={() => onChangeRoundingUnit(unit)}
                  type="button"
                >
                  {unit}円
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <MemberFields members={members} mode={mode} onChangeMember={onChangeMember} />

        <ModeSpecificSettings
          mode={mode}
          onChangeRandomIntensity={onChangeRandomIntensity}
          randomIntensity={randomIntensity}
        />

        {bottomAmountErrors.length > 0 ? (
          <div className="rounded-lg border border-red-400/50 bg-red-950/70 p-4 text-sm text-red-100">
            <p className="font-bold">合計金額を確認してください</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {bottomAmountErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <button
          className="h-14 rounded-lg bg-orange-500 px-5 text-lg font-black text-zinc-950 shadow-lg shadow-orange-950/40 transition hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          onClick={onCalculate}
          type="button"
        >
          計算する
        </button>
      </div>
    </section>
  );
}
