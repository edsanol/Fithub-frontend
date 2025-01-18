"use client";

import { Select, SelectItem } from "@nextui-org/react";

interface FormSelectProps {
  isRequired?: boolean;
  isDisabled?: boolean;
  label: string;
  labelPlacement?: "inside" | "outside" | "outside-left";
  placeholder?: string;
  size?: "lg" | "md" | "sm";
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
  labelPlacement,
  placeholder,
  size,
  description,
  popoverProps,
  customInputClass,
  items,
  value,
  onChange,
}: FormSelectProps) => {
  return (
    <>
      {items && (
        <Select
          isRequired={isRequired || false}
          isDisabled={isDisabled || false}
          label={label}
          labelPlacement={labelPlacement}
          placeholder={placeholder || ""}
          size={size || "lg"}
          classNames={{ base: "dark" }}
          popoverProps={popoverProps || ""}
          description={description || ""}
          className={customInputClass || ""}
          selectedKeys={value ? [value] : []}
          onSelectionChange={(keys) => {
            const selectedValue = Array.from(keys).join("");
            if (onChange) {
              onChange(selectedValue);
            }
          }}
        >
          {items.map((item: any) => (
            <SelectItem
              key={item.value}
              value={String(item.value)}
              classNames={{ base: "dark" }}
              onClick={() => onChange && onChange(String(item.value))}
            >
              {item.label}
            </SelectItem>
          ))}
        </Select>
      )}
    </>
  );
};

export default FormSelect;
