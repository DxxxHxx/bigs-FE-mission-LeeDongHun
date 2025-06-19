import { Link, useNavigate } from "react-router-dom";
import Button from "../common/Button";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="w-full bg-white shadow h-[56px] py-3 flex justify-between px-2 items-center">
      <Link to={"/"}>HOME</Link>
      <Button onClick={() => navigate("/signin")} bgClassName="bg-blue-500">
        로그인
      </Button>
    </header>
  );
}
