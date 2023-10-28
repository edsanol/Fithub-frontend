"use client";

import React from "react";
import { Input } from "@nextui-org/react";

interface FormInputProps {
  isRequired?: boolean;
  type: string;
  label: string;
  size?: "lg" | "md" | "sm";
  classNames?: any;
  description?: string;
  customInputClass?: string;
}

const FormInput = ({
  isRequired,
  type,
  label,
  size,
  classNames,
  description,
  customInputClass,
}: FormInputProps) => {
  return (
    <Input
      isRequired={isRequired || false}
      type={type}
      label={label}
      size={size || "lg"}
      classNames={classNames || ""}
      description={description || ""}
      className={customInputClass || ""}
    />
  );
};

export default FormInput;
