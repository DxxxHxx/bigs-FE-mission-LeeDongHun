import PostFormContainer from "../components/post/postForm/PostFormContainer";

export default function CreatePostPage() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center py-5">
      <h1 className="text-3xl">게시글 작성</h1>
      <PostFormContainer />
    </div>
  );
}
