"use client";

import Image from "next/image";
import pcBackground from "@/assets/images/pc-background-next.png";
import RedirectButton from "./RedirectButton";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  return (
    <>
      <section className="w-full py-12 md:py-24 md:flex md:justify-center lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Optimice la gestión de su gimnasio con FitHub
                </h1>
                <p className="max-w-[600px] text-gray-200 md:text-xl">
                  Administre sin esfuerzo las membresías, realice un seguimiento
                  del progreso, maneje las finanzas y optimice la programación
                  del personal. Todo en una poderosa plataforma.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <RedirectButton
                  color="primary"
                  variant="solid"
                  onClick={() => router.push("/register")}
                  label="Regístrate"
                  customClass="text-white"
                />

                <RedirectButton
                  color="secondary"
                  variant="ghost"
                  onClick={() => console.log("ver demo")}
                  label="Ver demo"
                  customClass="text-[#9c34c2] hover:text-white"
                />
              </div>
            </div>

            <Image
              alt="FitHub Dashboard"
              className="shadow-lg mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              src={pcBackground}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
