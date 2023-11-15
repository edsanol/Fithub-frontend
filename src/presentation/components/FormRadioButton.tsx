"use client";

import React from "react";
import { RadioGroup, Radio } from "@nextui-org/react";

interface IFormRadioButtonProps {
  label: string;
  customClass?: string;
  options: any;
  isInvalid?: boolean;
  value?: string;
  isDisabled?: boolean;
  onChange?: (value: string) => void;
}

const FormRadioButton = ({
  label,
  customClass,
  options,
  isInvalid,
  value,
  isDisabled,
  onChange,
}: IFormRadioButtonProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.target.value);
  };
  return (
    <RadioGroup
      isRequired
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      label={label}
      orientation="horizontal"
      classNames={{ base: "dark" }}
      className={customClass || ""}
      defaultValue={value}
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
