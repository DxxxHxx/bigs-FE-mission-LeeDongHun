import { Link, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import useAuth from "../../hooks/useAuth";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../../constants/constants";

export default function Header() {
  const navigate = useNavigate();
  const user = useAuth();

  const renderUser = () => {
    if (user) {
      return (
        <div className="flex justify-center items-center gap-x-3">
          <span>
            {user.username},{user.name}님
          </span>
          <button
            onClick={() => {
              [ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY].forEach((token) =>
                localStorage.removeItem(token)
              );
              location.pathname = "/";
            }}
            className="cursor-pointer"
          >
            로그아웃
          </button>
        </div>
      );
    } else {
      return (
        <Button onClick={() => navigate("/signin")} bgClassName="bg-blue-500">
          로그인
        </Button>
      );
    }
  };
  return (
    <header className="w-full bg-white shadow h-[56px] py-3 flex justify-between px-2 items-center">
      <Link to={"/"}>HOME</Link>
      {renderUser()}
    </header>
  );
}
