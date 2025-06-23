import { Suspense } from "react";
import UpdatePostFormContainer from "../components/post/updatePost/UpdatePostFormContainer";
import Loader from "../components/common/Loader";

export default function UpdatePostPage() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center py-5">
      <Suspense fallback={<Loader />}>
        <UpdatePostFormContainer />
      </Suspense>
    </div>
  );
}
