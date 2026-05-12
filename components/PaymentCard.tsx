import { ROLE_LABELS } from "@/lib/split/constants";
import { formatYen } from "@/lib/split/format";
import type { PaymentResult } from "@/lib/split";

type PaymentCardProps = {
  payment: PaymentResult;
  revealRemainder?: boolean;
};

export function PaymentCard({ payment, revealRemainder = true }: PaymentCardProps) {
  const showRemainder = revealRemainder && payment.isRemainderPayer;

  return (
    <article
      className={`rounded-lg border p-4 shadow-lg shadow-black/20 ${
        showRemainder
          ? "border-yellow-300 bg-yellow-300 text-zinc-950"
          : "border-zinc-700 bg-zinc-900 text-zinc-50"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="break-words text-lg font-black">{payment.name}</h3>
          <div className="mt-1 flex flex-wrap gap-2 text-xs font-bold">
            {payment.role ? (
              <span className="rounded bg-black/10 px-2 py-1">
                {ROLE_LABELS[payment.role]} x{payment.weight?.toFixed(1)}
              </span>
            ) : null}
            {showRemainder ? (
              <span className="rounded bg-red-700 px-2 py-1 text-white">端数担当</span>
            ) : null}
          </div>
        </div>
        <p className="shrink-0 text-2xl font-black tabular-nums">{formatYen(payment.amount)}</p>
      </div>
    </article>
  );
}
