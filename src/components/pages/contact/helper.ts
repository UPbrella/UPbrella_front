import { TContact } from "@/types/contact/ContactTypes";

export const CONTACT_TABLE: Record<
  keyof TContact,
  { label: string; optional?: boolean; placeholder: string; line?: boolean }
> = {
  name: { label: "이름", placeholder: "이름 입력", line: true },
  phone: { label: "연락처", optional: true, placeholder: "010-1234-5678", line: true },
  email: { label: "이메일", placeholder: "upbrella@gmail.com" },
  title: { label: "제목", placeholder: "제목 입력" },
  content: { label: "문의 사항", placeholder: "문의 사항을 작성해주세요!" },
};
