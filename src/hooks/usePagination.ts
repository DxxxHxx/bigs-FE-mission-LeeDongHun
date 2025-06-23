import { useSearchParams } from "react-router-dom";

export default function usePagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") ?? "1";

  const handlePagination = (action: "next" | "prev") => {
    const newParams = new URLSearchParams();
    const newPage = action === "next" ? +page + 1 : +page - 1;
    newParams.set("page", String(newPage));
    setSearchParams(newParams);
  };

  return { page, handlePagination };
}
