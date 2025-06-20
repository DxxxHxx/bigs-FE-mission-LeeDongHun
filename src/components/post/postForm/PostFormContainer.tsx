import { useRef, type FormEvent } from "react";
import useFilePreview from "../../../hooks/useFilePreview";
import type { PostPayload } from "../../../types/interface";
import boardService from "../../../service/boardService";
import PostFormPresenter from "./PostFormPresenter";

export default function PostFormContainer() {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const { file, handleFileChange, preview } = useFilePreview();

  // 글 쓰기 요청
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!titleRef.current || !contentRef.current || !categoryRef.current)
      return;

    const formData = new FormData();
    const postPayload: PostPayload = {
      title: titleRef.current.value,
      content: contentRef.current.value,
      category: categoryRef.current.value as PostPayload["category"],
    };

    formData.append("request", JSON.stringify(postPayload));
    if (file) {
      formData.append("file", file, file.name);
    }

    try {
      const res = await boardService.createPost(formData);
      console.log(res);
    } catch (e) {
      console.log(e);
      alert("요청에 실패하였습니다.");
    }
  };

  return (
    <PostFormPresenter
      refs={{ titleRef, contentRef, categoryRef }}
      handleFileChange={handleFileChange}
      preview={preview}
      handleSubmit={handleSubmit}
    />
  );
}
