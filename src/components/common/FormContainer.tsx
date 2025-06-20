import React from "react";

interface FormContainerProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}
export default function FormContainer({
  children,
  ...formProps
}: FormContainerProps) {
  return (
    <form
      className="flex flex-col relative justify-center items-center gap-y-10 h-full w-3/4 md:w-1/2"
      {...formProps}
    >
      {children}
    </form>
  );
}
