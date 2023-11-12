"use client";

import React from "react";
import { Textarea } from "@nextui-org/react";

interface FormTextareaProps {
  label: string;
  placeholder?: string;
  size?: "lg" | "md" | "sm";
  classNames?: any;
  isReadOnly?: boolean;
  value?: string;
  onChange?: (event: string) => void;
}

const FormTextarea = ({
  label,
  placeholder,
  size,
  classNames,
  isReadOnly,
  value,
  onChange,
}: FormTextareaProps) => {
  return (
    <Textarea
      isReadOnly={isReadOnly || false}
      defaultValue={value || ""}
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
