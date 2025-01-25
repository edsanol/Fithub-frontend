"use client";

import { Image, Skeleton } from "@nextui-org/react";
import ViewModel from "./ViewModel";
import { CustomButton } from "@/presentation/components";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const { gymData, isLoading, setGymData } = ViewModel();

  return (
    <div className="h-full bg-gradient-to-b from-[#121417] to-[#000] text-white flex items-center justify-center">
      <div className="w-full mx-auto bg-[#1C1F24] rounded-xl p-5 md:p-10 xl:w-11/12 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Bienvendios a{" "}
            <Skeleton
              isLoaded={!isLoading}
              className="w-[auto] h-[auto] rounded-[2rem]"
              classNames={{ base: "dark" }}
            >
              <span className="text-[#3669FC]">{gymData.gymName}</span>
            </Skeleton>
          </h1>
          <Skeleton
            isLoaded={!isLoading}
            className="w-[auto] h-[auto] rounded-[2rem]"
            classNames={{ base: "dark" }}
          >
            <p className="text-lg md:text-xl text-gray-400 mt-3">
              {gymData.comments}
            </p>
          </Skeleton>
        </div>

        <div className="mt-8 flex justify-center">
          <Image
            src="https://images.pexels.com/photos/5327487/pexels-photo-5327487.jpeg"
            alt="Gym Image"
            width={500}
            height={300}
          />
        </div>

        <div className="mt-8 flex justify-center">
          <CustomButton
            type="button"
            color="primary"
            variant="solid"
            text="Comenzar ahora"
            onClick={() => router.push("/dashboard")}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
