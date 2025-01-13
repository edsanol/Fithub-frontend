import {
  CustomModal,
  FormCheckboxGroup,
  FormInput,
  FormTextarea,
  PrimaryButton,
} from "@/presentation/components";
import { Button, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRoutine } from "../context/RoutineContext";
import { PaginateData } from "@/domain/models/PaginateData";
import container from "@/config/inversifyContainer";
import { GetExercisesListUseCase } from "@/domain/useCases/Routine/getExercisesListUseCase";
import { TYPES } from "@/config/types";
import { debounce } from "lodash";

const ExercisesSelection = () => {
  const { state, dispatch } = useRoutine();

  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [textFilter, setTextFilter] = useState("");

  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectionChange = (selected: string[]) => {
    setSelectedExercises(selected);
    console.log("Ejercicios seleccionados:", selected);
  };

  const formattedExercises = state.exercisesList.items.map((exercise) => ({
    name: exercise.exerciseTitle!,
    value: exercise.exerciseId!.toString(),
    href: exercise.imageURL,
    description: exercise.exerciseDescription!,
    label: exercise.muscleGroupName!,
  }));

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

      const updatedItems = reset ? response.items : [...state.exercisesList.items, ...response.items];

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
    } finally {
      setIsLoading(false);
    }
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
            items={formattedExercises}
            label="Selecciona los ejercicios"
            onChange={handleSelectionChange}
            defaultSelected={[]}
          />
          {isLoading && (
            <span className="flex justify-start w-full mt-3">
              <Spinner />
            </span>
          )}

          {!hasMore && <p className="mt-3 text-start">No hay ejercicios</p>}
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
