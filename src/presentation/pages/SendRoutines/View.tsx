"use client";

import {
  FormCheckboxGroup,
  FormInput,
  PrimaryButton,
} from "@/presentation/components";
import ViewModel from "./ViewModel";
import ChannelList from "../Notifications/components/ChannelList";
import CustomFormDropdown from "../Notifications/components/CustomFormDropdown";
import { formatRoutines } from "@/presentation/helpers";
import SearchIcon from "@/assets/svg/SearchIcon";

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
    handleTruncateText,
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
            />
          </section>

          <section className="w-full h-16 px-1 flex items-center justify-between md:justify-center relative rounded-b-xl self-center">
            <PrimaryButton
              text="Enviar"
              customButtonClass="w-full py-6"
              onClick={() => {}}
            />
          </section>
        </div>
      </div>
    </>
  );
};

export default SendRoutines;
