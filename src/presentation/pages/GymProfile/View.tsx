import { DashboardHeader } from "@/presentation/components";
import GymProfileForm from "./gym-profile-form/GymProfileForm";

const GymProfile = () => {
  return (
    <>
      <div className="h-full bg-[#000]">
        <div className="w-full mx-auto bg-[#121417] rounded-xl p-5 md:p-10 xl:w-11/12">
          <div className="mt-5 flex flex-col justify-center">
            <DashboardHeader
              title="Tu Espacio Fitness Personal"
              description="Aquí podrás ver y actualizar todos tus detalles relacionados con
              el gimnasio"
            />
          </div>

          <GymProfileForm />
        </div>
      </div>
    </>
  );
};

export default GymProfile;
