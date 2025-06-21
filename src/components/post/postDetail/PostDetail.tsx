import type { PostDetail } from "../../../types/interface";

export default function PostDetail({
  boardCategory,
  content,
  createdAt,
  imageUrl,
  title,
}: PostDetail) {
  return (
    <div className="py-10 w-3/4 m-auto flex flex-col gap-y-10">
      <PostManageButtons />
      <div className="flex flex-col md:flex-row gap-y-10 md:gap-y-0 md:justify-between md:items-center">
        <h1 className="text-3xl">제목 : {title}</h1>
        <p>{new Date(createdAt).toLocaleString()}</p>
      </div>
      <span>카테고리 : {boardCategory}</span>
      {imageUrl && (
        <img
          className="m-auto rounded-2xl w-1/2 md:w-1/3  "
          src={`/api${imageUrl}`}
          alt={`글 ${title}의 이미지`}
        />
      )}
      <p>
        내용
        <br />
        {content}
      </p>
    </div>
  );
}

const PostManageButtons = () => {
  return (
    <div className="flex ml-auto gap-x-5">
      <button className="cursor-pointer rounded-3xl px-4 py-1 text-white text-sm md:text-base  transition-all duration-200 bg-blue-500 hover:bg-blue-500/80">
        수정
      </button>
      <button className="cursor-pointer rounded-3xl px-4 py-1 text-white text-sm md:text-base  transition-all duration-200 bg-blue-500 hover:bg-blue-500/80">
        삭제
      </button>
    </div>
  );
};
