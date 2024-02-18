"use client";

interface SecondaryButtonProps {
  customButtonClass?: string;
  customTextClass?: string;
  btnType?: "button" | "submit" | "reset";
  text: string;
  onClick?: () => void;
}

const SecondaryButton = ({
  customButtonClass,
  customTextClass,
  btnType,
  text,
  onClick,
}: SecondaryButtonProps) => {
  return (
    <button
      type={btnType || "button"}
      className={`flex w-32 h-9 rounded-lg border-2 border-white items-center justify-center ${
        customButtonClass ? customButtonClass : ""
      }`}
      onClick={onClick}
    >
      <p className={`text-lg font-bold text-white ${customTextClass}`}>
        {text}
      </p>
    </button>
  );
};
export default SecondaryButton;
