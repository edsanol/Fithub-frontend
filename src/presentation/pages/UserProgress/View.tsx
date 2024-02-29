"use client";

import {
  CustomAreaGraph,
  CustomModal,
  CustomProgressCard,
  CustomTable,
  DashboardHeader,
  FormInput,
  FormSearchInput,
  InfoModal,
  PrimaryButton,
} from "@/presentation/components";
import ViewModel from "./ViewModel";
import { customRenderCell } from "./components/table-render-cell/RenderCell";
import { MeasurementProgressByLastMonth } from "@/domain/models/MeasurementProgressByLastMonth";
import { mapperMuscleIcon } from "@/presentation/helpers";

const UserProgress = () => {
  const {
    search,
    suggestions,
    showSuggestions,
    userSelected,
    isModalOpen,
    measurementProgressList,
    MeasurementProgressColumns,
    measurementProgressByLastMonth,
    graphicValues,
    errorModal,
    errorMessage,
    measurementsProgressError,
    setErrorModal,
    handleChange,
    handleSelectSuggestion,
    toggleModal,
    handleOpenModal,
    setField,
    handleSubmit,
    handleSetNumPage,
  } = ViewModel();

  const selectedUserFullName = `${userSelected?.athleteName} ${userSelected?.athleteLastName}`;

  const shouldShowComponents = userSelected && search === selectedUserFullName;

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

        {shouldShowComponents && (
          <PrimaryButton
            text="Registrar medidas"
            btnType="button"
            customButtonClass="w-64 p-7 mx-auto"
            onClick={() => handleOpenModal("createModal")}
          />
        )}
      </div>

      {shouldShowComponents && (
        <>
          <div className="gap-2 grid grid-cols-2 sm:grid-cols-5 mt-5">
            {measurementProgressByLastMonth.map(
              (measurement: MeasurementProgressByLastMonth, index) => (
                <CustomProgressCard
                  key={index}
                  icon={mapperMuscleIcon(measurement.muscle)}
                  muscle={measurement.muscle}
                  measurement={measurement.measurement}
                  progress={measurement.progress}
                  progressPercentage={measurement.progressPercentage}
                  onPress={() =>
                    handleOpenModal("progressModal", measurement.muscle)
                  }
                />
              )
            )}
          </div>

          <div className="mt-5">
            <CustomTable
              onSetNumPage={handleSetNumPage}
              customRenderCell={(record, columnKey) =>
                customRenderCell(record, columnKey)
              }
              records={measurementProgressList}
              columns={MeasurementProgressColumns}
              uniqueKeyField="measurementsProgressID"
            />
          </div>
        </>
      )}

      <CustomModal
        isOpen={isModalOpen.createModal}
        onOpenChange={() => toggleModal("createModal")}
        size="2xl"
        content={
          <>
            <p className='text-sm text-center text-default-400'>Solo se aceptan números de hasta 3 decimales</p>
            <form className="mt-3" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row md:gap-2">
                <FormInput
                  isRequired
                  isInvalid={measurementsProgressError?.weightError}
                  color={measurementsProgressError?.weightError ? "danger" : "default"}
                  errorMessage={measurementsProgressError?.weightError ? "Por favor ingresa un peso valido" : ""}
                  type="number"
                  step="0.001"
                  label="Peso (kg)"
                  size="lg"
                  customInputClass="mb-5"
                  onChange={(value) => setField("weight", Number(value))}
                />
                <FormInput
                  isRequired
                  isInvalid={measurementsProgressError?.heightError}
                  color={measurementsProgressError?.heightError ? "danger" : "default"}
                  errorMessage={measurementsProgressError?.heightError ? "Por favor ingresa una altura valida" : ""}
                  type="number"
                  step="0.001"
                  label="Altura (cm)"
                  size="lg"
                  customInputClass="mb-5"
                  onChange={(value) => setField("height", Number(value))}
                />
              </div>
              <div className="flex flex-col md:flex-row md:gap-2">
                <FormInput
                  isRequired
                  isInvalid={measurementsProgressError?.gluteusError}
                  color={measurementsProgressError?.gluteusError ? "danger" : "default"}
                  errorMessage={measurementsProgressError?.gluteusError ? "Por favor ingresa una medida válida" : ""}
                  type="number"
                  step="0.001"
                  label="Gluteos (cm)"
                  size="lg"
                  customInputClass="mb-5"
                  onChange={(value) => setField("gluteus", Number(value))}
                />
                <FormInput
                  isRequired
                  isInvalid={measurementsProgressError?.bicepsError}
                  color={measurementsProgressError?.bicepsError ? "danger" : "default"}
                  errorMessage={measurementsProgressError?.bicepsError ? "Por favor ingresa una medida válida" : ""}
                  type="number"
                  step="0.001"
                  label="Biceps (cm)"
                  size="lg"
                  customInputClass="mb-5"
                  onChange={(value) => setField("biceps", Number(value))}
                />
              </div>
              <div className="flex flex-col md:flex-row md:gap-2">
                <FormInput
                  isRequired
                  isInvalid={measurementsProgressError?.chestError}
                  color={measurementsProgressError?.chestError ? "danger" : "default"}
                  errorMessage={measurementsProgressError?.chestError ? "Por favor ingresa una medida válida" : ""}
                  type="number"
                  step="0.001"
                  label="Pecho (cm)"
                  size="lg"
                  customInputClass="mb-5"
                  onChange={(value) => setField("chest", Number(value))}
                />
                <FormInput
                  isRequired
                  isInvalid={measurementsProgressError?.waistError}
                  color={measurementsProgressError?.waistError ? "danger" : "default"}
                  errorMessage={measurementsProgressError?.waistError ? "Por favor ingresa una medida válida" : ""}
                  type="number"
                  step="0.001"
                  label="Cintura (cm)"
                  size="lg"
                  customInputClass="mb-5"
                  onChange={(value) => setField("waist", Number(value))}
                />
              </div>
              <div className="flex flex-col md:flex-row md:gap-2">
                <FormInput
                  isRequired
                  isInvalid={measurementsProgressError?.shouldersError}
                  color={measurementsProgressError?.shouldersError ? "danger" : "default"}
                  errorMessage={measurementsProgressError?.shouldersError ? "Por favor ingresa una medida válida" : ""}
                  type="number"
                  step="0.001"
                  label="Espalda (cm)"
                  size="lg"
                  customInputClass="mb-5"
                  onChange={(value) => setField("shoulders", Number(value))}
                />
                <FormInput
                  isRequired
                  isInvalid={measurementsProgressError?.calfError}
                  color={measurementsProgressError?.calfError ? "danger" : "default"}
                  errorMessage={measurementsProgressError?.calfError ? "Por favor ingresa una medida válida" : ""}
                  type="number"
                  step="0.001"
                  label="Pantorrilla (cm)"
                  size="lg"
                  customInputClass="mb-5"
                  onChange={(value) => setField("calf", Number(value))}
                />
              </div>
              <div className="flex flex-col md:flex-row md:gap-2">
                <FormInput
                  isRequired
                  isInvalid={measurementsProgressError?.forearmError}
                  color={measurementsProgressError?.forearmError ? "danger" : "default"}
                  errorMessage={measurementsProgressError?.forearmError ? "Por favor ingresa una medida válida" : ""}
                  type="number"
                  step="0.001"
                  label="Antebrazo (cm)"
                  size="lg"
                  customInputClass="mb-5"
                  onChange={(value) => setField("forearm", Number(value))}
                />
                <FormInput
                  isRequired
                  isInvalid={measurementsProgressError?.thighError}
                  color={measurementsProgressError?.thighError ? "danger" : "default"}
                  errorMessage={measurementsProgressError?.thighError ? "Por favor ingresa una medida válida" : ""}
                  type="number"
                  step="0.001"
                  label="Muslo (cm)"
                  size="lg"
                  customInputClass="mb-5"
                  onChange={(value) => setField("thigh", Number(value))}
                />
              </div>

              <PrimaryButton
                text={"Crear"}
                btnType="submit"
                customButtonClass="w-full mt-5 p-8"
              />
            </form>
          </>
        }
      />

      <CustomModal
        isOpen={isModalOpen.progressModal}
        onOpenChange={() => toggleModal("progressModal")}
        size="2xl"
        content={
          <>
            <CustomAreaGraph initialData={graphicValues} />
          </>
        }
      />

      <InfoModal
        isOpen={errorModal}
        onOpenChange={setErrorModal}
        message={errorMessage}
      />
    </>
  );
};

export default UserProgress;
