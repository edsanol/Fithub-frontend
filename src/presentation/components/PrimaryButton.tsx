"use client";

import { Button } from "@nextui-org/react";

interface PrimaryButtonProps {
  customButtonClass?: string;
  customTextClass?: string;
  btnType?: "button" | "submit" | "reset";
  text: string;
  onClick: () => void;
}

const PrimaryButton = ({
  customButtonClass,
  customTextClass,
  btnType,
  text,
  onClick,
}: PrimaryButtonProps) => {
  return (
    <Button
      type={btnType || "button"}
      className={`flex w-32 h-9 rounded-lg bg-[#3669FC] items-center justify-center ${customButtonClass}`}
      onClick={onClick}
    >
      <p className={`text-lg font-bold text-white ${customTextClass}`}>
        {text}
      </p>
    </Button>
  );
};
export default PrimaryButton;
