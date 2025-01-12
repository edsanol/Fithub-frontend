import {
  CustomModal,
  FormCheckboxGroup,
  FormInput,
  FormTextarea,
  PrimaryButton,
} from "@/presentation/components";
import { Button } from "@nextui-org/react";
import { useState } from "react";

const exercises = [
  {
    exerciseId: 1,
    exerciseTitle: "Sentadillas",
    exerciseDescription:
      "Un ejercicio para fortalecer los músculos de las piernas y los glúteos.",
    duration: 45,
    videoURL: "https://example.com/videos/sentadillas",
    imageURL:
      "https://res.cloudinary.com/dj1pwvitf/image/upload/v1736631186/cld-sample.jpg",
    idMuscleGroup: 1,
    muscleGroupName: "Piernas",
  },
  {
    exerciseId: 2,
    exerciseTitle: "Press de Banca",
    exerciseDescription:
      "Ejercicio enfocado en trabajar los músculos del pecho y tríceps.",
    duration: 60,
    videoURL: "https://example.com/videos/press-de-banca",
    imageURL:
      "https://res.cloudinary.com/dj1pwvitf/image/upload/v1736631186/cld-sample.jpg",
    idMuscleGroup: 2,
    muscleGroupName: "Pecho",
  },
  {
    exerciseId: 3,
    exerciseTitle: "Dominadas",
    exerciseDescription: "Ejercicio compuesto para trabajar espalda y bíceps.",
    duration: 40,
    videoURL: "https://example.com/videos/dominadas",
    imageURL:
      "https://res.cloudinary.com/dj1pwvitf/image/upload/v1736631186/cld-sample.jpg",
    idMuscleGroup: 3,
    muscleGroupName: "Espalda",
  },
  {
    exerciseId: 4,
    exerciseTitle: "Peso Muerto",
    exerciseDescription:
      "Ejercicio para trabajar los músculos de la espalda baja y los glúteos.",
    duration: 60,
    videoURL: "https://example.com/videos/peso-muerto",
    imageURL:
      "https://res.cloudinary.com/dj1pwvitf/image/upload/v1736631186/cld-sample.jpg",
    idMuscleGroup: 4,
    muscleGroupName: "Espalda Baja",
  },
  {
    exerciseId: 5,
    exerciseTitle: "Planchas",
    exerciseDescription: "Un ejercicio isométrico para fortalecer el core.",
    duration: 30,
    videoURL: "https://example.com/videos/planchas",
    imageURL:
      "https://res.cloudinary.com/dj1pwvitf/image/upload/v1736631186/cld-sample.jpg",
    idMuscleGroup: 5,
    muscleGroupName: "Core",
  },
  {
    exerciseId: 6,
    exerciseTitle: "Zancadas",
    exerciseDescription:
      "Ejercicio para trabajar los cuádriceps, isquiotibiales y glúteos.",
    duration: 50,
    videoURL: "https://example.com/videos/zancadas",
    imageURL:
      "https://res.cloudinary.com/dj1pwvitf/image/upload/v1736631186/cld-sample.jpg",
    idMuscleGroup: 1,
    muscleGroupName: "Piernas",
  },
  {
    exerciseId: 7,
    exerciseTitle: "Press Militar",
    exerciseDescription: "Ejercicio enfocado en los hombros y tríceps.",
    duration: 45,
    videoURL: "https://example.com/videos/press-militar",
    imageURL:
      "https://res.cloudinary.com/dj1pwvitf/image/upload/v1736631186/cld-sample.jpg",
    idMuscleGroup: 6,
    muscleGroupName: "Hombros",
  },
  {
    exerciseId: 8,
    exerciseTitle: "Curls de Bíceps",
    exerciseDescription: "Ejercicio para trabajar los bíceps.",
    duration: 30,
    videoURL: "https://example.com/videos/curls-biceps",
    imageURL:
      "https://res.cloudinary.com/dj1pwvitf/image/upload/v1736631186/cld-sample.jpg",
    idMuscleGroup: 7,
    muscleGroupName: "Bíceps",
  },
  {
    exerciseId: 9,
    exerciseTitle: "Extensiones de Tríceps",
    exerciseDescription: "Ejercicio para trabajar los tríceps.",
    duration: 30,
    videoURL: "https://example.com/videos/extensiones-triceps",
    imageURL:
      "https://res.cloudinary.com/dj1pwvitf/image/upload/v1736631186/cld-sample.jpg",
    idMuscleGroup: 8,
    muscleGroupName: "Tríceps",
  },
  {
    exerciseId: 10,
    exerciseTitle: "Abdominales",
    exerciseDescription:
      "Ejercicio clásico para trabajar los músculos del abdomen.",
    duration: 40,
    videoURL: "https://example.com/videos/abdominales",
    imageURL:
      "https://res.cloudinary.com/dj1pwvitf/image/upload/v1736631186/cld-sample.jpg",
    idMuscleGroup: 5,
    muscleGroupName: "Core",
  },
];

const ExercisesSelection = () => {
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectionChange = (selected: string[]) => {
    setSelectedExercises(selected);
    console.log("Ejercicios seleccionados:", selected);
  };

  const formattedExercises = exercises.map((exercise) => ({
    name: exercise.exerciseTitle,
    value: exercise.exerciseId.toString(),
    href: exercise.imageURL,
    description: exercise.exerciseDescription,
    label: exercise.muscleGroupName,
  }));

  return (
    <>
      <div className="mx-auto xl:w-11/12 space-y-4">
        <h2 className="text-xl font-semibold">
          Paso 2: Selección de Ejercicios
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <FormInput
            type="text"
            placeholder="Buscar ejercicios"
            customInputClass="flex-1"
          />
          <PrimaryButton
            text="Crear Ejercicio"
            customButtonClass="px-6 py-7 w-full md:w-auto"
            onClick={() => setIsModalOpen(true)}
          />
        </div>

        <div
          className="max-h-96 overflow-y-auto"
          style={{ scrollBehavior: "smooth" }}
        >
          <FormCheckboxGroup
            items={formattedExercises}
            label="Selecciona los ejercicios"
            onChange={handleSelectionChange}
            defaultSelected={[]}
          />
        </div>
      </div>

      <CustomModal
        isOpen={isModalOpen}
        onOpenChange={() => setIsModalOpen(!isModalOpen)}
        size="xl"
        content={
          <>
            <form className="mt-3">
              <FormInput
                isRequired
                type="text"
                label="Nombre del ejercicio"
                size="lg"
                customInputClass="mb-5"
              />
              <FormInput
                isRequired
                type="number"
                label="Duración (minutos)"
                size="lg"
                customInputClass="mb-5"
              />
              <FormInput
                isRequired
                type="string"
                label="Enlace del video"
                size="lg"
              />
              <div className="mt-3">
                <FormTextarea
                  isRequired
                  label="Descripción"
                  placeholder="Escribe una descripción del ejercicio"
                  size="lg"
                />
              </div>
            </form>
          </>
        }
        footerContent={
          <>
            <Button color="primary" variant="solid" onPress={() => {}}>
              Guardar Ejercicio
            </Button>
          </>
        }
      />
    </>
  );
};

export default ExercisesSelection;
