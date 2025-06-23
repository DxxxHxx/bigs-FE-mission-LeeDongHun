import React, { type Ref } from "react";
import type { FieldError } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError | undefined;
  ref?: Ref<HTMLInputElement>;
}

export default function Input({
  label,
  error,
  ref,
  ...inputProps
}: InputProps) {
  return (
    <div className="w-full">
      <label htmlFor={inputProps.id} className="block mb-1">
        {label}
      </label>
      <input
        id={inputProps.id}
        className="w-full border px-2 py-1 rounded"
        {...inputProps}
        ref={ref}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
