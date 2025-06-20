import { useState, type ChangeEvent } from "react";

export default function useFilePreview() {
  const [file, setFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | undefined>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setFile(undefined);
      setPreview(undefined);
    }
  };

  return { file, preview, handleFileChange };
}
