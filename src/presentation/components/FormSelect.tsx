"use client";

import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

interface FormSelectProps {
  isRequired?: boolean;
  label: string;
  placeholder?: string;
  size?: "lg" | "md" | "sm";
  classNames?: any;
  description?: string;
  popoverProps?: any;
  customInputClass?: string;
  items: any;
  onChange?: (event: string) => void;
}

const FormSelect = ({
  isRequired,
  label,
  placeholder,
  size,
  classNames,
  description,
  popoverProps,
  customInputClass,
  items,
  onChange,
}: FormSelectProps) => {
  return (
    <Select
      isRequired={isRequired || false}
      label={label}
      placeholder={placeholder || ""}
      size={size || "lg"}
      classNames={classNames || ""}
      popoverProps={popoverProps || ""}
      description={description || ""}
      className={customInputClass || ""}
    >
      {items.map((item: any) => (
        <SelectItem
          key={item.value}
          value={String(item.value)}
          classNames={classNames || ""}
          onClick={() => onChange && onChange(String(item.value))}
        >
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default FormSelect;
