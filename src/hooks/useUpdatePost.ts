import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { PostPayload, PostRef } from "../types/interface";
import boardService from "../service/boardService";
import { useNavigate } from "react-router-dom";

export default function useUpdatePost() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onSubmit = async ({
    postId,
    refs,
    file,
  }: {
    postId: number;
    refs: PostRef;
    file?: File;
  }) => {
    const { categoryRef, contentRef, titleRef } = refs;
    const formData = new FormData();
    const postPayload: PostPayload = {
      title: titleRef?.current!.value,
      content: contentRef?.current!.value,
      category: categoryRef?.current!.value as PostPayload["category"],
    };

    const postPayloadBlob = new Blob([JSON.stringify(postPayload)], {
      type: "application/json",
    });

    formData.append("request", postPayloadBlob);
    if (file) {
      formData.append("file", file, file.name);
    }
    await boardService.updatePost(postId, formData);
  };

  return useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries();
      navigate(-1);
      alert("수정 완료.");
    },
    onError: (e) => {
      console.log(e.message);
      alert("요청에 실패하였습니다.");
    },
  });
}
