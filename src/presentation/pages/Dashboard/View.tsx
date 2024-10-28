"use client";

import ViewModel from "./ViewModel";
import CustomDashboardGraph from "./components/cards/CustomDashboardGraph";
import CustomDashboardData from "./components/cards/CustomDashboardData";
import CustomDashboardDoubleGraph from "./components/cards/CustomDashboardDoubleGraph";
import {
  CustomAreaGraph,
  CustomPieGraph,
  CustomScaleGraph,
  FormDatePicker,
  FormInput,
  PrimaryButton,
  SecondaryButton,
} from "@/presentation/components";
import { Skeleton } from "@nextui-org/react";

const Dashboard = () => {
  const {
    isLoading,
    dashboardData,
    getDailyAssistanceGraphic,
    getMembershipGraphic,
    getIncomeGraphic,
    athleteAssistance,
    selectedDate,
    page,
    totalPages,
    athleteBirthDate,
    handleDateChange,
    handleRefresh,
    handleFilterByName,
    handleNextPage,
    handlePreviousPage,
    getFullName,
  } = ViewModel();

  return (
    <>
      <div className="h-full">
        <div className="flex flex-col lg:flex-row justify-center max-w-[90rem] mx-auto w-full">
          <div className="flex flex-col w-full lg:w-[75%]">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold">Balance general</h3>
              <div className="w-full flex flex-col gap-2 md:flex-row">
                <CustomDashboardData data={dashboardData} loading={isLoading} />
                <CustomDashboardDoubleGraph
                  dashboardData={dashboardData}
                  loading={isLoading}
                />
                <CustomDashboardGraph
                  dashboardData={dashboardData}
                  loading={isLoading}
                />
              </div>
            </div>

            <div className="h-full flex flex-col mt-4">
              <h3 className="text-xl font-semibold">Estadisticas</h3>
              <div className="w-full flex flex-wrap justify-center lg:justify-between mt-4">
                <Skeleton
                  isLoaded={!isLoading}
                  className="w-[95%] h-[24rem] lg:w-[49%] rounded-[2rem]"
                  classNames={{ base: "dark" }}
                >
                  <div className="h-[24rem] p-5 bg-[#18181B] rounded-[2rem]">
                    <div className="w-[100%] h-[94%]">
                      <p className="text-xl font-bold text-white">
                        Asistencia Diaria
                      </p>
                      {getDailyAssistanceGraphic.length > 0 ? (
                        <CustomAreaGraph
                          initialData={getDailyAssistanceGraphic}
                        />
                      ) : (
                        <p className="text-lg font-bold text-white">
                          No se encontraron registros
                        </p>
                      )}
                    </div>
                  </div>
                </Skeleton>
                <Skeleton
                  isLoaded={!isLoading}
                  className="w-[100%] h-[24rem] mt-4 md:w-[97%] lg:w-[49%] rounded-[2rem] lg:mt-0"
                  classNames={{ base: "dark" }}
                >
                  <div className="h-[24rem] p-5 bg-[#18181B] rounded-[2rem] mx-auto">
                    <p className="text-xl font-bold text-white">
                      Distribución de membresías
                    </p>
                    {getMembershipGraphic.length > 0 ? (
                      <CustomPieGraph initialData={getMembershipGraphic} />
                    ) : (
                      <p className="text-lg font-bold text-white">
                        No se encontraron registros
                      </p>
                    )}
                  </div>
                </Skeleton>
              </div>
            </div>

            <div className="flex flex-col justify-center w-full py-5 px-4 lg:px-0  max-w-[90rem] mx-auto gap-3">
              <div className="flex flex-wrap justify-between">
                <h3 className="text-center text-xl font-semibold">Ingresos</h3>
                <Skeleton
                  className="w-[92%] h-[24rem] sm:w-[94%] lg:w-[100%] rounded-[2rem] mt-5 mx-auto"
                  isLoaded={!isLoading}
                  classNames={{ base: "dark" }}
                >
                  <div className="bg-[#18181B] h-[24rem] flex justify-center items-center rounded-[2rem]">
                    <div className="w-full md:w-[90%] md:h-[94%]">
                      {getIncomeGraphic.length > 0 ? (
                        <CustomScaleGraph initialData={getIncomeGraphic} />
                      ) : (
                        <p className="text-lg font-bold text-white">
                          No se encontraron registros
                        </p>
                      )}
                    </div>
                  </div>
                </Skeleton>
              </div>
            </div>
          </div>

          <div className="mt-4 lg:mt-0 gap-2 flex flex-col w-full lg:w-[25%] lg:pl-4">
            <h3 className="text-xl font-semibold">Sección de interes</h3>
            <div className="h-[25rem] flex flex-col justify-center gap-4 flex-wrap md:flex-nowrap md:flex-col bg-[#18181B] rounded-[2rem] overflow-auto">
              <Skeleton
                isLoaded={!isLoading}
                className="w-full h-[25rem] rounded-[2rem]"
                classNames={{ base: "dark" }}
              >
                <div className="h-full p-5 overflow-y-auto">
                  <p className="text-lg font-bold text-white text-center p-2">
                    ⭐ Cumpleañeros
                  </p>
                  <div className="flex flex-col gap-4 mt-1">
                    {athleteBirthDate.length > 0 ? (
                      <>
                        {athleteBirthDate.map((item, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-2 grid-rows-2 gap-y-1 bg-[#252525] p-2 rounded-lg"
                          >
                            <div>
                              <p className="text-sm text-white font-bold">
                              { getFullName(item.athleteName, item.athleteLastName) }
                              </p>
                            </div>
                            <p className="text-sm text-white text-right">
                              {item.birthDate}
                            </p>

                            <div className="col-span-2">
                              <p className="text-xs text-gray-400">
                                {item.age} años
                              </p>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <p className="text-sm font-bold text-white">
                        No se encontraron registros
                      </p>
                    )}
                  </div>
                </div>
              </Skeleton>
            </div>

            {/* <h3 className="text-xl font-semibold">Asistentes</h3> */}
            <div className="h-[38rem] mt-4 flex flex-col justify-center gap-4 flex-wrap md:flex-nowrap md:flex-col bg-[#18181B] rounded-[2rem] overflow-auto">
              <Skeleton
                isLoaded={!isLoading}
                className="w-full h-[38rem] rounded-[2rem]"
                classNames={{ base: "dark" }}
              >
                <div className="h-full p-5 overflow-y-auto">
                  <p className="text-lg font-bold text-white text-center p-2">
                    ✅ Asistencia diaria
                  </p>
                  <p className="text-sm font-bold text-white p-2">
                    Filtro por Fecha
                  </p>

                  <FormDatePicker
                    label="Seleccionar fecha"
                    customInputClass="mt-1"
                    onChange={handleDateChange}
                    value={selectedDate}
                  />

                  <p className="text-sm font-bold text-white p-2">
                    Filtro por Nombre
                  </p>

                  <FormInput
                    label="Nombre"
                    type="text"
                    customInputClass="h-[2rem]"
                    onChange={handleFilterByName}
                  />

                  <div className="flex justify-between mt-3">
                    <p className="text-sm font-bold text-white mt-2 p-1"></p>

                    <p
                      className="text-sm font-bold text-gray-500 mt-2 hover:text-[#5855F6] cursor-pointer"
                      onClick={handleRefresh}
                    >
                      Refrescar
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 mt-1">
                    {athleteAssistance.length > 0 ? (
                      <>
                        {athleteAssistance.map((item, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-2 grid-rows-2 gap-y-1 bg-[#252525] p-2 rounded-lg"
                          >
                            <div>
                              <p className="text-sm text-white font-bold">
                                { getFullName(item.athleteName, item.athleteLastName) }
                              </p>
                            </div>
                            <p className="text-sm text-white text-right">
                              {item.timeAssistence}
                            </p>

                            <div className="col-span-2">
                              <p className="text-xs text-gray-400">
                                {item.email}
                              </p>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <p className="text-sm font-bold text-white">
                        No se encontraron registros
                      </p>
                    )}

                    {athleteAssistance.length > 0 && (
                      <div className="flex justify-evenly">
                        <PrimaryButton
                          text="Anterior"
                          customButtonClass="w-[25%] p-5 mx-auto"
                          customTextClass="text-xs"
                          onClick={handlePreviousPage}
                          isDisabled={page === 1}
                        />

                        <SecondaryButton
                          text="Siguiente"
                          customButtonClass="w-[30%] p-3 mx-auto"
                          customTextClass="text-xs"
                          onClick={handleNextPage}
                          isDisabled={page === totalPages}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Skeleton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
