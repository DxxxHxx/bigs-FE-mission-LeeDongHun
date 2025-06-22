import type React from "react";
import useFetchCategory from "../../hooks/useFetchCategory";
import { type CategoryKey } from "../../types/interface";

export default function CategoryFilter({
  ref,
  ...selctProps
}: {
  ref?: React.Ref<HTMLSelectElement>;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const { isLoading, data } = useFetchCategory();

  const categoryList = Object.entries(data || []).map(
    ([value, text], index) => ({
      id: index + 1,
      value: value as CategoryKey,
      text,
    })
  );

  if (isLoading) {
    return <h1>loading...</h1>;
  }
  return (
    <select ref={ref} {...selctProps} className="border w-full p-2 rounded">
      {categoryList.map((item) => (
        <option key={item.id} value={item.value}>
          {item.text}
        </option>
      ))}
    </select>
  );
}
