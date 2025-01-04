"use client";

import {
  CustomModal,
  FormInput,
  InfoModal,
  SecondaryButton,
} from "@/presentation/components";
import ViewModel from "./ViewModel";
import { Button } from "@nextui-org/react";
import CustomFormDropdown from "./components/CustomFormDropdown";
import NoMessageFound from "./components/NoMessageFound";
import PlusIcon from "@/assets/svg/PlusIcon";
import MessageBubble from "./components/MessageBubble";
import { useEffect, useRef } from "react";
import CustomUserModal from "./components/CustomUserModal";
import ChannelList from "./components/ChannelList";
import MessageInput from "./components/MessageInput";

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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [notificationsList]);

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

          <ChannelList
            channelsList={channelsList}
            onChatClick={handleChatClick}
            onTruncateText={handleTruncateText}
          />
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

          <MessageInput 
            openEmojiPicker={openEmojiPicker}
            textMessage={textMessage}
            onTextMessageChange={handleTextMessage}
            onSendMessage={handleSendMessage}
            onEmojiClick={handleEmojiClick}
            setOpenEmojiPicker={setOpenEmojiPicker}
          />
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
        isOpen={isModalOpen.selectUsersModal || isModalOpen.addAndDeleteUsersModal}
        onClose={() => toggleUserModal(isModalOpen.selectUsersModal ? "selectUsers" : "addAndDeleteUsers", false)}
        type={isModalOpen.selectUsersModal ? "selectUsers" : "addAndDeleteUsers"}
        users={athletesList.items}
        selectedUsers={selectedUsers}
        memberships={membership}
        selectedMemberships={selectedMemberships}
        isLoading={isLoading}
        hasMore={hasMore}
        onScroll={handleScroll}
        onUserSelection={handleUserSelection}
        onConfirm={isModalOpen.selectUsersModal ? handleCreateChannel : handleSelectedUsers}
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
