interface ButtonProps {
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  type: "button" | "submit";
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  onClick,
  type,
}) => {
  return (
    <button
      className={
        "px-10 py-2 bg-black rounded-full text-white cursor-pointer hover:bg-transparent hover:text-black hover:border-black hover:border transition-all duration-200 ease-in-out " +
        className
      }
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
