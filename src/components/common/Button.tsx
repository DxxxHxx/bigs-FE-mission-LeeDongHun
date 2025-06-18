interface ButtonProps {
  bgClassName: string;
  children: string;
}
export default function Button({ children, bgClassName }: ButtonProps) {
  return (
    <button
      className={`${bgClassName} hover:${bgClassName}/80 cursor-pointer rounded-3xl px-4 py-1 text-white text-sm md:text-base  transition-all duration-200`}
    >
      {children}
    </button>
  );
}
