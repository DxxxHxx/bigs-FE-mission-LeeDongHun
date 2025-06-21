import { Link } from "react-router-dom";
import useRemovePost from "../../../hooks/useRemovePost";
import type { PostDetail } from "../../../types/interface";

export default function PostManageButtons({ id }: Pick<PostDetail, "id">) {
  const { mutate: removePost, isPending } = useRemovePost();
  return (
    <div className="flex ml-auto gap-x-5">
      <Link
        to={`/posts/update/${id}`}
        className="cursor-pointer rounded-3xl px-4 py-1 text-white text-sm md:text-base  transition-all duration-200 bg-blue-500 hover:bg-blue-500/80 disabled:bg-blue-500/80"
      >
        수정
      </Link>
      <button
        onClick={() => {
          if (!confirm("해당 게시글을 삭제합니다.")) return;
          removePost({ id });
        }}
        className="cursor-pointer rounded-3xl px-4 py-1 text-white text-sm md:text-base  transition-all duration-200 bg-blue-500 hover:bg-blue-500/80 disabled:bg-blue-500/80"
      >
        {isPending ? "삭제 중" : "삭제"}
      </button>
    </div>
  );
}
