import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { $axios } from "@/shared/api";
import { toast } from "react-hot-toast";
import type { TApiResponse } from "@/shared/model/types";
type Row = {
  id: number;
  uuid: number;
  storeName: string;
  status: string;
  lastRentedAt: string | null;
};
const status: Record<string, string> = {
  AVAILABLE: "대여 가능",
  RENTED: "대여 중",
  UNLOCATED: "위치 미확인",
  LOST: "분실",
};
export default function InventoryReconcile() {
  const [ids, setIds] = useState(""),
    [rows, setRows] = useState<Row[]>(),
    [busy, setBusy] = useState(false);
  const client = useQueryClient();
  const run = async (apply: boolean) => {
    const verifiedUmbrellaIds = ids
      .split(/[\s,]+/)
      .filter(Boolean)
      .map(Number);
    if (
      verifiedUmbrellaIds.length === 0 ||
      verifiedUmbrellaIds.some((n) => !Number.isSafeInteger(n) || n <= 0)
    ) {
      toast.error("우산 고유번호를 입력해 주세요.");
      return;
    }
    if (apply && !window.confirm("미리보기의 재고 분류를 적용할까요?")) return;
    setBusy(true);
    try {
      const res = await $axios.post<TApiResponse<Row[]>>("/admin/umbrellas/reconcile", {
        verifiedUmbrellaIds,
        apply,
      });
      setRows(res.data.data);
      if (apply) {
        client.invalidateQueries();
        toast.success("재고 분류 적용 완료");
      }
    } catch {
      toast.error("고유번호와 서버 연결을 확인해 주세요.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <details className="border rounded-8 p-16">
      <summary className="cursor-pointer font-bold">재고 실사 및 분류</summary>
      <p className="my-12">
        실물 확인한 우산의 고유번호를 입력하세요. 나머지는 최근 대여가 3개월 이내면 위치 미확인,
        3개월을 넘으면 분실로 분류합니다. 이력이 없으면 위치 미확인으로 표시합니다.
      </p>
      <label>
        실물 확인 우산 고유번호
        <input
          className="border p-8 w-full"
          value={ids}
          placeholder="예: 1, 2, 3"
          onChange={(e) => {
            setIds(e.target.value);
            setRows(undefined);
          }}
        />
      </label>
      <div className="flex gap-8 my-12">
        <button disabled={busy} className="border p-8" onClick={() => run(false)}>
          분류 미리보기
        </button>
        <button disabled={busy || !rows} className="border p-8" onClick={() => run(true)}>
          분류 적용
        </button>
      </div>
      {rows && (
        <div className="max-h-[360px] overflow-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th>고유번호</th>
                <th>관리번호</th>
                <th>지점</th>
                <th>분류</th>
                <th>최근 대여</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.uuid}</td>
                  <td>{r.storeName}</td>
                  <td>{status[r.status]}</td>
                  <td>{r.lastRentedAt?.replace("T", " ") || "이력 없음"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </details>
  );
}
