"use client";

import { Checkbox } from "@nextui-org/react";

interface FormCheckboxProps {
  label: string;
  selected: boolean;
  customClassNames?: string;
  customTextClassNames?: string;
  onValueChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormCheckbox = ({
  label,
  selected,
  customClassNames,
  customTextClassNames,
  onValueChange,
}: FormCheckboxProps) => {
  return (
    <Checkbox
      defaultSelected={selected}
      className={customClassNames}
      classNames={{ base: "dark" }}
      onChange={(value) => onValueChange && onValueChange(value)}
    >
      <p className={customTextClassNames}>{label}</p>
    </Checkbox>
  );
};

export default FormCheckbox;
