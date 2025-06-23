import { keepPreviousData, useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "../constants/queryKeys";
import boardService from "../service/boardService";
import type { PostListPageable } from "../types/interface";

export default function usePostList(page: number) {
  return useQuery<PostListPageable>({
    queryKey: QUERY_KEYS.getPostList(page),
    queryFn: async () => boardService.getPosts(page),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5분,
    gcTime: 10 * 60 * 1000, // 10분,
  });
}
