import { useNavigate } from "react-router-dom";
import type { PostListProps } from "../../../types/interface";
import PaginationNavigator from "./PaginationNavigator";

export default function DesktopList({
  handlePagination,
  page,
  posts,
}: PostListProps) {
  const navigate = useNavigate();
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
            <tr
              onClick={() => navigate(`/posts/${item.id}`)}
              key={item.id}
              className="cursor-pointer hover:bg-gray-100"
            >
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
