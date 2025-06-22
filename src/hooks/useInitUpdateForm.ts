import { useEffect, useRef } from "react";
import usePostDetail from "./usePostDetail";
import useFilePreview from "./useFilePreview";
import type { PostPayload } from "../types/interface";

export default function useInitUpdateForm() {
  const { data, postId, isLoading } = usePostDetail();
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const { handleInitPreview, file, handleFileChange, preview } =
    useFilePreview();
  const initRef = useRef<boolean>(false);

  useEffect(() => {
    if (
      !titleRef.current ||
      !contentRef.current ||
      !categoryRef.current ||
      !data
    )
      return;

    titleRef.current.value = data?.title as string;
    categoryRef.current.value = data?.boardCategory as PostPayload["category"];
    contentRef.current.value = data?.content as string;
    if (data.imageUrl && !initRef.current) {
      handleInitPreview(`/api${data.imageUrl}`);
      initRef.current = true;
    }
  }, [data, handleInitPreview]);

  const refs = {
    titleRef,
    contentRef,
    categoryRef,
  };

  return {
    refs,
    file,
    handleFileChange,
    postId,
    isLoading,
    preview,
  };
}
