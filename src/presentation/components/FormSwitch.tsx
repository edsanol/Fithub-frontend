"use client";

import React from "react";
import { Switch } from "@nextui-org/react";

interface FormSwitchProps {
  label: string;
  defaultSelected?: boolean;
  onChange?: (event: boolean) => void;
}

const FormSwitch = ({ label, defaultSelected, onChange }: FormSwitchProps) => {
  const handleChange = (event: React.FormEvent<HTMLLabelElement>) => {
    const target = event.target as HTMLInputElement;
    onChange && onChange(target.checked);
  };

  return (
    <Switch defaultSelected={defaultSelected} onChange={handleChange}>
      {label}
    </Switch>
  );
};

export default FormSwitch;
