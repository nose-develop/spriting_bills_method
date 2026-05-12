import { ROLE_LABELS } from "@/lib/split/constants";
import type { MemberInput, MemberRole, SplitMode } from "@/lib/split";

type MemberFieldsProps = {
  members: MemberInput[];
  mode: SplitMode;
  onChangeMember: (id: string, updates: Partial<MemberInput>) => void;
};

const roles = Object.keys(ROLE_LABELS) as MemberRole[];

export function MemberFields({ members, mode, onChangeMember }: MemberFieldsProps) {
  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-lg font-bold text-zinc-50">メンバー</h2>
        <p className="text-sm text-zinc-400">
          名前が空欄の場合は「メンバー1」のように自動表示されます。
        </p>
      </div>

      <div className="space-y-3">
        {members.map((member, index) => (
          <div
            className="grid gap-2 rounded-lg border border-zinc-700 bg-zinc-900 p-3"
            key={member.id}
          >
            <label className="grid gap-2 text-sm font-medium text-zinc-300">
              名前 {index + 1}
              <input
                className="h-12 rounded-md border border-zinc-700 bg-zinc-950 px-3 text-base text-zinc-50 outline-none transition placeholder:text-zinc-600 focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/30"
                onChange={(event) => onChangeMember(member.id, { name: event.target.value })}
                placeholder={`メンバー${index + 1}`}
                type="text"
                value={member.name}
              />
            </label>

            {mode === "weighted" ? (
              <label className="grid gap-2 text-sm font-medium text-zinc-300">
                立場
                <select
                  className="h-12 rounded-md border border-zinc-700 bg-zinc-950 px-3 text-base text-zinc-50 outline-none transition focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/30"
                  onChange={(event) =>
                    onChangeMember(member.id, { role: event.target.value as MemberRole })
                  }
                  value={member.role}
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {ROLE_LABELS[role]}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
