import { RANDOM_INTENSITY_LABELS } from "@/lib/split/constants";
import type { RandomIntensity, SplitMode } from "@/lib/split";

type ModeSpecificSettingsProps = {
  mode: SplitMode;
  randomIntensity: RandomIntensity;
  onChangeRandomIntensity: (intensity: RandomIntensity) => void;
};

const intensities = Object.keys(RANDOM_INTENSITY_LABELS) as RandomIntensity[];

export function ModeSpecificSettings({
  mode,
  randomIntensity,
  onChangeRandomIntensity,
}: ModeSpecificSettingsProps) {
  if (mode !== "random") {
    return null;
  }

  return (
    <fieldset className="space-y-3">
      <legend className="text-lg font-bold text-zinc-50">ランダム強度</legend>
      <div className="grid grid-cols-3 gap-2">
        {intensities.map((intensity) => (
          <button
            className={`h-12 rounded-md border px-2 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-yellow-300 ${
              randomIntensity === intensity
                ? "border-yellow-300 bg-yellow-300 text-zinc-950"
                : "border-zinc-700 bg-zinc-900 text-zinc-200 hover:border-orange-300"
            }`}
            key={intensity}
            onClick={() => onChangeRandomIntensity(intensity)}
            type="button"
          >
            {RANDOM_INTENSITY_LABELS[intensity]}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
