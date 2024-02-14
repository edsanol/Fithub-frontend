/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

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

const ViewModel = () => {
  const [suggestions, setSuggestions] = useState<PersonasInterface[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [search, setSearch] = useState("");
  const [timerId, setTimerId] = useState(null);
  const [forceHideSuggestions, setForceHideSuggestions] = useState(false);

  useEffect(() => {
    if (timerId) clearTimeout(timerId);

    if (forceHideSuggestions) {
      setShowSuggestions(false);
      return;
    }

    let newTimerId: any;

    newTimerId = setTimeout(() => {
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
    }, 500);

    setTimerId(newTimerId);

    return () => clearTimeout(newTimerId);
  }, [search, forceHideSuggestions]);

  const handleChange = (search: string) => {
    setSearch(search);
    setForceHideSuggestions(false);
  };

  const handleSelectSuggestion = (userSelected: string) => {
    setSearch(userSelected);
    setShowSuggestions(false);
    setForceHideSuggestions(true);
    if (timerId) clearTimeout(timerId);
  };

  return {
    search,
    suggestions,
    showSuggestions,
    handleChange,
    handleSelectSuggestion,
  };
};

export default ViewModel;
