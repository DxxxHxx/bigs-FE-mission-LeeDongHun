import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["post"],
    queryFn: async () =>
      (await axios.get(`https://jsonplaceholder.typicode.com/posts`)).data,
  });

  if (isLoading) {
    return <h1>loading...</h1>;
  }

  return (
    <h1 className="font-bold underline text-red-800">{JSON.stringify(data)}</h1>
  );
}
