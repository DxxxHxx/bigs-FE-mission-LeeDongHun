import FormContainer from "../../common/FormContainer";
import Input from "../../common/Input";
import FormSubmitButton from "../../common/FormSubmitButton";
import { type CategoryKey, type PostRef } from "../../../types/interface";
import type { ChangeEvent, FormEvent } from "react";
export interface PostFormPresenterProps {
  refs: PostRef;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  preview: string | undefined;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  categories: {
    id: number;
    value: CategoryKey;
    text: "공지" | "자유" | "Q&A" | "기타";
  }[];
  title: string;
}

export default function PostFormPresenter({
  refs,
  handleFileChange,
  preview,
  handleSubmit,
  categories,
  title,
}: PostFormPresenterProps) {
  const { contentRef, categoryRef, titleRef } = refs;

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h1 className="text-3xl">{title}</h1>
      <Input
        ref={titleRef}
        required
        label="제목"
        id="title"
        placeholder="제목을 입력해주세요."
      />
      <div className="w-full">
        <label htmlFor="category" className="block mb-1">
          카테고리
        </label>
        <select
          id="category"
          ref={categoryRef}
          className="border w-full p-2 rounded"
          defaultValue={""}
          required
        >
          <option value="" disabled>
            카테고리를 선택해주세요.
          </option>
          {categories.map((item) => (
            <option key={item.id} value={item.value}>
              {item.text}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full">
        <label
          htmlFor="image"
          className=" mb-1 w-full h-36 border rounded-2xl flex justify-center items-center cursor-pointer"
        >
          {preview ? (
            <img src={preview} alt="image preview" className="size-36" />
          ) : (
            <span>이미지 선택</span>
          )}
        </label>
        <input
          onChange={handleFileChange}
          className="opacity-0 cursor-pointer absolute"
          type="file"
          id="image"
          accept="image/*"
        />
      </div>

      <div className="w-full">
        <label htmlFor={"content"} className="block mb-1">
          내용
        </label>
        <textarea
          placeholder="내용을 입력해주세요."
          required
          id="content"
          className="w-full border px-2 py-1 rounded resize-none min-h-36"
          ref={contentRef}
        />
      </div>
      <FormSubmitButton>작성 완료</FormSubmitButton>
    </FormContainer>
  );
}
