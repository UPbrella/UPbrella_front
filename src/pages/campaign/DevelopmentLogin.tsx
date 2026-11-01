import { useState } from "react";
import { $axios } from "@/shared/api";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth";
export default function DevelopmentLogin() {
  const [key, setKey] = useState(""),
    [role, setRole] = useState("user"),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const client = useQueryClient(),
    navigate = useNavigate(),
    path = useAuthStore((s) => s.redirectUrl);
  const setIsLogin = useAuthStore((s) => s.setIsLogin);
  return (
    <form
      className="mx-auto max-w-[400px] p-20 border rounded-12 flex flex-col gap-12 bg-white"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setError("");
        try {
          await $axios.post("/dev/login", { key, role });
          client.clear();
          setIsLogin(true);
          setKey("");
          navigate(path);
        } catch {
          setError("개발용 접속키를 확인해 주세요.");
        } finally {
          setBusy(false);
        }
      }}
    >
      <h2 className="font-bold">개발 환경 테스트 로그인</h2>
      <p>운영 데이터의 복사본을 사용하는 개발 환경입니다.</p>
      <input
        aria-label="개발용 접속키"
        autoComplete="off"
        type="password"
        className="border p-8"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <select aria-label="테스트 계정" value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">일반 사용자</option>
        <option value="admin">운영진</option>
      </select>
      <button
        type="submit"
        className="bg-primary-500 text-white p-12 rounded-8"
        disabled={busy || !key}
      >
        테스트 로그인
      </button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
