import {
  CustomCarousel,
  CustomModal,
  FormCheckboxGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  InfoModal,
  PrimaryButton,
} from "@/presentation/components";
import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRoutine } from "../context/RoutineContext";
import { PaginateData } from "@/domain/models/PaginateData";
import container from "@/config/inversifyContainer";
import { GetExercisesListUseCase } from "@/domain/useCases/Routine/getExercisesListUseCase";
import { TYPES } from "@/config/types";
import { debounce } from "lodash";
import { formatExercises } from "@/presentation/helpers";
import { imageOptions } from "@/assets/constants";
import { Exercise } from "@/domain/entities/Exercise";
import { CreateExerciseUseCase } from "@/domain/useCases/Routine/createExerciseUseCase";

const ExercisesSelection = () => {
  const { state, dispatch } = useRoutine();

  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [textFilter, setTextFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getExercisesList({ textFilter: "" }, true);
  }, []);

  const getExercisesList = async (params?: Partial<PaginateData>, reset = false) => {
    try {
      setIsLoading(true);

      const filterByName = params?.textFilter || textFilter;
      const effectiveNumFilter = params?.numFilter;
      const numPage = reset ? 1 : Math.ceil(state.exercisesList.items.length / 7) + 1;

      const requestParams = {
        numRecordsPage: 7,
        numPage,
        textFilter: filterByName,
        numFilter: effectiveNumFilter,
        ...params,
      };

      const getExercisesListUseCase = container.get<GetExercisesListUseCase>(TYPES.GetExercisesListUseCase);

      const response = await getExercisesListUseCase.execute(requestParams);

      if (!response || response.items.length === 0) {
        setHasMore(false);
        return;
      }

      const updatedItems = reset
        ? response.items
        : [...state.exercisesList.items, ...response.items];

      dispatch({
        type: "SET_EXERCISES_LIST",
        exercisesList: {
          totalRecords: response.totalRecords,
          items: updatedItems,
        },
      });

      if (reset) {
        setHasMore(true);
      }
    } catch (error) {
      console.log("Error al obtener la lista de ejercicios:", error);
      setError(true);
      setErrorMessage("Error al obtener la lista de ejercicios");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectionChange = (selected: string[]) => {
    const selectedExercisesFormatted = selected.map((exerciseId) => ({
      idExercise: parseInt(exerciseId, 10),
    }));

    dispatch({
      type: "SET_SELECTED_EXERCISES",
      selectedExercises: selectedExercisesFormatted,
    });
  };

  const handleScroll = debounce(async (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 50 && !isLoading && hasMore) {
      await getExercisesList({ textFilter });
    }
  }, 200);

  const handleTextFilter = debounce(async (textFilter: string) => {
    setTextFilter(textFilter);
    await getExercisesList({ textFilter, numFilter: 1 }, true);
  }, 300);

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);

    handleChange("imageURL", image);
  };

  const handleChange = (field: keyof Exercise, value: string | number | boolean) => {
    dispatch({ type: "SET_FIELD_EXERCISE", field, value });
  };

  const createExercise = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const createExerciseUseCase = container.get<CreateExerciseUseCase>(TYPES.CreateExerciseUseCase);

      const response = await createExerciseUseCase.execute(state.exercise);

      if (!response) {
        setError(true);
        setErrorMessage("Error al crear el ejercicio");
        return;
      }

      await getExercisesList({ textFilter: "" }, true);
    } catch (error) {
      console.log("Error al crear el ejercicio:", error);
      setError(true);
      setErrorMessage("Error al crear el ejercicio");
    }
  };

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
            onChange={(value) => handleTextFilter(value)}
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
          onScroll={handleScroll}
        >
          <FormCheckboxGroup
            items={formatExercises(state.exercisesList.items)}
            label="Selecciona los ejercicios"
            onChange={handleSelectionChange}
            defaultSelected={state.routine.exercises.map((exercise) => exercise.idExercise!.toString())}
          />
          {isLoading && (
            <span className="flex justify-start w-full mt-3">
              <Spinner />
            </span>
          )}

          {!hasMore && (
            <p className="mt-3 text-start">No hay mas ejercicios disponibles</p>
          )}
        </div>
      </div>

      <CustomModal
        isOpen={isModalOpen}
        onOpenChange={() => setIsModalOpen(!isModalOpen)}
        size="2xl"
        content={
          <>
            <form className="mt-3" onSubmit={createExercise}>
              <div className="flex flex-col md:flex-row gap-3">
                <FormInput
                  isRequired
                  type="text"
                  label="Nombre del ejercicio"
                  size="sm"
                  onChange={(value) => handleChange("title", value)}
                  customInputClass="mb-5"
                />
                <FormInput
                  isRequired
                  type="number"
                  label="Duración (minutos)"
                  size="sm"
                  onChange={(value) => handleChange("duration", parseInt(value, 10))}
                  customInputClass="mb-5"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <FormInput
                  isRequired
                  type="string"
                  label="Enlace del video"
                  size="sm"
                  onChange={(value) => handleChange("videoURL", value)}
                />
                <FormSelect
                  isRequired
                  label="Grupo Muscular"
                  items={state.muscleGroups}
                  popoverProps={{ color: "foreground" }}
                  size="sm"
                  onChange={(value) => handleChange("idMuscleGroup", Number(value))}
                />
              </div>
              <div className="mt-3">
                <FormTextarea
                  isRequired
                  label="Descripción"
                  placeholder="Escribe una descripción del ejercicio"
                  size="sm"
                  onChange={(value) => handleChange("description", value)}
                />
              </div>
              <div className="mt-3">
                <CustomCarousel
                  items={imageOptions}
                  onSelect={handleImageSelect}
                  selectedItem={selectedImage}
                  breakpoints={{
                    640: { slidesPerView: 3 },
                    1024: { slidesPerView: 3 },
                  }}
                />
              </div>
              <div className="mt-3">
                <PrimaryButton
                  text="Guardar Ejercicio"
                  btnType="submit"
                  customButtonClass="w-full p-8" 
                />
              </div>
            </form>
          </>
        }
      />

      <InfoModal
        isOpen={error}
        onOpenChange={setError}
        message={errorMessage}
      />
    </>
  );
};

export default ExercisesSelection;
