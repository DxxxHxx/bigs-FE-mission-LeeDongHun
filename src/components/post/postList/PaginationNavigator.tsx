export default function PaginationNavigator({
  handlePagination,
  pageInfo,
}: {
  handlePagination: (action: "next" | "prev") => void;
  pageInfo: { currentPage: number; lastPage: number };
}) {
  const { currentPage, lastPage } = pageInfo;
  return (
    <div className="flex justify-center items-center gap-x-5">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePagination("prev")}
        className="cursor-pointer rounded-3xl px-4 py-1 text-white text-sm md:text-base  transition-all duration-200 bg-blue-500 disabled:bg-blue-500/50"
      >
        이전
      </button>
      <span>
        {currentPage} / {lastPage}
      </span>
      <button
        disabled={currentPage === lastPage}
        onClick={() => handlePagination("next")}
        className="cursor-pointer rounded-3xl px-4 py-1 text-white text-sm md:text-base  transition-all duration-200 bg-blue-500 disabled:bg-blue-500/50"
      >
        다음
      </button>
    </div>
  );
}
