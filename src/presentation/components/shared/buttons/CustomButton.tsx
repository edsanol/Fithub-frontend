"use client";

import { Button } from "@nextui-org/react";

interface CustomButtonProps {
  type: "button" | "submit" | "reset";
  color:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "default"
    | "danger"
    | undefined;
  variant:
    | "ghost"
    | "flat"
    | "solid"
    | "bordered"
    | "light"
    | "faded"
    | "shadow"
    | undefined;
  text: string;
  isDisabled?: boolean;
  customButtonClass?: string;
  customTextClass?: string;
  onClick?: () => void;
}

const CustomButton = ({
  type,
  color,
  variant,
  text,
  isDisabled,
  customButtonClass,
  customTextClass,
  onClick,
}: CustomButtonProps) => {
  return (
    <Button
      type={type}
      className={customButtonClass}
      onClick={onClick}
      color={color}
      isDisabled={isDisabled}
      variant={variant}
    >
      <p className={`text-sm font-bold ${customTextClass}`}>{text}</p>
    </Button>
  );
};

export default CustomButton;
