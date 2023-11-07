"use client";

import React from "react";
import { RadioGroup, Radio } from "@nextui-org/react";

interface IFormRadioButtonProps {
  label: string;
  customClass?: string;
  options: any;
  isInvalid?: boolean;
  onChange?: (value: string) => void;
}

const FormRadioButton = ({
  label,
  customClass,
  options,
  isInvalid,
  onChange,
}: IFormRadioButtonProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.target.value);
  };
  return (
    <RadioGroup
      isRequired
      isInvalid={isInvalid}
      label={label}
      orientation="horizontal"
      classNames={{ base: "dark" }}
      className={customClass || ""}
      onChange={handleChange}
    >
      {options.map((option: any) => (
        <Radio key={option.value} value={option.value}>
          {option.label}
        </Radio>
      ))}
    </RadioGroup>
  );
};

export default FormRadioButton;
