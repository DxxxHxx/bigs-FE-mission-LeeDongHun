import type { PostListProps } from "../../../types/interface";
import PaginationNavigator from "./PaginationNavigator";

export default function DesktopList({
  handlePagination,
  page,
  posts,
}: PostListProps) {
  return (
    <div className="hidden md:block">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th>제목</th>
            <th>카테고리</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {posts?.content?.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.category}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="fixed left-0 right-0 m-auto bottom-5">
        <PaginationNavigator
          pageInfo={{
            currentPage: +page,
            lastPage: Number(posts?.totalPages),
          }}
          handlePagination={handlePagination}
        />
      </div>
    </div>
  );
}
