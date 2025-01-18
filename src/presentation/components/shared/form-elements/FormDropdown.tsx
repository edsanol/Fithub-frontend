"use client";

import { Dropdown, DropdownMenu, DropdownTrigger } from "@nextui-org/react";

interface FormDropdownProps {
  trigger: React.ReactNode;
  content: any;
  dropdownMenuClassName?: string;
}

const FormDropdown = ({
  trigger,
  content,
  dropdownMenuClassName,
}: FormDropdownProps) => {
  return (
    <Dropdown classNames={{ base: "dark" }}>
      <DropdownTrigger>{trigger}</DropdownTrigger>
      <DropdownMenu className={`${dropdownMenuClassName}`}>
        {content}
      </DropdownMenu>
    </Dropdown>
  );
};

export default FormDropdown;
