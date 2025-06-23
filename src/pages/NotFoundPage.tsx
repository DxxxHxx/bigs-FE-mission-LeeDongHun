import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
      <p className="text-gray-500 mb-8 text-center">
        요청하신 페이지가 삭제되었거나 잘못된 경로입니다
      </p>
      <Link
        to={"/"}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        홈으로 가기
      </Link>
    </div>
  );
}
