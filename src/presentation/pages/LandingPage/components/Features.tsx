import { Calendar, Dumbbell, LineChart, Users } from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          Características principales
        </h2>
        <div className="grid gap-6 lg:grid-cols-4">
          <div className="flex flex-col items-center space-y-4 text-center">
            <Users className="h-12 w-12 text-[#006fed]" />
            <h3 className="text-xl font-bold">Seguimiento de membresías</h3>
            <p className="text-gray-400">
              Administre y rastree fácilmente la información de los miembros,
              las suscripciones y renovaciones.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <Dumbbell className="h-12 w-12 text-[#006fed]" />
            <h3 className="text-xl font-bold">Monitoreo del entrenamiento</h3>
            <p className="text-gray-400">
              Realice un seguimiento del progreso de los atletas, establezca
              objetivos y cree entrenamientos personalizados planes.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <LineChart className="h-12 w-12 text-[#006fed]" />
            <h3 className="text-xl font-bold">Informes financieros</h3>
            <p className="text-gray-400">
              Genere informes financieros completos y conocimientos para su
              gimnasia.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <Calendar className="h-12 w-12 text-[#006fed]" />
            <h3 className="text-xl font-bold">Programación de personal</h3>
            <p className="text-gray-400">
              Administre eficientemente los horarios, turnos y asignaciones del
              personal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
