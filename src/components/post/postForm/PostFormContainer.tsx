import { useRef, type FormEvent } from "react";
import useFilePreview from "../../../hooks/useFilePreview";
import PostFormPresenter from "./PostFormPresenter";
import useCreatePost from "../../../hooks/useCreatePost";

export default function PostFormContainer() {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const { file, handleFileChange, preview } = useFilePreview();
  const { mutate: createPost } = useCreatePost();

  // 글 쓰기 요청
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPost({ refs: { titleRef, categoryRef, contentRef }, file });
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
