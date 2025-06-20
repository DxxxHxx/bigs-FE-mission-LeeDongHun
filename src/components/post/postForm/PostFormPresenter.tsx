import FormContainer from "../../common/FormContainer";
import Input from "../../common/Input";
import FormSubmitButton from "../../common/FormSubmitButton";
import type { PostFormPresenterProps } from "../../../types/interface";

const categoryList = [
  { id: 1, value: "NOTICE", text: "공지" },
  { id: 2, value: "FREE", text: "자유" },
  { id: 3, value: "QNA", text: "Q&A" },
  { id: 4, value: "ETC", text: "기타" },
];

export default function PostFormPresenter({
  refs,
  handleFileChange,
  preview,
  handleSubmit,
}: PostFormPresenterProps) {
  const { contentRef, categoryRef, titleRef } = refs;

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input ref={titleRef} required label="제목" id="title" />
      <div className="w-full">
        <label htmlFor="category" className="block mb-1">
          카테고리
        </label>
        <select
          id="category"
          ref={categoryRef}
          defaultValue={"NOTICE"}
          className="border w-full p-2 rounded"
        >
          {categoryList.map((category) => (
            <option key={category.id} value={category.value}>
              {category.text}
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
