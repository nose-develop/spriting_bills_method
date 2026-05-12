"use client";

import { useEffect, useMemo, useState } from "react";
import { InputScreen } from "@/components/InputScreen";
import { ResultScreen } from "@/components/ResultScreen";
import { TopScreen } from "@/components/TopScreen";
import { DEFAULT_MEMBER_ROLE } from "@/lib/split/constants";
import { formatResultText } from "@/lib/split/format";
import { calculateSplit } from "@/lib/split";
import type {
  CalculationResult,
  MemberInput,
  RandomIntensity,
  RoundingUnit,
  SplitMode,
} from "@/lib/split";
import { validateInput } from "@/lib/split/validation";

type Screen = "top" | "input" | "result";

const createMember = (index: number): MemberInput => ({
  id: `member-${index + 1}-${Date.now()}`,
  name: "",
  role: DEFAULT_MEMBER_ROLE,
});

const createMembers = (count: number) =>
  Array.from({ length: count }, (_, index) => createMember(index));

export default function Home() {
  const [screen, setScreen] = useState<Screen>("top");
  const [mode, setMode] = useState<SplitMode>("normal");
  const [totalAmount, setTotalAmount] = useState("");
  const [memberCount, setMemberCount] = useState(2);
  const [members, setMembers] = useState<MemberInput[]>(() => createMembers(2));
  const [roundingUnit, setRoundingUnit] = useState<RoundingUnit>(100);
  const [randomIntensity, setRandomIntensity] = useState<RandomIntensity>("normal");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [copyStatus, setCopyStatus] = useState("");
  const [rouletteTick, setRouletteTick] = useState(0);

  const rouletteName = useMemo(() => {
    if (!result || result.mode !== "roulette") {
      return "";
    }

    return result.payments[rouletteTick % result.payments.length]?.name ?? "";
  }, [result, rouletteTick]);

  useEffect(() => {
    if (!result || result.mode !== "roulette") {
      return;
    }

    const intervalId = window.setInterval(() => {
      setRouletteTick((current) => current + 1);
    }, 120);
    const timeoutId = window.setTimeout(() => {
      window.clearInterval(intervalId);
      const payerIndex = result.payments.findIndex((payment) => payment.isRemainderPayer);
      setRouletteTick(payerIndex >= 0 ? payerIndex : 0);
    }, 1200);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, [result]);

  const handleSelectMode = (selectedMode: SplitMode) => {
    setMode(selectedMode);
    setErrors([]);
    setCopyStatus("");
    setScreen("input");
  };

  const handleChangeMemberCount = (count: number) => {
    const normalizedCount = Number.isFinite(count) ? Math.max(0, Math.floor(count)) : 0;
    setMemberCount(normalizedCount);
    setMembers((currentMembers) => {
      if (normalizedCount > currentMembers.length) {
        return [
          ...currentMembers,
          ...Array.from({ length: normalizedCount - currentMembers.length }, (_, index) =>
            createMember(currentMembers.length + index),
          ),
        ];
      }

      return currentMembers.slice(0, normalizedCount);
    });
  };

  const handleChangeMember = (id: string, updates: Partial<MemberInput>) => {
    setMembers((currentMembers) =>
      currentMembers.map((member) => (member.id === id ? { ...member, ...updates } : member)),
    );
  };

  const runCalculation = () => {
    const validation = validateInput({ totalAmount, memberCount, members });
    if (validation.errors.length > 0) {
      setErrors(validation.errors);
      setScreen("input");
      return null;
    }

    try {
      const calculated = calculateSplit({
        mode,
        totalAmount: validation.amount,
        members,
        roundingUnit,
        randomIntensity,
      });
      setResult(calculated);
      setErrors([]);
      setCopyStatus("");
      setScreen("result");
      return calculated;
    } catch (error) {
      const message = error instanceof Error ? error.message : "計算に失敗しました";
      setErrors([message]);
      setScreen("input");
      return null;
    }
  };

  const handleCopy = async () => {
    if (!result) {
      return;
    }

    try {
      await navigator.clipboard.writeText(formatResultText(result));
      setCopyStatus("コピーしました");
    } catch {
      setCopyStatus("コピーできませんでした");
    }
  };

  const handleReset = () => {
    setScreen("top");
    setMode("normal");
    setTotalAmount("");
    setMemberCount(2);
    setMembers(createMembers(2));
    setRoundingUnit(100);
    setRandomIntensity("normal");
    setResult(null);
    setErrors([]);
    setCopyStatus("");
  };

  return (
    <main className="min-h-dvh overflow-hidden bg-[radial-gradient(circle_at_top,#7f1d1d_0,#18181b_35%,#09090b_72%)] text-zinc-50">
      {screen === "top" ? <TopScreen onSelectMode={handleSelectMode} /> : null}

      {screen === "input" ? (
        <InputScreen
          errors={errors}
          memberCount={memberCount}
          members={members}
          mode={mode}
          onBack={handleReset}
          onCalculate={runCalculation}
          onChangeMember={handleChangeMember}
          onChangeMemberCount={handleChangeMemberCount}
          onChangeRandomIntensity={setRandomIntensity}
          onChangeRoundingUnit={setRoundingUnit}
          onChangeTotalAmount={setTotalAmount}
          randomIntensity={randomIntensity}
          roundingUnit={roundingUnit}
          totalAmount={totalAmount}
        />
      ) : null}

      {screen === "result" && result ? (
        <ResultScreen
          copyStatus={copyStatus}
          onBackToInput={() => setScreen("input")}
          onCopy={handleCopy}
          onRecalculate={runCalculation}
          onReset={handleReset}
          result={result}
          rouletteName={rouletteName}
        />
      ) : null}
    </main>
  );
}
