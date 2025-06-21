import PostDetail from "../components/post/postDetail/PostDetail";
import usePostDetail from "../hooks/usePostDetail";

export default function PostDetailPage() {
  const { isLoading, data } = usePostDetail();

  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <h1 className="text-3xl font-bold">Loading ...</h1>
      </div>
    );
  }
  return (
    <div className="h-full">
      <PostDetail {...data!} />
    </div>
  );
}
