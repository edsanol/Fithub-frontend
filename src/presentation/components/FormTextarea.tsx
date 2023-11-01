"use client";

import React from "react";
import { Textarea } from "@nextui-org/react";

interface FormTextareaProps {
  label: string;
  placeholder?: string;
  size?: "lg" | "md" | "sm";
  classNames?: any;
  onChange?: (event: string) => void;
}

const FormTextarea = ({
  label,
  placeholder,
  size,
  classNames,
  onChange,
}: FormTextareaProps) => {
  return (
    <Textarea
      label={label}
      labelPlacement="outside"
      placeholder={placeholder || ""}
      size={size || "lg"}
      classNames={classNames || ""}
      onChange={(event) => onChange && onChange(event.target.value)}
    />
  );
};

export default FormTextarea;
