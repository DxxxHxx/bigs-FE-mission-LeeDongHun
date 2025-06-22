import { useNavigate } from "react-router-dom";
import { Categories, type PostListProps } from "../../../types/interface";
import PaginationNavigator from "./PaginationNavigator";

const tableHeadList = [
  { id: 1, text: "제목" },
  { id: 2, text: "카테고리" },
  { id: 3, text: "작성일" },
];
export default function DesktopList({
  handlePagination,
  page,
  posts,
}: PostListProps) {
  const navigate = useNavigate();
  return (
    <div className="hidden md:flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  {tableHeadList.map((item) => (
                    <th
                      key={item.id}
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      {item.text}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {posts.content.map((post) => (
                  <tr
                    onClick={() => navigate(`/posts/${post.id}`)}
                    key={post.id}
                    className="hover:bg-gray-100 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {post.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {Categories[post.category]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {new Date(post.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
