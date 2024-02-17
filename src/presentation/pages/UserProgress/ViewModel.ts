/* eslint-disable react-hooks/exhaustive-deps */
import { MeasurementsProgress } from "@/domain/entities/MeasurementsProgress";
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
  const [userSelected, setUserSelected] = useState("");

  const [isModalOpen, setIsModalOpen] = useState({
    createModal: false,
  });

  const [measurementsProgress, setMeasurementsProgress] =
    useState<MeasurementsProgress>({
      measurementsProgressID: 0,
      idAthlete: 0,
      gluteus: 0,
      biceps: 0,
      chest: 0,
      waist: 0,
      hips: 0,
      thigh: 0,
      calf: 0,
      shoulders: 0,
      forearm: 0,
      height: 0,
      weight: 0,
      date: "",
    });

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
    setUserSelected(userSelected);
    setShowSuggestions(false);
    setForceHideSuggestions(true);
    if (timerId) clearTimeout(timerId);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(measurementsProgress);
  };

  const toggleModal = (modalName: "createModal") => {
    setIsModalOpen((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  const handleOpenModal = async (modalName: "createModal") => {
    toggleModal(modalName);
  };

  const handleSetGlueteus = (gluteus: number) => {
    setMeasurementsProgress({ ...measurementsProgress, gluteus });
  };

  const handleSetBiceps = (biceps: number) => {
    setMeasurementsProgress({ ...measurementsProgress, biceps });
  };

  const handleSetChest = (chest: number) => {
    setMeasurementsProgress({ ...measurementsProgress, chest });
  };

  const handleSetWaist = (waist: number) => {
    setMeasurementsProgress({ ...measurementsProgress, waist });
  };

  const handleSetHips = (hips: number) => {
    setMeasurementsProgress({ ...measurementsProgress, hips });
  };

  const handleSetThigh = (thigh: number) => {
    setMeasurementsProgress({ ...measurementsProgress, thigh });
  };

  const handleSetCalf = (calf: number) => {
    setMeasurementsProgress({ ...measurementsProgress, calf });
  };

  const handleSetShoulders = (shoulders: number) => {
    setMeasurementsProgress({ ...measurementsProgress, shoulders });
  };

  const handleSetForearm = (forearm: number) => {
    setMeasurementsProgress({ ...measurementsProgress, forearm });
  };

  const handleSetHeight = (height: number) => {
    setMeasurementsProgress({ ...measurementsProgress, height });
  };

  const handleSetWeight = (weight: number) => {
    setMeasurementsProgress({ ...measurementsProgress, weight });
  };

  const handleSetDate = (date: string) => {
    const registerDate = new Date(date).toISOString();

    setMeasurementsProgress({ ...measurementsProgress, date: registerDate });
  };

  return {
    search,
    suggestions,
    showSuggestions,
    userSelected,
    isModalOpen,
    handleChange,
    handleSelectSuggestion,
    toggleModal,
    handleOpenModal,
    handleSetGlueteus,
    handleSetBiceps,
    handleSetChest,
    handleSetWaist,
    handleSetHips,
    handleSetThigh,
    handleSetCalf,
    handleSetShoulders,
    handleSetForearm,
    handleSetHeight,
    handleSetWeight,
    handleSetDate,
    handleSubmit,
  };
};

export default ViewModel;
