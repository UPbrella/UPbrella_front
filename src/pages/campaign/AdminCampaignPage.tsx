import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { $axios } from "@/shared/api";
import { toast } from "react-hot-toast";
import type { Settings, Award } from "./CampaignPage";
import type { TApiResponse } from "@/shared/model/types";
export default function AdminCampaignPage() {
  const { data, refetch } = useQuery({
    queryKey: ["campaign-settings"],
    queryFn: async () =>
      (await $axios.get<TApiResponse<Settings>>("/admin/campaign/settings")).data.data,
    staleTime: 0,
  });
  const awards = useQuery({
    queryKey: ["campaign-awards"],
    queryFn: async () =>
      (await $axios.get<TApiResponse<Award[]>>("/admin/campaign/awards")).data.data,
    staleTime: 0,
  });
  const [settings, setSettings] = useState<Settings>({
    title: "스탬프 투어",
    enabled: false,
    returnDeadlineDays: 14,
  });
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (data) setSettings(data);
  }, [data]);
  const save = async () => {
    setBusy(true);
    try {
      await $axios.patch("/admin/campaign/settings", settings);
      await refetch();
      toast.success("설정 저장 완료");
    } catch {
      toast.error("설정을 저장하지 못했습니다.");
    } finally {
      setBusy(false);
    }
  };
  const download = async () => {
    try {
      const res = await $axios.get("/admin/campaign/awards.csv", { responseType: "blob" });
      const url = URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = "stamp-awards.csv";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      toast.error("내역을 내려받지 못했습니다.");
    }
  };
  return (
    <section className="flex flex-col gap-16">
      <h1 className="text-24 font-bold">스탬프 투어 관리</h1>
      <label>
        투어 이름
        <input
          className="border p-8 ml-8"
          maxLength={100}
          value={settings.title}
          onChange={(e) => setSettings({ ...settings, title: e.target.value })}
        />
      </label>
      <label>
        <input
          type="checkbox"
          checked={settings.enabled}
          onChange={(e) => setSettings({ ...settings, enabled: e.target.checked })}
        />{" "}
        투어 활성화
      </label>
      <label>
        기한 내 반납 기준 (일)
        <input
          className="border p-8 ml-8"
          type="number"
          min={1}
          max={90}
          value={settings.returnDeadlineDays}
          onChange={(e) => setSettings({ ...settings, returnDeadlineDays: Number(e.target.value) })}
        />
      </label>
      <button
        disabled={busy || !data}
        className="bg-primary-500 text-white rounded-8 p-12"
        onClick={save}
      >
        설정 저장
      </button>
      <h2 className="font-bold">스탬프 지급 내역</h2>
      <button className="border p-8 rounded-8" onClick={download}>
        CSV 내려받기
      </button>
      {awards.isError && <p role="alert">내역 조회 실패</p>}
      <div className="overflow-auto">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th>회원 번호</th>
              <th>미션</th>
              <th>수량</th>
              <th>지급일</th>
            </tr>
          </thead>
          <tbody>
            {awards.data?.map((a) => (
              <tr key={a.id}>
                <td>{a.userId}</td>
                <td>
                  {
                    (
                      {
                        FIRST_RENT: "첫 대여",
                        ON_TIME_RETURN: "기한 내 반납",
                        SURVEY: "설문",
                      } as Record<string, string>
                    )[a.mission]
                  }
                </td>
                <td>{a.amount}</td>
                <td>{a.awardedAt.replace("T", " ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
