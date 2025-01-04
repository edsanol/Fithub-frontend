"use client";

import {
  CustomModal,
  FormInput,
  InfoModal,
  SecondaryButton,
} from "@/presentation/components";
import ViewModel from "./ViewModel";
import SendIcon from "@/assets/svg/SendIcon";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import emoji from "@/assets/images/emoji-gray2.png";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import CustomFormDropdown from "./components/CustomFormDropdown";
import NoMessageFound from "./components/NoMessageFound";
import PlusIcon from "@/assets/svg/PlusIcon";
import MessageBubble from "./components/MessageBubble";
import { useEffect, useRef } from "react";
import CustomUserModal from "./components/CustomUserModal";

const Notifications = () => {
  const {
    athletesList,
    channelsList,
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
    notificationsList,
    selectedMemberships,
    setOpenEmojiPicker,
    setField,
    setError,
    handleChatClick,
    handleUserSelection,
    handleCreateChannel,
    toggleUserModal,
    handleOpenSelectedUsersModal,
    handleSendMessage,
    handleTextMessage,
    handleEmojiClick,
    handleTruncateText,
    handleSelectedUsers,
    handleMembershipFilter,
    handleSelectAllUsers,
    handleScroll,
  } = ViewModel();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [notificationsList]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const target = event.target as HTMLTextAreaElement;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setOpenEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            onClick={() => toggleUserModal("channelName", true)}
          />

          <section className="mt-3 space-y-2 min-h-[60vh] max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
            {channelsList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleChatClick(item.channelId!)}
                className="flex items-center gap-3 p-4 rounded-lg hover:bg-[#121417] cursor-pointer"
              >
                <div className="min-w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full">
                  <span className="text-lg">💬</span>
                </div>
                <div className="flex-1">
                  <h5 className="text-sm font-bold text-white">
                    {handleTruncateText(item.channelName!, 40)}
                  </h5>
                  <p className="text-xs text-gray-400 truncate">
                    {item.lastMessage !== ""
                      ? handleTruncateText(item.lastMessage!, 30)
                      : "No hay mensajes"}
                  </p>
                </div>
              </div>
            ))}
          </section>
        </div>

        <div className="mt-1 w-full h-full border-1 border-gray-700 rounded-xl flex flex-col">
          <section className="w-[96%] h-16 border-b border-gray-700 px-1 flex items-center justify-between md:justify-center relative rounded-t-xl self-center">
            <h5 className="font-black text-md text-white max-w-[200px] md:max-w-[500px]">
              {selectedChat.channelName
                ? handleTruncateText(selectedChat.channelName, 50)
                : "Selecciona un chat"}
            </h5>

            {selectedChat.channelName && (
              <>
                <CustomFormDropdown athletes={selectedChat.channelAthletes!} />

                <button
                  className="absolute right-[4rem] top-[1.2rem] p-1 cursor-pointer bg-[#3669FC] rounded-full"
                  onClick={() => toggleUserModal("addAndDeleteUsers", true)}
                >
                  <PlusIcon />
                </button>
              </>
            )}
          </section>

          {selectedChat.channelName ? (
            <section className="max-h-[400px] flex-1 flex flex-col overflow-y-auto px-4 pt-2 gap-2">
              {notificationsList && notificationsList.length > 0 ? (
                notificationsList.map((notif) => (
                  <MessageBubble
                    key={notif.notificationId}
                    message={notif.message}
                    sendAt={notif.sendAt}
                  />
                ))
              ) : (
                <NoMessageFound />
              )}
              <div ref={messagesEndRef} />
            </section>
          ) : (
            <NoMessageFound />
          )}

          <section className="flex flex-col justify-end">
            <div className="w-[98%] border-t border-gray-700 p-3 flex items-end gap-3 self-center">
              <div className="flex-1 flex items-center gap-3">
                <textarea
                  placeholder="Escribe un mensaje..."
                  className="flex flex-1 border-0 outline-0 p-2 rounded-lg resize-none bg-transparent text-white max-h-[100px] overflow-auto"
                  value={textMessage}
                  onChange={(e) => handleTextMessage(e.target.value)}
                  onKeyDown={(event) => handleKeyDown(event)}
                  onInput={(event) => handleInput(event)}
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
                  {openEmojiPicker && (
                    <div
                      ref={emojiPickerRef}
                      className="absolute bottom-12 right-[-90px] md:right-0 z-10"
                    >
                      <EmojiPicker
                        open={openEmojiPicker}
                        onEmojiClick={(event: EmojiClickData) =>
                          handleEmojiClick(event)
                        }
                      />
                    </div>
                  )}
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
        onOpenChange={(value) => toggleUserModal("channelName", value)}
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
              onPress={() => toggleUserModal("channelName", false)}
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

      <CustomUserModal
        isOpen={
          isModalOpen.selectUsersModal || isModalOpen.addAndDeleteUsersModal
        }
        onClose={() =>
          toggleUserModal(
            isModalOpen.selectUsersModal ? "selectUsers" : "addAndDeleteUsers",
            false
          )
        }
        type={
          isModalOpen.selectUsersModal ? "selectUsers" : "addAndDeleteUsers"
        }
        users={athletesList.items}
        selectedUsers={selectedUsers}
        memberships={membership}
        selectedMemberships={selectedMemberships}
        isLoading={isLoading}
        hasMore={hasMore}
        onScroll={handleScroll}
        onUserSelection={handleUserSelection}
        onConfirm={
          isModalOpen.selectUsersModal
            ? handleCreateChannel
            : handleSelectedUsers
        }
        onFilterChange={(value) => handleSetTextFilter(value)}
        onMembershipFilter={handleMembershipFilter}
        onSelectAllUsers={handleSelectAllUsers}
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
