import PaginationNavigator from "./PaginationNavigator";
import type { PostListProps } from "../../../types/interface";

export default function MobileList({
  posts,
  page,
  handlePagination,
}: PostListProps) {
  return (
    <div className="md:hidden space-y-4 mb-5">
      {posts?.content?.map((item) => (
        <div
          key={item.id}
          className="bg-white p-4 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 hover:scale-103 transition-all duration-200"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="font-medium text-gray-900">{item.title}</p>
              <p className="text-sm text-gray-500">{item.category}</p>
            </div>
          </div>
        </div>
      ))}
      <PaginationNavigator
        pageInfo={{
          currentPage: +page,
          lastPage: Number(posts?.totalPages),
        }}
        handlePagination={handlePagination}
      />
    </div>
  );
}
