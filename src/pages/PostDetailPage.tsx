import Loader from "../components/common/Loader";
import PostDetail from "../components/post/postDetail/PostDetail";
import usePostDetail from "../hooks/usePostDetail";

export default function PostDetailPage() {
  const { isLoading, data } = usePostDetail();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="h-full">
      <PostDetail {...data!} />
    </div>
  );
}
