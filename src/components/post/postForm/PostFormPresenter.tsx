import FormContainer from "../../common/FormContainer";
import Input from "../../common/Input";
import FormSubmitButton from "../../common/FormSubmitButton";
import {
  Categories,
  type PostFormPresenterProps,
} from "../../../types/interface";
import CategoryFilter from "../../common/CategoryFilter";

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
        <CategoryFilter
          id="category"
          defaultValue={Categories.NOTICE}
          ref={categoryRef}
        />
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
