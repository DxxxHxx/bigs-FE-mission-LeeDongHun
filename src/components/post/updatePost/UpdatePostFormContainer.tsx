import { type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import type { PostPayload } from "../../../types/interface";
import boardService from "../../../service/boardService";
import PostFormPresenter from "../postForm/PostFormPresenter";
import useInitUpdateForm from "../../../hooks/useInitUpdateForm";

export default function UpdatePostFormContainer() {
  const { file, handleFileChange, isLoading, postId, refs, preview } =
    useInitUpdateForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { categoryRef, contentRef, titleRef } = refs;
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

  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <h1 className="text-3xl font-bold">Loading ...</h1>
      </div>
    );
  }
  return (
    <PostFormPresenter
      refs={refs}
      handleFileChange={handleFileChange}
      preview={preview}
      handleSubmit={handleSubmit}
    />
  );
}
