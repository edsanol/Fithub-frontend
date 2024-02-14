"use client";

import { DashboardHeader } from "@/presentation/components";
import { SearchIcon } from "@/presentation/components/SearchIconV2";
import { Input, useInput } from "@nextui-org/react";
import { CloseFilledIcon } from "@/assets/svg/CloseFilledIcon";
import { useEffect, useMemo, useState } from "react";

interface PersonasInterface {
  id: number;
  nombre: string;
}

const personas = [
  { id: 1, nombre: "Alejandro Gómez" },
  { id: 2, nombre: "María Fernández" },
  { id: 3, nombre: "Carlos Martínez" },
  { id: 4, nombre: "Lucía Hernández" },
  { id: 5, nombre: "Esteban Paredes" },
  { id: 6, nombre: "Daniela Rivera" },
  { id: 7, nombre: "Miguel Ángel López" },
  { id: 8, nombre: "Sofía Guzmán" },
  { id: 9, nombre: "Jorge Enriquez" },
  { id: 10, nombre: "Isabel Cortés" },
];

const UserProgress = () => {
  const [suggestions, setSuggestions] = useState<PersonasInterface[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [search, setSearch] = useState("");

  const handleInputChange = (e: any) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
    } else {
      const filterResults = personas.filter((persona) =>
        persona.nombre.toLowerCase().includes(search.toLowerCase())
      );
      setSuggestions(filterResults);
      setShowSuggestions(true);
    }
  }, [search]);

  return (
    <>
      <DashboardHeader
        title="Progreso de Atletas"
        description="
        Aquí podrás ver y registrar el progreso de tus atletas. Debes buscar
        al atleta por su nombre para que puedas ver y registrar su progreso.
        "
      />
      <div className="flex flex-col gap-5 md:flex-row">
        <Input
          label="Busqueda"
          isClearable
          onChange={handleInputChange}
          radius="lg"
          classNames={{
            base: "dark",
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "shadow-xl",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focused=true]:bg-default-200/50",
              "dark:group-data-[focused=true]:bg-default/60",
              "!cursor-text",
            ],
          }}
          placeholder="Filtra aqui para buscar deportistas"
          startContent={
            <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-[90%] bg-[#18181B] shadow-lg rounded-lg max-h-60 overflow-auto md:w-[95%]">
          {suggestions.map((persona) => (
            <li
              key={persona.id}
              className="p-2 hover:bg-[#2A2E30] cursor-pointer"
              onClick={() => {
                setSearch(persona.nombre);
                setShowSuggestions(false);
              }}
            >
              {persona.nombre}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default UserProgress;
