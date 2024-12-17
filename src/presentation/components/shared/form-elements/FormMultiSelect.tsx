"use client";

import { Select, SelectItem, Selection } from "@nextui-org/react";

interface FormMultiSelectProps {
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  color?: "default" | "danger";
  errorMessage?: string;
  label: string;
  placeholder?: string;
  size?: "lg" | "md" | "sm";
  description?: string;
  customInputClass?: string;
  items: { value: number; label: string }[];
  value?: Selection;
  onChange?: (values: number[]) => void;
}

const FormMultiSelect = ({
  isRequired,
  isDisabled,
  isInvalid,
  color,
  errorMessage,
  label,
  placeholder,
  size,
  description,
  customInputClass,
  items,
  value = new Set(),
  onChange,
}: FormMultiSelectProps) => {
  return (
    <Select
      isRequired={isRequired}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      color={color}
      errorMessage={errorMessage}
      label={label}
      placeholder={placeholder}
      size={size || "lg"}
      classNames={{ base: "dark" }}
      popoverProps={{ color: "foreground" }}
      description={description}
      className={customInputClass}
      selectionMode="multiple"
      selectedKeys={value}
      onSelectionChange={(keys) => {
        const selectedValues = Array.from(keys as Set<number>);
        onChange && onChange(selectedValues);
      }}
    >
      {items.map((item) => (
        <SelectItem key={item.value} value={Number(item.value)} classNames={{ base: "dark" }}>
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default FormMultiSelect;
