"use client";

import { imageOptions, muscularGroups } from "@/assets/constants";
import {
  CustomCarousel,
  FormInput,
  FormSelect,
  FormTextarea,
} from "@/presentation/components";
import { useEffect, useState } from "react";
import { useRoutine } from "../context/RoutineContext";
import { Routine } from "@/domain/entities/Routine";

const BasicInformation = () => {
  const { state, dispatch } = useRoutine();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    setSelectedImage(state.routine.imageURL);
  }, [state.routine.imageURL]);

  const handleChange = (field: keyof Routine, value: string | number | boolean) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);

    handleChange("imageURL", image);
  };

  return (
    <div className="mx-auto xl:w-11/12 space-y-6">
      <h2 className="text-xl font-semibold">Paso 1: Información Básica</h2>
      <div className="space-y-2">
        <div className="flex flex-col gap-2 md:flex-row">
          <FormInput
            isRequired
            type="text"
            label="Nombre de la rutina"
            size="sm"
            onChange={(value) => handleChange("title", value)}
            value={state.routine.title}
          />

          <FormSelect
            isRequired
            label="Grupo Muscular"
            items={muscularGroups}
            popoverProps={{ color: "foreground" }}
            size="sm"
            onChange={(value) => handleChange("idMuscleGroup", Number(value))}
            value={state.routine.idMuscleGroup}
          />
        </div>
        <FormTextarea
          isRequired
          label="Descripción de la rutina"
          onChange={(value) => handleChange("description", value)}
          value={state.routine.description}
        />
      </div>

      <div>
        <p className="font-medium mb-2">Selecciona una imagen:</p>
        <CustomCarousel
          items={imageOptions}
          onSelect={handleImageSelect}
          selectedItem={selectedImage}
        />
      </div>
    </div>
  );
};

export default BasicInformation;
