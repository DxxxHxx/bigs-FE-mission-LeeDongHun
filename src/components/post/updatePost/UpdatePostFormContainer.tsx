import { type FormEvent } from "react";
import PostFormPresenter from "../postForm/PostFormPresenter";
import useInitUpdateForm from "../../../hooks/useInitUpdateForm";
import useUpdatePost from "../../../hooks/useUpdatePost";
import useFetchCategory from "../../../hooks/useFetchCategory";

export default function UpdatePostFormContainer() {
  const { file, handleFileChange, postId, refs, preview } = useInitUpdateForm();
  const { mutate: updatePost } = useUpdatePost();
  const { categoryList } = useFetchCategory();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updatePost({ postId: Number(postId), refs, file });
  };

  return (
    <PostFormPresenter
      refs={refs}
      handleFileChange={handleFileChange}
      preview={preview}
      handleSubmit={handleSubmit}
      categories={categoryList}
      title="게시글 수정"
    />
  );
}
