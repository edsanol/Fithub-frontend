"use client";

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
  description?: string;
  customInputClass?: string;
  labelPlacement?: "outside" | "inside" | "outside-left";
  placeholder?: string;
  isReadOnly?: boolean;
  value?: any;
  step?: string;
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
  description,
  customInputClass,
  labelPlacement,
  placeholder,
  isReadOnly,
  value,
  step,
  onChange,
}: FormInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.target.value);
  };

  return (
    <Input
      isRequired={isRequired || false}
      isReadOnly={isReadOnly || false}
      isInvalid={isInvalid || false}
      color={color}
      errorMessage={errorMessage || ""}
      variant={isInvalid ? "bordered" : undefined}
      type={type}
      label={label}
      size={size || "lg"}
      classNames={{ base: 'dark' }}
      description={description || ""}
      className={customInputClass || ""}
      labelPlacement={labelPlacement || "inside"}
      placeholder={placeholder || ""}
      value={value}
      step={step || ""}
      onChange={handleChange}
    />
  );
};

export default FormInput;
