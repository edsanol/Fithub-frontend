"use client";

import { imageOptions, muscularGroups } from "@/assets/constants";
import {
  CustomCarousel,
  FormInput,
  FormSelect,
  FormTextarea,
} from "@/presentation/components";
import { useState } from "react";

const BasicInformation = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div className="mx-auto xl:w-11/12 space-y-6">
      <h2 className="text-xl font-semibold">Paso 1: Información Básica</h2>
      <div className="space-y-2">
        <div className="flex flex-col gap-2 md:flex-row">
          <FormInput type="text" placeholder="Nombre de la rutina" />

          <FormSelect
            label="Grupo Muscular"
            items={muscularGroups}
            popoverProps={{ color: "foreground" }}
            size="sm"
          />
        </div>
        <FormTextarea label="Descripción de la rutina" />
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
