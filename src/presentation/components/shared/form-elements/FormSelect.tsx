"use client";

import { Select, SelectItem } from "@nextui-org/react";

interface DefaultData {
  key: string;
  label: string;
  value: string;
  icon: JSX.Element;
}

interface FormSelectProps {
  isRequired?: boolean;
  isDisabled?: boolean;
  label: string;
  placeholder?: string;
  size?: "lg" | "md" | "sm";
  description?: string;
  popoverProps?: any;
  customInputClass?: string;
  items: any;
  value?: any;
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
  popoverProps,
  customInputClass,
  items,
  value,
  requiredDefaultItem,
  defaultData,
  defaultItemAction,
  onChange,
}: FormSelectProps) => {
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
          classNames={{ base: "dark" }}
          popoverProps={popoverProps || ""}
          description={description || ""}
          className={customInputClass || ""}
          defaultSelectedKeys={value ? [value.toString()] : ""}
        >
          {requiredDefaultItem && (
            <SelectItem
              key={defaultData?.key || ""}
              value={defaultData?.value || ""}
              classNames={{ base: "dark" }}
              className="h-10 sticky bg-[#272729] bottom-2 font-bold text-white"
              onClick={handleDefaultItemAction}
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
