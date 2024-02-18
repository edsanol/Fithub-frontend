"use client";

import { Textarea } from "@nextui-org/react";

interface FormTextareaProps {
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
  label: string;
  placeholder?: string;
  size?: "lg" | "md" | "sm";
  classNames?: any;
  isReadOnly?: boolean;
  value?: string;
  onChange?: (event: string) => void;
}

const FormTextarea = ({
  isRequired,
  isInvalid,
  color,
  errorMessage,
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
      isRequired={isRequired || false}
      isReadOnly={isReadOnly || false}
      isInvalid={isInvalid || false}
      color={color}
      errorMessage={errorMessage || ""}
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
