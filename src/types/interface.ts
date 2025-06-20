import type { ChangeEvent, FormEvent, RefObject } from "react";

export interface UserInfo {
  exp: number;
  iat: number;
  name: string;
  username: string;
}

export interface PostPayload {
  title: string;
  content: string;
  category: "NOTICE" | "FREE" | "QNA" | "ETC";
  file?: File | null;
}

export interface PostRef {
  titleRef: RefObject<HTMLInputElement | null>;
  contentRef: RefObject<HTMLTextAreaElement | null>;
  categoryRef: RefObject<HTMLSelectElement | null>;
}

export interface PostFormPresenterProps {
  refs: PostRef;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  preview: string | undefined;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}
