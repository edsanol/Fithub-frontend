"use client";

import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

interface FormSelectProps {
  isRequired?: boolean;
  isDisabled?: boolean;
  label: string;
  placeholder?: string;
  size?: "lg" | "md" | "sm";
  classNames?: any;
  description?: string;
  popoverProps?: any;
  customInputClass?: string;
  items: any;
  value?: any;
  onChange?: (event: string) => void;
}

const FormSelect = ({
  isRequired,
  isDisabled,
  label,
  placeholder,
  size,
  classNames,
  description,
  popoverProps,
  customInputClass,
  items,
  value,
  onChange,
}: FormSelectProps) => {
  console.log("items", items);
  console.log("value", value);
  return (
    <Select
      isRequired={isRequired || false}
      isDisabled={isDisabled || false}
      label={label}
      placeholder={placeholder || ""}
      size={size || "lg"}
      classNames={classNames || ""}
      popoverProps={popoverProps || ""}
      description={description || ""}
      className={customInputClass || ""}
      defaultSelectedKeys={value ? [value.toString()] : []}
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
