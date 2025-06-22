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
  category: CategoryKey;
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
  // categories: CategoryKey
}

export interface PostListPageable {
  content: Content[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: Sort2;
  first: boolean;
  empty: boolean;
}

export interface Content {
  id: number;
  title: string;
  category: PostPayload["category"];
  createdAt: string;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export interface Sort {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}

export interface Sort2 {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}

export interface PostListProps {
  posts: PostListPageable;
  page: number;
  handlePagination: (action: "next" | "prev") => void;
}

export interface PostDetail {
  id: number;
  title: string;
  content: string;
  boardCategory: CategoryKey;
  imageUrl: string | null;
  createdAt: string;
}

export const Categories = {
  NOTICE: "공지",
  FREE: "자유",
  QNA: "Q&A",
  ETC: "기타",
} as const;

export type CategoryKey = keyof typeof Categories;
