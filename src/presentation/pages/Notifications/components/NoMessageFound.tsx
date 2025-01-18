import Image from "next/image";
import messageIcon from "@/assets/images/message-icon.png";

const NoMessageFound = () => {
  return (
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
            <p className="text-lg font-bold text-white text-center">
              No se encontraron mensajes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoMessageFound;
