import { MODE_DESCRIPTIONS, MODE_LABELS } from "@/lib/split/constants";
import type { SplitMode } from "@/lib/split";

type TopScreenProps = {
  onSelectMode: (mode: SplitMode) => void;
};

const modes: SplitMode[] = ["normal", "weighted", "random", "roulette"];

export function TopScreen({ onSelectMode }: TopScreenProps) {
  return (
    <section className="flex min-h-dvh items-center px-5 py-10">
      <div className="mx-auto flex w-full max-w-md flex-col gap-8">
        <div className="space-y-4">
          <p className="text-sm font-semibold text-orange-300">会計の空気を、ちょっと楽しく。</p>
          <h1 className="text-5xl font-black tracking-normal text-yellow-200">飲み代ガチャ</h1>
          <p className="text-base leading-7 text-zinc-300">
            金額を入れて、モードを選んで、運命の割り勘へ。居酒屋のテーブルでそのまま使えるスマホ向け会計ツールです。
          </p>
        </div>

        <div className="grid gap-3">
          {modes.map((mode) => (
            <button
              className="group flex min-h-24 flex-col items-start justify-center rounded-lg border border-orange-400/30 bg-zinc-900/90 px-5 py-4 text-left shadow-lg shadow-black/20 transition hover:border-yellow-300 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              key={mode}
              onClick={() => onSelectMode(mode)}
              type="button"
            >
              <span className="text-xl font-bold text-zinc-50 group-hover:text-yellow-200">
                {MODE_LABELS[mode]}
              </span>
              <span className="mt-2 text-sm leading-6 text-zinc-400">{MODE_DESCRIPTIONS[mode]}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
