import { useState, type ChangeEvent } from "react";

export default function useFilePreview() {
  const [file, setFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | undefined>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // console.log(file.size)
      if (file.size >= 1000000) {
        // 1mb
        alert("1mb이하로 선택해주세요.");
        return;
      }
      setFile(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setFile(undefined);
      setPreview(undefined);
    }
  };

  const handleInitPreview = (url: string) => {
    setPreview(url);
  };

  return { file, preview, handleFileChange, handleInitPreview };
}
