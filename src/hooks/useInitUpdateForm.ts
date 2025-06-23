import { useEffect, useRef } from "react";
import usePostDetail from "./usePostDetail";
import useFilePreview from "./useFilePreview";

export default function useInitUpdateForm() {
  const { data, postId, isLoading } = usePostDetail();
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const { handleInitPreview, file, handleFileChange, preview } =
    useFilePreview();
  const initRef = useRef<boolean>(false);

  useEffect(() => {
    if (!data) return;
    if (!titleRef.current || !contentRef.current) return;

    titleRef.current.value = data?.title;
    contentRef.current.value = data?.content;

    if (data.imageUrl && !initRef.current) {
      handleInitPreview(`/api${data.imageUrl}`);
      initRef.current = true;
    }

    if (!categoryRef.current) return;
    categoryRef.current.value = data.boardCategory;

    console.log("update form init");
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
