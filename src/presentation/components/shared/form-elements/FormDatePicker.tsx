"use client";

import { parseDate } from "@internationalized/date";
import { DatePicker } from "@nextui-org/react";

interface FormDatePickerProps {
  label: string;
  customInputClass?: string;
  onChange?: (date: string) => void;
  value?: string;
}

const FormDatePicker = ({
  label,
  customInputClass,
  value,
  onChange,
}: FormDatePickerProps) => {
  return (
    <DatePicker
      label={label}
      className={customInputClass}
      onChange={(date) => onChange && onChange(String(date))}
      value={value ? parseDate(value) : undefined}
      showMonthAndYearPickers
    />
  );
};

export default FormDatePicker;
