"use client";

import { Checkbox, CheckboxGroup, Link, User, cn } from "@nextui-org/react";
import { useState } from "react";

interface CheckboxItem {
  name: string;
  value: string;
  href: string;
  description: string;
  label: string;
}

interface CustomCheckboxGroupProps {
  items: CheckboxItem[];
  label?: string;
  onChange?: (selected: string[]) => void;
  defaultSelected?: string[];
}

const FormCheckboxGroup = ({
  items,
  label,
  onChange,
  defaultSelected = [],
}: CustomCheckboxGroupProps) => {
  const [groupSelected, setGroupSelected] = useState<string[]>(defaultSelected);

  const handleTruncate = (text: string, limit: number) => {
    return text.length > limit ? `${text.slice(0, limit)}...` : text;
  };

  const handleChange = (selected: string[]) => {
    setGroupSelected(selected);
    if (onChange) {
      onChange(selected);
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <CheckboxGroup
        classNames={{
          base: "w-full",
        }}
        label={label}
        value={groupSelected}
        onChange={handleChange}
      >
        {items.map((item, index) => (
          <Checkbox
            key={index}
            aria-label={item.name}
            classNames={{
              base: cn(
                "inline-flex max-w-md w-full bg-content1 m-0",
                "hover:bg-content2 items-center justify-start",
                "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                "data-[selected=true]:border-primary",
                "dark"
              ),
              label: "w-full",
            }}
            value={item.value}
          >
            <div className="w-full flex justify-between gap-2">
              <User
                avatarProps={{ size: "md", src: item.href }}
                description={
                  <Link isExternal size="sm">
                    {handleTruncate(item.description, 20)}
                  </Link>
                }
                name={item.name}
              />
              <div className="flex flex-col items-end gap-1">
                <span className="text-tiny text-default-500">{item.label}</span>
              </div>
            </div>
          </Checkbox>
        ))}
      </CheckboxGroup>
    </div>
  );
};

export default FormCheckboxGroup;
