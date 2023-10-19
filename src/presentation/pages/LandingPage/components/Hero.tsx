import ArrowDownIcon from "@/assets/svg/ArrowDownIcon";
import GearIcon from "@/assets/svg/GearIcon";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import pcBackground from "@/assets/images/pc-background-next.png";

const Hero = () => {
  return (
    <>
      <main className="flex justify-center h-[calc(100vh-84px)] w-full">
        <div className="flex flex-col justify-center items-center gap-y-10 w-[45%]">
          <div className="h-[12%] w-full"></div>

          <div className="flex justify-around gap-y-10 bg-transparent w-[360px] h-[60px] border-solid border-2 rounded-full cursor-pointer">
            <div className="flex items-center">
              <GearIcon />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-white text-base font-bold">
                Te ayudaremos a crecer
              </p>
              <p className="text-white text-base font-bold opacity-50">
                Mira nuestros beneficios
              </p>
            </div>
            <div className="flex items-center">
              <ArrowDownIcon />
            </div>
          </div>

          <div>
            <h2 className="text-white text-5xl font-bold">
              Transforma tu gimnasio
            </h2>
            <h1 className="text-white text-6xl font-extrabold">
              FitHub Connect
            </h1>
            <p className="text-white opacity-50 text-[28px] font-bold my-8">
              Maximiza tu eficiencia y éxito en la gestión fitness.
            </p>
            <div className="my-8">
              <Button size="lg" radius="sm" color="primary">
                <Link href="/">
                  <p className="text-white text-lg font-bold">Comencemos</p>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center w-[45%] relative">
          <Image
            src={pcBackground}
            alt="fithub program"
            layout="responsive"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </main>
    </>
  );
};

export default Hero;
