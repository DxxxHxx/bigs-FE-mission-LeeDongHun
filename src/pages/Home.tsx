import { Link } from "react-router-dom";
import usePostList from "../hooks/usePostList";
import MobileList from "../components/post/postList/MobileList";
import DesktopList from "../components/post/postList/DesktopList";
import usePagination from "../hooks/usePagination";

export default function Home() {
  const { handlePagination, page } = usePagination();
  const { data: posts, isLoading } = usePostList(+page - 1);

  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <h1 className="text-3xl font-bold">Loading ...</h1>
      </div>
    );
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
      />

      <MobileList
        handlePagination={handlePagination}
        page={+page}
        posts={posts!}
      />
    </div>
  );
}
