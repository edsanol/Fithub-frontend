"use client";

import {
  CustomDashboardData,
  CustomDashboardDoubleGraph,
  CustomDashboardGraph,
  CustomModal,
  CustomTable,
  DashboardHeader,
  FormInput,
  FormSearchInput,
  PrimaryButton,
} from "@/presentation/components";
import ViewModel from "./ViewModel";
import { customRenderCell } from "./render-cell/RenderCell";
import { MeasurementsProgress } from "@/domain/entities/MeasurementsProgress";

const dashboardData = {
  totalAthletes: 12,
  activeAthletes: 6,
  activeAthletesPercentage: 50,
  inactiveAthletes: 6,
  inactiveAthletesPercentage: 50,
  dailyAssistance: 0,
  newAthletesByMonth: 0,
  incomeByMonth: 10000,
};

const UserProgress = () => {
  const {
    search,
    suggestions,
    showSuggestions,
    userSelected,
    isModalOpen,
    measurementProgressList,
    MeasurementProgressColumns,
    handleChange,
    handleSelectSuggestion,
    toggleModal,
    handleOpenModal,
    handleSetGlueteus,
    handleSetBiceps,
    handleSetChest,
    handleSetWaist,
    handleSetThigh,
    handleSetCalf,
    handleSetShoulders,
    handleSetForearm,
    handleSetHeight,
    handleSetWeight,
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
          <div className="flex flex-wrap gap-4 justify-between mt-8">
            <CustomDashboardData data={dashboardData} />
            <CustomDashboardDoubleGraph dashboardData={dashboardData} />
            <CustomDashboardGraph dashboardData={dashboardData} />
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
            <form className="mt-3" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row md:gap-2">
                <FormInput
                  isRequired
                  type="number"
                  label="Peso (kg)"
                  size="lg"
                  classNames={{ base: "dark" }}
                  customInputClass="mb-5"
                  onChange={(value) => handleSetWeight(Number(value))}
                />
                <FormInput
                  isRequired
                  type="number"
                  label="Altura (cm)"
                  size="lg"
                  classNames={{ base: "dark" }}
                  customInputClass="mb-5"
                  onChange={(value) => handleSetHeight(Number(value))}
                />
              </div>
              <div className="flex flex-col md:flex-row md:gap-2">
                <FormInput
                  isRequired
                  type="number"
                  label="Gluteos (cm)"
                  size="lg"
                  classNames={{ base: "dark" }}
                  customInputClass="mb-5"
                  onChange={(value) => handleSetGlueteus(Number(value))}
                />
                <FormInput
                  isRequired
                  type="number"
                  label="Biceps (cm)"
                  size="lg"
                  classNames={{ base: "dark" }}
                  customInputClass="mb-5"
                  onChange={(value) => handleSetBiceps(Number(value))}
                />
              </div>
              <div className="flex flex-col md:flex-row md:gap-2">
                <FormInput
                  isRequired
                  type="number"
                  label="Pecho (cm)"
                  size="lg"
                  classNames={{ base: "dark" }}
                  customInputClass="mb-5"
                  onChange={(value) => handleSetChest(Number(value))}
                />
                <FormInput
                  isRequired
                  type="number"
                  label="Cintura (cm)"
                  size="lg"
                  classNames={{ base: "dark" }}
                  customInputClass="mb-5"
                  onChange={(value) => handleSetWaist(Number(value))}
                />
              </div>
              <div className="flex flex-col md:flex-row md:gap-2">
                <FormInput
                  isRequired
                  type="number"
                  label="Espalda (cm)"
                  size="lg"
                  classNames={{ base: "dark" }}
                  customInputClass="mb-5"
                  onChange={(value) => handleSetShoulders(Number(value))}
                />
                <FormInput
                  isRequired
                  type="number"
                  label="Pantorrilla (cm)"
                  size="lg"
                  classNames={{ base: "dark" }}
                  customInputClass="mb-5"
                  onChange={(value) => handleSetCalf(Number(value))}
                />
              </div>
              <div className="flex flex-col md:flex-row md:gap-2">
                <FormInput
                  isRequired
                  type="number"
                  label="Antebrazo (cm)"
                  size="lg"
                  classNames={{ base: "dark" }}
                  customInputClass="mb-5"
                  onChange={(value) => handleSetForearm(Number(value))}
                />
                <FormInput
                  isRequired
                  type="number"
                  label="Muslo (cm)"
                  size="lg"
                  classNames={{ base: "dark" }}
                  customInputClass="mb-5"
                  onChange={(value) => handleSetThigh(Number(value))}
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
    </>
  );
};

export default UserProgress;
