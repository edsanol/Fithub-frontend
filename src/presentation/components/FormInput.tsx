"use client";

import React from "react";
import { Input } from "@nextui-org/react";

interface FormInputProps {
  isRequired?: boolean;
  isInvalid?: boolean;
  color?:
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "default"
    | "secondary"
    | undefined;
  errorMessage?: string;
  type: string;
  label: string;
  size?: "lg" | "md" | "sm";
  classNames?: any;
  description?: string;
  customInputClass?: string;
  onChange?: (event: string) => void;
}

const FormInput = ({
  isRequired,
  isInvalid,
  color,
  errorMessage,
  type,
  label,
  size,
  classNames,
  description,
  customInputClass,
  onChange,
}: FormInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.target.value);
  };

  return (
    <Input
      isRequired={isRequired || false}
      isInvalid={isInvalid || false}
      color={color}
      errorMessage={errorMessage || ""}
      variant={isInvalid ? "bordered" : undefined}
      type={type}
      label={label}
      size={size || "lg"}
      classNames={classNames || ""}
      description={description || ""}
      className={customInputClass || ""}
      onChange={handleChange}
    />
  );
};

export default FormInput;
