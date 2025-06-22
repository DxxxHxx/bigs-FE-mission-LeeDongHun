import { type FormEvent } from "react";
import PostFormPresenter from "../postForm/PostFormPresenter";
import useInitUpdateForm from "../../../hooks/useInitUpdateForm";
import useUpdatePost from "../../../hooks/useUpdatePost";

export default function UpdatePostFormContainer() {
  const { file, handleFileChange, isLoading, postId, refs, preview } =
    useInitUpdateForm();
  const { mutate: updatePost } = useUpdatePost();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updatePost({ postId: Number(postId), refs, file });
  };

  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <h1 className="text-3xl font-bold">Loading ...</h1>
      </div>
    );
  }
  return (
    <PostFormPresenter
      refs={refs}
      handleFileChange={handleFileChange}
      preview={preview}
      handleSubmit={handleSubmit}
    />
  );
}
