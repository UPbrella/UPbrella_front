import { useQuery } from "@tanstack/react-query";
import { $axios } from "@/shared/api";
import { Link } from "react-router-dom";
import type { TApiResponse } from "@/shared/model/types";
export type Banner = {
  id: number;
  title: string;
  imageUrl: string;
  targetUrl: string;
  displayOrder: number;
  enabled: boolean;
  startsAt: string | null;
  endsAt: string | null;
};
export function imageUrl(path: string) {
  return path.startsWith("/uploads/")
    ? `${import.meta.env.VITE_UPBRELLA_API_BASE_URL || ""}${path}`
    : path;
}
export default function Banners() {
  const { data } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => (await $axios.get<TApiResponse<Banner[]>>("/banners")).data.data,
    staleTime: 0,
    refetchInterval: 60000,
  });
  if (!data?.length) return null;
  return (
    <aside aria-label="이벤트 안내" className="mx-auto max-w-[1000px] p-16 flex flex-col gap-8">
      {data.map((b) =>
        b.targetUrl.startsWith("/") ? (
          <Link key={b.id} to={b.targetUrl}>
            <img className="w-full rounded-12" src={imageUrl(b.imageUrl)} alt={b.title} />
          </Link>
        ) : (
          <a key={b.id} href={b.targetUrl} target="_blank" rel="noopener noreferrer">
            <img className="w-full rounded-12" src={imageUrl(b.imageUrl)} alt={b.title} />
          </a>
        )
      )}
    </aside>
  );
}
