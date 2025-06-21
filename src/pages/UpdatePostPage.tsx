import { useEffect, useRef, type FormEvent } from "react";
import PostFormPresenter from "../components/post/postForm/PostFormPresenter";
import usePostDetail from "../hooks/usePostDetail";
import useFilePreview from "../hooks/useFilePreview";
import type { PostPayload } from "../types/interface";
import { useNavigate } from "react-router-dom";
import boardService from "../service/boardService";
import { useQueryClient } from "@tanstack/react-query";

export default function UpdatePostPage() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center py-5">
      <h1 className="text-3xl">게시글 수정</h1>
      <UpdatePostFormContainer />
    </div>
  );
}

const UpdatePostFormContainer = () => {
  const { data, isLoading, postId } = usePostDetail();
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const { file, handleFileChange, preview, handleInitPreview } =
    useFilePreview();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

    const postPayloadBlob = new Blob([JSON.stringify(postPayload)], {
      type: "application/json",
    });

    formData.append("request", postPayloadBlob);
    if (file) {
      formData.append("file", file, file.name);
    }

    try {
      const res = await boardService.updatePost(Number(postId), formData);
      console.log(res);
      queryClient.invalidateQueries();
      navigate(-1);
      alert("수정 완료.");
    } catch (e) {
      console.log(e);
      alert("요청에 실패하였습니다.");
    }
  };

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
    if (data.imageUrl) {
      handleInitPreview(`/api${data.imageUrl}`);
    }
  }, [data, handleInitPreview]);

  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <h1 className="text-3xl font-bold">Loading ...</h1>
      </div>
    );
  }
  return (
    <PostFormPresenter
      refs={{ contentRef, titleRef, categoryRef }}
      handleFileChange={handleFileChange}
      preview={preview}
      handleSubmit={handleSubmit}
    />
  );
};
