import { FormEvent, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { $axios } from "@/shared/api";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import type { TApiResponse } from "@/shared/model/types";
export type Settings = { title: string; enabled: boolean; returnDeadlineDays: number };
export type Award = {
  id: number;
  mission: string;
  awardedAt: string;
  userId: number;
  amount: number;
};
type Dashboard = {
  settings: Settings;
  balance: number;
  missions: { code: string; title: string; description: string; completed: boolean }[];
  ledger: Award[];
};
export default function CampaignPage() {
  const client = useQueryClient();
  const [easeOfUse, setEase] = useState(5),
    [satisfaction, setSatisfaction] = useState(5),
    [feedback, setFeedback] = useState("");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["campaign"],
    queryFn: async () => (await $axios.get<TApiResponse<Dashboard>>("/campaign")).data.data,
    staleTime: 0,
  });
  const submit = useMutation({
    mutationFn: () => $axios.post("/campaign/survey", { easeOfUse, satisfaction, feedback }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["campaign"] });
      toast.success("설문 제출 완료! 스탬프가 적립되었습니다.");
    },
    onError: () => toast.error("설문을 제출하지 못했습니다. 다시 시도해 주세요."),
  });
  if (isLoading) return <p className="p-20">스탬프를 불러오는 중...</p>;
  if (isError || !data)
    return (
      <p className="p-20" role="alert">
        스탬프를 불러오지 못했습니다.
      </p>
    );
  return (
    <main className="mx-auto max-w-[600px] p-20 flex flex-col gap-20">
      <h1 className="text-24 font-bold">{data.settings.title}</h1>
      <div className="p-20 bg-primary-100 rounded-12">
        <p>나의 스탬프</p>
        <strong className="text-32">{data.balance}개</strong>
      </div>
      {!data.settings.enabled && <p>스탬프 투어가 아직 시작되지 않았습니다.</p>}
      {data.missions.map((m) => (
        <article key={m.code} className="border rounded-12 p-16">
          <h2 className="font-bold">
            {m.completed ? "✓ " : "○ "}
            {m.title}
          </h2>
          <p>{m.description}</p>
        </article>
      ))}
      {data.settings.enabled && !data.missions.find((m) => m.code === "SURVEY")?.completed && (
        <form
          className="flex flex-col gap-12"
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            submit.mutate();
          }}
        >
          <h2 className="font-bold">1분 설문</h2>
          <label>
            대여·반납은 쉬웠나요?
            <select
              className="border p-8 ml-8"
              value={easeOfUse}
              onChange={(e) => setEase(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}점
                </option>
              ))}
            </select>
          </label>
          <label>
            서비스에 얼마나 만족하셨나요?
            <select
              className="border p-8 ml-8"
              value={satisfaction}
              onChange={(e) => setSatisfaction(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}점
                </option>
              ))}
            </select>
          </label>
          <label>
            의견 (선택)
            <textarea
              className="border rounded-8 p-8 w-full"
              maxLength={1000}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </label>
          <button disabled={submit.isPending} className="p-12 rounded-8 bg-primary-500 text-white">
            {submit.isPending ? "제출 중..." : "설문 제출하기"}
          </button>
        </form>
      )}
      <Link className="text-primary-500" to="/qr-scan">
        우산 QR 스캔하기 →
      </Link>
    </main>
  );
}
