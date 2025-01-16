"use client";

import {
  CustomModal,
  DashboardHeader,
  FormCheckboxGroup,
  FormInput,
  InfoModal,
  PrimaryButton,
} from "@/presentation/components";
import ViewModel from "./ViewModel";
import ChannelList from "../Notifications/components/ChannelList";
import CustomFormDropdown from "../Notifications/components/CustomFormDropdown";
import { formatRoutines } from "@/presentation/helpers";
import SearchIcon from "@/assets/svg/SearchIcon";
import { Spinner } from "@nextui-org/react";

const SendRoutines = () => {
  const {
    channelsList,
    selectedChat,
    isLoading,
    handleChannelsScroll,
    handleRoutinesScroll,
    routinesList,
    handleChannelsTextFilter,
    handleRoutinesTextFilter,
    openModal,
    dates,
    error,
    errorMessage,
    setError,
    sendRoutines,
    setField,
    toogleModal,
    handleTruncateText,
    handleRoutineClick,
    handleChatClick,
  } = ViewModel();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[30%_70%] gap-5 w-full mx-auto mt-1 p-4 md:p-10 xl:w-11/12">
        <div className="flex flex-col">
          <header className="mt-2">
            <h4 className="font-black text-xl mb-1">Mensajes</h4>
            <p className="text-sm text-default-400">
              Comunicate con tus deportistas
            </p>
          </header>

          <ChannelList
            channelsList={channelsList.items}
            isLoading={isLoading}
            onChatClick={handleChatClick}
            onTruncateText={handleTruncateText}
            onScroll={handleChannelsScroll}
            onTextFilter={handleChannelsTextFilter}
          />
        </div>

        <div className="mt-1 w-full h-full flex flex-col max-h-[76vh] min-h-[76vh]">
          <section className="w-[96%] h-16 border-b border-gray-700 px-1 flex items-center justify-between md:justify-center relative rounded-t-xl self-center">
            <h5 className="font-black text-md text-white max-w-[200px] md:max-w-[500px]">
              {selectedChat.channelName
                ? handleTruncateText(selectedChat.channelName, 50)
                : "Selecciona un chat"}
            </h5>

            {selectedChat.channelName && (
              <CustomFormDropdown athletes={selectedChat.channelAthletes!} />
            )}
          </section>

          <section
            className="flex-1 flex flex-col overflow-y-auto px-4 pt-2 gap-2"
            onScroll={handleRoutinesScroll}
          >
            <FormInput
              type="text"
              placeholder="Buscar rutina..."
              customInputClass="mt-3"
              startContent={<SearchIcon />}
              size="md"
              onChange={handleRoutinesTextFilter}
            />
            <FormCheckboxGroup
              items={formatRoutines(routinesList.items)}
              label="Selecciona la rutina"
              onChange={handleRoutineClick}
            />

            {isLoading && (
              <span className="flex justify-center w-full">
                <Spinner />
              </span>
            )}
          </section>

          <section className="w-full h-16 px-1 flex items-center justify-between md:justify-center relative rounded-b-xl self-center">
            <PrimaryButton
              text="Enviar"
              customButtonClass="w-full py-6"
              onClick={toogleModal}
            />
          </section>
        </div>
      </div>

      <CustomModal
        isOpen={openModal}
        onOpenChange={toogleModal}
        size="2xl"
        content={
          <>
            <DashboardHeader
              title="Selecciona las fechas"
              description="Selecciona las fechas de inicio y fin de la rutina"
            />
            <form className="mt-3" onSubmit={sendRoutines}>
              <div className="flex flex-col md:flex-row gap-5">
                <FormInput
                  isRequired
                  type="date"
                  label="Inicio de la rutina (dd/mm/aaaa)"
                  placeholder="Fecha de inicio de la rutina"
                  size="lg"
                  customInputClass="mt-5"
                  value={dates.startDate}
                  onChange={(value) => setField("startDate", value)}
                />
                <FormInput
                  isRequired
                  type="date"
                  label="Fin de la rutina (dd/mm/aaaa)"
                  placeholder="Fecha de fin de la rutina"
                  size="lg"
                  customInputClass="mt-5"
                  value={dates.endDate}
                  onChange={(value) => setField("endDate", value)}
                />
              </div>
              <div className="mt-5">
                <PrimaryButton
                  text="Enviar rutina"
                  btnType="submit"
                  customButtonClass="w-full p-8 mt-5"
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

export default SendRoutines;
