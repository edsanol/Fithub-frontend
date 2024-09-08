"use client";

import { Button } from "@nextui-org/button";
interface RedirectButtonProps {
  color: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  variant:
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost";
  onClick: () => void;
  label: string;
  customClass: string;
}

const RedirectButton = ({
  color,
  variant,
  onClick,
  label,
  customClass,
}: RedirectButtonProps) => {
  return (
    <Button
      size="md"
      radius="sm"
      color={color}
      variant={variant}
      onClick={onClick}
    >
      <p className={`${customClass} font-semibold`}>{label}</p>
    </Button>
  );
};
export default RedirectButton;
