import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import type { PostDetail } from "../types/interface";
import QUERY_KEYS from "../constants/queryKeys";
import boardService from "../service/boardService";

export default function usePostDetail() {
  const { id } = useParams();

  return useQuery<PostDetail>({
    queryKey: QUERY_KEYS.getPostDetail(id!),
    queryFn: async () => await boardService.getPostDetail(id!),
  });
}
