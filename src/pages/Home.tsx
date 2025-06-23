import { Link } from "react-router-dom";
import usePostList from "../hooks/usePostList";
import MobileList from "../components/post/postList/MobileList";
import DesktopList from "../components/post/postList/DesktopList";
import usePagination from "../hooks/usePagination";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import QUERY_KEYS from "../constants/queryKeys";
import boardService from "../service/boardService";
import Loader from "../components/common/Loader";

export default function Home() {
  const { handlePagination, page } = usePagination();
  const { data: posts, isLoading } = usePostList(+page - 1);
  const queryClient = useQueryClient();

  const prefetchPost = (id: number) => {
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.getPostDetail(id + ""),
      queryFn: async () => await boardService.getPostDetail(id + ""),
    });
  };

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.getCategories,
      queryFn: boardService.getPostCategory,
      staleTime: Infinity,
      gcTime: Infinity,
    });
  }, [queryClient]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-y-3 px-5 md:px-0">
      <Link
        className="mt-3 border w-fit rounded-2xl p-2 ml-auto hover:bg-gray-100 text-sm"
        to={"/posts/new"}
      >
        글 쓰러 가기
      </Link>
      <DesktopList
        handlePagination={handlePagination}
        page={+page}
        posts={posts!}
        handlePrefetch={prefetchPost}
      />

      <MobileList
        handlePagination={handlePagination}
        page={+page}
        posts={posts!}
        handlePrefetch={prefetchPost}
      />
    </div>
  );
}
