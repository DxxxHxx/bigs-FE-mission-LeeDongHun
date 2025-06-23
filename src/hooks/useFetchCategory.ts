import { Categories, type CategoryKey } from "./../types/interface";
import { useSuspenseQuery } from "@tanstack/react-query";
import QUERY_KEYS from "../constants/queryKeys";
import boardService from "../service/boardService";

export default function useFetchCategory() {
  const res = useSuspenseQuery<typeof Categories>({
    queryKey: QUERY_KEYS.getCategories,
    queryFn: async () => await boardService.getPostCategory(),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const categoryList = Object.entries(res.data || []).map(
    ([value, text], index) => ({
      id: index + 1,
      value: value as CategoryKey,
      text,
    })
  );

  return { ...res, categoryList };
}
