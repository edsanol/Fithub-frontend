"use client";

import { DashboardHeader, FormSearchInput } from "@/presentation/components";
import ViewModel from "./ViewModel";

const UserProgress = () => {
  const {
    search,
    suggestions,
    showSuggestions,
    handleChange,
    handleSelectSuggestion,
  } = ViewModel();

  return (
    <>
      <DashboardHeader
        title="Progreso de Atletas"
        description="
        Aquí podrás ver y registrar el progreso de tus atletas. Debes buscar
        al atleta por su nombre para que puedas ver y registrar su progreso.
        "
      />
      <div className="flex flex-col gap-5 mt-5 md:flex-row">
        <FormSearchInput
          label="Busqueda"
          placeholder="Filtra aqui para buscar deportistas"
          value={search}
          onChange={handleChange}
          showSuggestions={showSuggestions}
          suggestions={suggestions}
          onSelectSuggestion={handleSelectSuggestion}
        />
      </div>
    </>
  );
};

export default UserProgress;
