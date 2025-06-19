import React from "react";
import type { FieldError } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError | undefined;
}

export default function Input({ label, error, ...inputProps }: InputProps) {
  return (
    <div className="w-full">
      <label className="block mb-1">{label}</label>
      <input className="w-full border px-2 py-1 rounded" {...inputProps} />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
