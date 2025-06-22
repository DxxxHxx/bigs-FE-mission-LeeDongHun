import UpdatePostFormContainer from "../components/post/updatePost/UpdatePostFormContainer";

export default function UpdatePostPage() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center py-5">
      <h1 className="text-3xl">게시글 수정</h1>
      <UpdatePostFormContainer />
    </div>
  );
}
