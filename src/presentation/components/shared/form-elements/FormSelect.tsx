"use client";

import { Select, Selection, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface DefaultData {
  label: string;
  icon: JSX.Element;
}

interface FormSelectProps {
  isRequired?: boolean;
  isDisabled?: boolean;
  label: string;
  placeholder?: string;
  size?: "lg" | "md" | "sm";
  description?: string;
  customInputClass?: string;
  items: any;
  value?: any;
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
  isInvalid?: boolean;
  errorMessage?: string;
  requiredDefaultItem?: boolean;
  defaultData?: DefaultData;
  defaultItemAction?: () => void;
  onChange?: (event: string) => void;
}

const FormSelect = ({
  isRequired,
  isDisabled,
  label,
  placeholder,
  size,
  description,
  customInputClass,
  items,
  value,
  color,
  isInvalid,
  errorMessage,
  requiredDefaultItem,
  defaultData,
  defaultItemAction,
  onChange,
}: FormSelectProps) => {
  const [selection, setSelection] = useState<Selection>(new Set([]));

  useEffect(() => {
    if (value) {
      setSelection(new Set([value.toString()]));
    }
  }, [value]);

  const handleSelectionChange = (keys: Selection) => {
    setSelection(keys);
    const selectedValue = Array.from(keys)[0] as string;
    onChange?.(selectedValue);
  };

  const handleDefaultItemAction = () => {
    defaultItemAction && defaultItemAction();
  };

  return (
    <>
      {items && (
        <Select
          isRequired={isRequired || false}
          isDisabled={isDisabled || false}
          label={label}
          placeholder={placeholder || ""}
          size={size || "lg"}
          color={color || "default"}
          errorMessage={errorMessage || ""}
          isInvalid={isInvalid || false}
          classNames={{ base: "dark" }}
          popoverProps={{ color: "foreground" }}
          description={description || ""}
          className={customInputClass || ""}
          defaultSelectedKeys={value ? [value.toString()] : ""}
          selectedKeys={selection}
          onSelectionChange={handleSelectionChange}
        >
          {requiredDefaultItem && (
            <SelectItem
              key="default"
              value="default"
              classNames={{ base: "dark" }}
              className="h-10 sticky bg-[#272729] bottom-2 font-bold text-white"
              onClick={handleDefaultItemAction}
              textValue={defaultData?.label}
            >
              <div className="flex gap-2 items-center">
                {defaultData?.icon}
                {defaultData?.label}
              </div>
            </SelectItem>
          )}

          {items.map((item: any) => (
            <SelectItem
              key={item.value}
              value={String(item.value)}
              classNames={{ base: "dark" }}
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
