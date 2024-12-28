"use client";

import { FormRichTextInput, SecondaryButton } from "@/presentation/components";
import ViewModel from "./ViewModel";
import SendIcon from "@/assets/svg/SendIcon";

const Notifications = () => {
  const { message, chats, handleChange } = ViewModel();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[30%_70%] gap-5 w-full mx-auto mt-2 p-5 md:p-10 xl:w-11/12">
        <div className="flex flex-col">
          <header className="mt-2">
            <h4 className="font-black text-xl mb-1">Mensajes</h4>
            <p className="text-sm text-default-400">
              Comunicate con tus deportistas
            </p>
          </header>

          <SecondaryButton
            text="Nuevo mensaje"
            customButtonClass="w-full py-6 mt-5"
          />

          <section className="mt-5 space-y-3 h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
            {chats.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-lg hover:bg-[#121417] cursor-pointer"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full">
                  <span className="text-lg">{item.icon}</span>
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

        <div className="mt-2 w-full h-full bg-[#121417] rounded-xl flex flex-col">
          <section className="w-full h-16 border-b border-gray-700 flex items-center justify-center relative rounded-t-xl">
            <h5 className="font-black text-xl text-white">General</h5>

            <button className="absolute right-4 flex items-center justify-center w-10 h-10 rounded-full bg-[#3669FC]">
              <SendIcon />
            </button>
          </section>

          <section className="flex-1 flex flex-col justify-end">
            <div className="w-full border-t border-gray-700 p-3 flex items-end gap-3">
              <div className="flex-1">
                <FormRichTextInput value={message} onChange={handleChange} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Notifications;
