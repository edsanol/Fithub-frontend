import { useState } from "react";

const chats = [
  {
    title: "General",
    description: "Último mensaje aquí",
    icon: "💬",
  },
  {
    title: "Grupo 1",
    description: "Hola, ¿cómo estás?",
    icon: "💬",
  },
  {
    title: "Privado",
    description: "¿Estás disponible?",
    icon: "💬",
  },
  {
    title: "Privado",
    description: "¿Estás disponible?",
    icon: "💬",
  },
  {
    title: "Privado",
    description: "¿Estás disponible?",
    icon: "💬",
  },
  {
    title: "Privado",
    description: "¿Estás disponible?",
    icon: "💬",
  },
  {
    title: "Privado",
    description: "¿Estás disponible?",
    icon: "💬",
  },
  {
    title: "Privado",
    description: "¿Estás disponible?",
    icon: "💬",
  },
  {
    title: "Privado",
    description: "¿Estás disponible?",
    icon: "💬",
  },
  {
    title: "Privado",
    description: "¿Estás disponible?",
    icon: "💬",
  },
  {
    title: "Privado",
    description: "¿Estás disponible?",
    icon: "💬",
  },
];

const ViewModel = () => {
  const [message, setMessage] = useState("");

  const handleChange = (value: string) => {
    setMessage(value);
  };

  return {
    message,
    chats,
    handleChange,
  };
};

export default ViewModel;
