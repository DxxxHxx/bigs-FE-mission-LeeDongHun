import { Categories } from "./../types/interface";
import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "../constants/queryKeys";
import boardService from "../service/boardService";

export default function useFetchCategory() {
  return useQuery<typeof Categories>({
    queryKey: QUERY_KEYS.getCategories,
    queryFn: async () => await boardService.getPostCategory(),
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
