interface FormSubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}
export default function FormSubmitButton({
  children,
  ...btnProps
}: FormSubmitButtonProps) {
  return (
    <button
      {...btnProps}
      className="cursor-pointer w-full rounded-2xl p-2 bg-blue-500 hover:bg-blue-500/80 text-white transition-all duration-200"
    >
      {children}
    </button>
  );
}
