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
          value={item.value}
          classNames={classNames || ""}
        >
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default FormSelect;
