import { useMutation, useQueryClient } from "@tanstack/react-query";
import boardService from "../service/boardService";
import QUERY_KEYS from "../constants/queryKeys";
import { useNavigate } from "react-router-dom";

export default function useRemovePost() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async ({ id }: { id: number }) => boardService.deletePost(id),
    onSuccess: () => {
      alert("삭제가 완료되었습니다.");
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.invalidatePostList,
      });
      navigate("/");
    },
  });
}
