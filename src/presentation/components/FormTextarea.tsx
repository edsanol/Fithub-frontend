"use client";

import React from "react";
import { Textarea } from "@nextui-org/react";

interface FormTextareaProps {
  label: string;
  placeholder?: string;
  size?: "lg" | "md" | "sm";
  classNames?: any;
}

const FormTextarea = ({
  label,
  placeholder,
  size,
  classNames,
}: FormTextareaProps) => {
  return (
    <Textarea
      label={label}
      labelPlacement="outside"
      placeholder={placeholder || ""}
      size={size || "lg"}
      classNames={classNames || ""}
    />
  );
};

export default FormTextarea;
