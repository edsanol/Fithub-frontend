import { useState } from "react";

const ViewModel = () => {
  const [message, setMessage] = useState("");

  const handleChange = (value: string) => {
    setMessage(value);
  };

  return {
    message,
    handleChange,
  };
};

export default ViewModel;
