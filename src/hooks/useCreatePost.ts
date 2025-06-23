import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { PostPayload, PostRef } from "../types/interface";
import boardService from "../service/boardService";
import QUERY_KEYS from "../constants/queryKeys";

export default function useCreatePost() {
  const navigate = useNavigate();
  const queryclient = useQueryClient();

  const onSubmit = async ({ refs, file }: { refs: PostRef; file?: File }) => {
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
    await boardService.createPost(formData);
  };

  return useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      queryclient.invalidateQueries({
        queryKey: QUERY_KEYS.invalidatePostList,
      });
      navigate("/");
      alert("작성 완료.");
    },
    onError: (e) => {
      console.log(e.message);
      alert("요청에 실패하였습니다.");
    },
  });
}
