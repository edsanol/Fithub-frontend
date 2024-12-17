"use client";

import { Switch } from "@nextui-org/react";

interface FormSwitchProps {
  label: string;
  defaultSelected?: boolean;
  onChange?: (event: boolean) => void;
}

const FormSwitch = ({ label, defaultSelected, onChange }: FormSwitchProps) => {
  const handleChange = (event: any) => {
    const target = event.target;
    onChange && onChange(target.checked);
  };

  return (
    <Switch defaultSelected={defaultSelected} onChange={handleChange}>
      {label}
    </Switch>
  );
};

export default FormSwitch;
