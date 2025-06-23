import { Suspense } from "react";
import UpdatePostFormContainer from "../components/post/updatePost/UpdatePostFormContainer";

export default function UpdatePostPage() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center py-5">
      <Suspense
        fallback={
          <div className="h-full flex justify-center items-center">
            <h1 className="text-3xl font-bold">Loading ...</h1>
          </div>
        }
      >
        <UpdatePostFormContainer />
      </Suspense>
    </div>
  );
}
