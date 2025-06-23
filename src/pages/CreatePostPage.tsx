import { Suspense } from "react";
import PostFormContainer from "../components/post/postForm/PostFormContainer";
import Loader from "../components/common/Loader";

export default function CreatePostPage() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center py-5">
      <Suspense fallback={<Loader />}>
        <PostFormContainer />
      </Suspense>
    </div>
  );
}
