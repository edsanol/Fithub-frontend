"use client";

import React, { useState } from "react";
import { EyeSlashFilledIcon } from "@/assets/svg/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/assets/svg/EyeFilledIcon";
import { Input } from "@nextui-org/react";

interface FormInputPasswordProps {
  isRequired?: boolean;
  label: string;
  size?: "lg" | "md" | "sm";
  classNames?: any;
  description?: string;
  customInputClass?: string;
  onChange?: (event: string) => void;
}

const FormInputPassword = ({
  isRequired,
  label,
  size,
  classNames,
  description,
  customInputClass,
  onChange,
}: FormInputPasswordProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.target.value);
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      isRequired={isRequired || false}
      label={label}
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      size={size || "lg"}
      classNames={classNames || ""}
      description={description || ""}
      className={customInputClass || ""}
      onChange={handleChange}
    />
  );
};

export default FormInputPassword;
