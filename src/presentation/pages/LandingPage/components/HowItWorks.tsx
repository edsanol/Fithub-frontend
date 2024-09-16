import pcBackground from "@/assets/images/pc-background-next.png";
import Image from "next/image";

const HowItWorks = () => {
  return (
    <section
      id="services"
      className="w-full py-12 md:py-24 lg:py-32 md:flex md:justify-center"
    >
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          Cómo funciona
        </h2>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <Image
            alt="FitHub Dashboard"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
            height="310"
            src={pcBackground}
            width="550"
          />
          <div className="flex flex-col justify-center space-y-4">
            <ul className="grid gap-6">
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">
                    1. Dashboard centralizado
                  </h3>
                  <p className="text-gray-400">
                    Accede a todas las métricas y funciones clave de tu gimnasio
                    desde un dashboard de control intuitivo.
                  </p>
                </div>
              </li>
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">2. Gestión de miembros</h3>
                  <p className="text-gray-400">
                    Agregue, actualice y administre fácilmente perfiles de
                    miembros y suscripciones.
                  </p>
                </div>
              </li>
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">
                    3. Seguimiento del rendimiento
                  </h3>
                  <p className="text-gray-400">
                    Supervise el progreso del atleta y genere un rendimiento
                    detallado informes.
                  </p>
                </div>
              </li>
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">4. Resumen financiero</h3>
                  <p className="text-gray-400">
                    Obtenga información en tiempo real sobre la salud financiera
                    de su gimnasio y actuación.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
