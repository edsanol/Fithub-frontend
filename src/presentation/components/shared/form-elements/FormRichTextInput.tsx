"use client";

import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface FormRichTextInputProps {
  value: string;
  onChange?: (value: string) => void;
}

const FormRichTextInput = ({ value, onChange }: FormRichTextInputProps) => {
  const handleChange = (value: string) => {
    onChange && onChange(value);
  };

  return (
    <>
      <ReactQuill
        value={value}
        onChange={handleChange}
        className="custom-quill"
        theme="snow"
      />
    </>
  );
};

export default FormRichTextInput;
