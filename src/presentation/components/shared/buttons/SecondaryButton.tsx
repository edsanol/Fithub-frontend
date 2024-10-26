"use client";

import { Button } from "@nextui-org/react";

interface SecondaryButtonProps {
  customButtonClass?: string;
  customTextClass?: string;
  btnType?: "button" | "submit" | "reset";
  text: string;
  isDisabled?: boolean;
  onClick?: () => void;
}

const SecondaryButton = ({
  customButtonClass,
  customTextClass,
  btnType,
  text,
  isDisabled,
  onClick,
}: SecondaryButtonProps) => {
  return (
    <Button
      type={btnType || "button"}
      className={`${customButtonClass ? customButtonClass : ""}`}
      onClick={onClick}
      color="secondary"
      isDisabled={isDisabled}
    >
      <p className={`text-lg font-bold text-white ${customTextClass}`}>
        {text}
      </p>
    </Button>
  );
};
export default SecondaryButton;
