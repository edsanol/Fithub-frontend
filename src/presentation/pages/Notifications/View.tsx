"use client";

import {
  CustomModal,
  FormInput,
  FormSelect,
  InfoModal,
  SecondaryButton,
} from "@/presentation/components";
import ViewModel from "./ViewModel";
import SendIcon from "@/assets/svg/SendIcon";
import { Button, CheckboxGroup } from "@nextui-org/react";
import CustomFormCheckbox from "./components/CustomFormCheckbox";
import { Spinner } from "@nextui-org/spinner";
import { formatMembershipElements } from "@/presentation/helpers";
import Image from "next/image";
import emoji from "@/assets/images/emoji-gray2.png";
import messageIcon from "@/assets/images/message-icon.png";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

const Notifications = () => {
  const {
    athletesList,
    chats,
    selectedChat,
    selectedUsers,
    isLoading,
    hasMore,
    error,
    errorMessage,
    isModalOpen,
    channelName,
    membership,
    handleSetTextFilter,
    openEmojiPicker,
    textMessage,
    setOpenEmojiPicker,
    setField,
    setError,
    handleChatClick,
    getAthletesList,
    handleUserSelection,
    handleCreateChannel,
    toggleModal,
    handleOpenSelectedUsersModal,
    handleSendMessage,
    handleTextMessage,
    handleEmojiClick,
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

          <SecondaryButton
            text="Nuevo canal"
            customButtonClass="w-full py-6 mt-5"
            onClick={() => toggleModal("channelNameModal", true)}
          />

          <section className="mt-3 space-y-2 min-h-[60vh] max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
            {chats.map((item, index) => (
              <div
                key={index}
                onClick={() => handleChatClick(item)}
                className="flex items-center gap-3 p-4 rounded-lg hover:bg-[#121417] cursor-pointer"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full">
                  <span className="text-lg">💬</span>
                </div>
                <div className="flex-1">
                  <h5 className="text-sm font-bold text-white">{item.title}</h5>
                  <p className="text-xs text-gray-400 truncate">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </section>
        </div>

        <div className="mt-1 w-full h-full border-1 border-gray-700 rounded-xl flex flex-col">
          <section className="w-[96%] h-16 border-b border-gray-700 flex items-center justify-center relative rounded-t-xl self-center">
            <h5 className="font-black text-xl text-white">
              {selectedChat ? selectedChat.title : "Selecciona un chat"}
            </h5>
          </section>

          {/* No chats */}
          <section className="flex flex-1 flex-col overflow-y-auto p-4 max-h-[62vh]">
            <div className="flex h-full w-full justify-center items-center">
              <div className="flex flex-col h-[50%] w-[50%]">
                <div className="flex flex-col self-center h-[50%] w-[100%] justify-center items-center">
                  <Image
                    src={messageIcon}
                    width={120}
                    height={120}
                    alt="Seleccionar emoji"
                  />
                </div>
                <div className="flex flex-col self-center h-[50%] w-[100%] justify-center items-center">
                  <p className="text-2xl font-bold text-white text-center">
                    No se encontraron mensajes
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="flex flex-col justify-end">
            <div className="w-[98%] border-t border-gray-700 p-3 flex items-end gap-3 self-center">
              <div className="flex-1 flex items-center gap-3">
                <FormInput
                  type="text"
                  placeholder="Escribe un mensaje..."
                  customInputClass="flex flex-1 border-0 outline-0 p-2 rounded-lg"
                  value={textMessage}
                  onChange={(value) => handleTextMessage(value)}
                />
                <div className="flex items-center gap-2 relative">
                  <button onClick={() => setOpenEmojiPicker((prev) => !prev)}>
                    <Image
                      src={emoji}
                      width={28}
                      height={28}
                      alt="Seleccionar emoji"
                    />
                  </button>
                  <div className="absolute bottom-12 right-0">
                    <EmojiPicker
                      open={openEmojiPicker}
                      onEmojiClick={(event: EmojiClickData) => handleEmojiClick(event)}
                    />
                  </div>
                </div>
                <button
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-[#3669FC]"
                  onClick={handleSendMessage}
                >
                  <SendIcon />
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      <CustomModal
        isOpen={isModalOpen.channelNameModal}
        onOpenChange={(value) => toggleModal("channelNameModal", value)}
        size="xl"
        content={
          <FormInput
            type="text"
            label="Nombre del canal"
            onChange={(value) => setField(value)}
            value={channelName}
          />
        }
        footerContent={
          <>
            <Button
              color="danger"
              variant="ghost"
              onPress={() => toggleModal("channelNameModal", false)}
            >
              Cerrar
            </Button>
            <Button
              color="primary"
              variant="ghost"
              onPress={handleOpenSelectedUsersModal}
            >
              Continuar
            </Button>
          </>
        }
      />

      <CustomModal
        isOpen={isModalOpen.selectedUsersModal}
        onOpenChange={(value) => toggleModal("selectedUsersModal", value)}
        size="xl"
        content={
          <>
            <div className="flex flex-col justify-center items-center md:flex-row gap-3">
              <FormInput
                type="text"
                label="Buscar por nombre"
                onChange={(value) => handleSetTextFilter(value)}
                size="sm"
              />
              <FormSelect
                label="Filtrar por membresía"
                size="sm"
                popoverProps={{ color: "foreground" }}
                items={formatMembershipElements(membership)}
              />
            </div>
            <span>Listado de deportistas</span>
            <div
              className="h-96 overflow-y-auto space-y-4"
              onScroll={(e) => {
                const target = e.target as HTMLElement;
                if (
                  target.scrollTop + target.clientHeight >=
                    target.scrollHeight - 10 &&
                  !isLoading &&
                  hasMore
                ) {
                  getAthletesList();
                }
              }}
            >
              <CheckboxGroup
                classNames={{ base: "w-full" }}
                value={selectedUsers}
                onChange={(value) => handleUserSelection(value)}
              >
                {athletesList.items.map((athlete, index) => (
                  <CustomFormCheckbox
                    key={index}
                    user={athlete}
                    value={athlete.athleteId.toString()}
                  />
                ))}
              </CheckboxGroup>
              {isLoading && (
                <span className="flex justify-center w-full">
                  <Spinner />
                </span>
              )}
              {!hasMore && <p className="text-center">No hay más usuarios</p>}
            </div>
          </>
        }
        footerContent={
          <>
            <Button
              color="danger"
              variant="ghost"
              onPress={() => toggleModal("selectedUsersModal", false)}
            >
              Cerrar
            </Button>
            <Button
              color="primary"
              variant="ghost"
              onPress={handleCreateChannel}
            >
              Continuar
            </Button>
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

export default Notifications;
