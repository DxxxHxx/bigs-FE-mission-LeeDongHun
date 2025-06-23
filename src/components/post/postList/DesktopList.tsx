import { Link, useNavigate } from "react-router-dom";
import { Categories, type PostListProps } from "../../../types/interface";
import PaginationNavigator from "./PaginationNavigator";

const tableHeadList = [
  { id: 1, text: "제목" },
  { id: 2, text: "카테고리" },
  { id: 3, text: "작성일" },
  { id: 4, text: "상세 정보" },
];
export default function DesktopList({
  handlePagination,
  page,
  posts,
  handlePrefetch,
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
                    onMouseEnter={() => handlePrefetch(post.id)}
                    onFocus={() => handlePrefetch(post.id)}
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      <Link
                        to={`/posts/${post.id}`}
                        className="text-blue-600 hover:text-blue-700 focus:text-blue-700"
                      >
                        상세정보 보러가기
                      </Link>
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
            lastPage: Math.max(Number(posts?.totalPages), 1),
          }}
          handlePagination={handlePagination}
        />
      </div>
    </div>
  );
}
