import { DashboardHeader } from "@/presentation/components";
import CreateUserForm from "./components/create-user-form/CreateUserForm";

const CreateUser = () => {
  return (
    <>
      <div className="h-full bg-[#000]">
        <DashboardHeader
          title="Configura el Perfil de tus Atletas"
          description="Personaliza la información de tus deportistas"
        />
        <div className="w-full mx-auto mt-5 bg-[#121417] rounded-xl p-5 md:p-10 xl:w-11/12">
          <CreateUserForm />
        </div>
      </div>
    </>
  );
};

export default CreateUser;
