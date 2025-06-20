interface ButtonProps {
  bgClassName: string;
  children: string;
  onClick: () => void;
}
export default function Button({
  children,
  bgClassName,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${bgClassName} hover:${bgClassName}/80 cursor-pointer rounded-3xl px-4 py-1 text-white text-sm md:text-base  transition-all duration-200`}
    >
      {children}
    </button>
  );
}
