import { PaymentCard } from "@/components/PaymentCard";
import { MODE_LABELS } from "@/lib/split/constants";
import { formatResultText, formatYen } from "@/lib/split/format";
import type { CalculationResult } from "@/lib/split";

type ResultScreenProps = {
  copyStatus: string;
  result: CalculationResult;
  rouletteResolved: boolean;
  rouletteName: string;
  onBackToInput: () => void;
  onCopy: () => void;
  onRecalculate: () => void;
  onReset: () => void;
};

export function ResultScreen({
  copyStatus,
  result,
  rouletteResolved,
  rouletteName,
  onBackToInput,
  onCopy,
  onRecalculate,
  onReset,
}: ResultScreenProps) {
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    formatResultText(result),
  )}`;
  const remainderPayer = result.payments.find((payment) => payment.isRemainderPayer);
  const revealRemainder = result.mode !== "roulette" || rouletteResolved;

  return (
    <section className="min-h-dvh px-5 py-8">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <header className="space-y-3">
          <p className="text-sm font-semibold text-orange-300">{MODE_LABELS[result.mode]}</p>
          <div>
            <h1 className="text-4xl font-black text-yellow-200">ガチャ結果</h1>
            <p className="mt-2 text-sm leading-6 text-zinc-400">{result.comment}</p>
          </div>
        </header>

        <div className="rounded-lg border border-orange-400/30 bg-zinc-900 p-5">
          <p className="text-sm font-bold text-zinc-400">合計金額</p>
          <p className="mt-2 text-4xl font-black text-zinc-50 tabular-nums">
            {formatYen(result.total)}
          </p>
        </div>

        {result.mode === "roulette" && remainderPayer ? (
          <div className="rounded-lg border border-yellow-300 bg-red-700 p-4 text-center text-white shadow-lg shadow-red-950/50">
            <p className="text-sm font-bold text-yellow-100">
              {rouletteResolved ? "端数担当が決定" : "端数ルーレット中"}
            </p>
            <p className="mt-2 text-2xl font-black">
              {rouletteResolved ? remainderPayer.name : rouletteName || "抽選中"}
            </p>
          </div>
        ) : null}

        <div className="grid gap-3">
          {result.payments.map((payment) => (
            <PaymentCard
              key={payment.memberId}
              payment={payment}
              revealRemainder={revealRemainder}
            />
          ))}
        </div>

        <div className="grid gap-3">
          <button
            className="h-14 rounded-lg bg-orange-500 px-4 font-black text-zinc-950 transition hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            onClick={onRecalculate}
            type="button"
          >
            もう一度ガチャる
          </button>
          <button
            className="h-14 rounded-lg border border-zinc-700 bg-zinc-900 px-4 font-bold text-zinc-50 transition hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            onClick={onCopy}
            type="button"
          >
            結果をコピー
          </button>
          {copyStatus ? <p className="text-center text-sm text-yellow-200">{copyStatus}</p> : null}
          <a
            className="flex h-14 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 px-4 font-bold text-zinc-50 transition hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            href={shareUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Xで共有
          </a>
          <div className="grid grid-cols-2 gap-3">
            <button
              className="h-12 rounded-lg border border-zinc-700 px-3 font-bold text-zinc-200 transition hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              onClick={onBackToInput}
              type="button"
            >
              条件を変更
            </button>
            <button
              className="h-12 rounded-lg border border-zinc-700 px-3 font-bold text-zinc-200 transition hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              onClick={onReset}
              type="button"
            >
              トップに戻る
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
