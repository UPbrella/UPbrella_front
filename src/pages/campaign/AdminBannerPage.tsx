import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { $axios } from "@/shared/api";
import { toast } from "react-hot-toast";
import { Banner, imageUrl } from "./Banners";
import type { TApiResponse } from "@/shared/model/types";
const empty = {
  title: "",
  imageUrl: "",
  targetUrl: "/stamp",
  displayOrder: 0,
  enabled: false,
  startsAt: null,
  endsAt: null,
};
export default function AdminBannerPage() {
  const [draft, setDraft] = useState<Omit<Banner, "id"> & { id?: number }>(empty),
    [busy, setBusy] = useState(false);
  const { data, refetch, isError } = useQuery({
    queryKey: ["admin-banners"],
    queryFn: async () => (await $axios.get<TApiResponse<Banner[]>>("/admin/banners")).data.data,
    staleTime: 0,
  });
  const upload = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    try {
      const form = new FormData();
      form.append("image", file);
      const res = await $axios.post<TApiResponse<{ imageUrl: string }>>(
        "/admin/banners/image",
        form
      );
      setDraft((d) => ({ ...d, imageUrl: res.data.data.imageUrl }));
    } catch {
      toast.error("PNG·JPG 파일을 사용해 주세요. 최대 5MB까지 가능합니다.");
    } finally {
      setBusy(false);
    }
  };
  const save = async () => {
    setBusy(true);
    try {
      if (draft.id) await $axios.patch(`/admin/banners/${draft.id}`, draft);
      else await $axios.post("/admin/banners", draft);
      await refetch();
      setDraft(empty);
      toast.success("배너 저장 완료");
    } catch {
      toast.error("배너 정보와 게시 기간을 확인해 주세요.");
    } finally {
      setBusy(false);
    }
  };
  const remove = async (id: number) => {
    if (!window.confirm("이 배너를 삭제할까요?")) return;
    try {
      await $axios.delete(`/admin/banners/${id}`);
      await refetch();
      if (draft.id === id) setDraft(empty);
    } catch {
      toast.error("삭제하지 못했습니다.");
    }
  };
  return (
    <section className="flex flex-col gap-16">
      <h1 className="text-24 font-bold">배너 관리</h1>
      {isError && <p role="alert">배너 조회 실패</p>}
      {data?.map((b) => (
        <article key={b.id} className="border p-12 rounded-8">
          <img className="max-h-[120px]" src={imageUrl(b.imageUrl)} alt={b.title} />
          <p>
            {b.title} · {b.enabled ? "게시" : "숨김"}
          </p>
          <button className="border p-8 mr-8" onClick={() => setDraft(b)}>
            수정
          </button>
          <button className="border p-8" onClick={() => remove(b.id)}>
            삭제
          </button>
        </article>
      ))}
      <h2 className="font-bold">{draft.id ? "배너 수정" : "새 배너"}</h2>
      <label>
        제목
        <input
          className="border p-8 w-full"
          maxLength={100}
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
        />
      </label>
      <label>
        이미지
        <input
          className="block"
          type="file"
          accept="image/png,image/jpeg"
          disabled={busy}
          onChange={(e) => upload(e.target.files?.[0])}
        />
      </label>
      {draft.imageUrl && (
        <img className="max-h-[160px]" src={imageUrl(draft.imageUrl)} alt="배너 미리보기" />
      )}
      <label>
        연결 주소
        <input
          className="border p-8 w-full"
          value={draft.targetUrl}
          placeholder="/stamp 또는 https://..."
          onChange={(e) => setDraft({ ...draft, targetUrl: e.target.value })}
        />
      </label>
      <label>
        순서
        <input
          className="border p-8 ml-8"
          type="number"
          value={draft.displayOrder}
          onChange={(e) => setDraft({ ...draft, displayOrder: Number(e.target.value) })}
        />
      </label>
      <label>
        게시 시작 (한국 시간)
        <input
          className="border p-8 ml-8"
          type="datetime-local"
          value={draft.startsAt || ""}
          onChange={(e) => setDraft({ ...draft, startsAt: e.target.value || null })}
        />
      </label>
      <label>
        게시 종료 (한국 시간)
        <input
          className="border p-8 ml-8"
          type="datetime-local"
          value={draft.endsAt || ""}
          onChange={(e) => setDraft({ ...draft, endsAt: e.target.value || null })}
        />
      </label>
      <label>
        <input
          type="checkbox"
          checked={draft.enabled}
          onChange={(e) => setDraft({ ...draft, enabled: e.target.checked })}
        />{" "}
        게시 활성화
      </label>
      <button
        className="bg-primary-500 text-white rounded-8 p-12"
        disabled={busy || !draft.title || !draft.imageUrl}
        onClick={save}
      >
        배너 저장
      </button>
      <button onClick={() => setDraft(empty)}>새 배너 작성</button>
    </section>
  );
}
