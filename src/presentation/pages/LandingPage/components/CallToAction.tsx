"use client";

import RedirectButton from "./RedirectButton";
import { useRouter } from "next/navigation";

const CallToAction = () => {
  const router = useRouter();

  return (
    <section
      id="contact"
      className="w-full py-12 md:py-24 lg:py-32 bg-[#006fed] md:flex md:justify-center"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            ¿Listo para transformar la gestión de tu gimnasio?
          </h2>
          <p className="max-w-[600px] text-gray-200 md:text-xl">
            Regístrese para una prueba gratuita o programe una demostración para
            ver cómo FitHub puede optimizar las operaciones de su gimnasio.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <RedirectButton
              color="secondary"
              variant="solid"
              label="Comenzar prueba gratuita"
              customClass="text-white"
              onClick={() => router.push("/register")}
            />

            <RedirectButton
              color="default"
              variant="solid"
              label="Agendar demo"
              customClass="text-black"
              onClick={() => router.push("/register")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
