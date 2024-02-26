import { AuthHeader } from "@/presentation/components";
import ChangePasswordForm from "./components/change-password-form/ChangePasswordForm";

const ChangePassword = () => {
  return (
    <div className="w-full h-full bg-[#000]">
      <AuthHeader />
      <div className="w-11/12 mx-auto my-12 bg-[#121417] rounded-xl p-5 md:w-9/12 md:p-10 lg:w-7/12 xxl:w-2/5">
        <h2 className="text-2xl text-white text-center md:font-bold lg:text-3xl">
          Cambiar contraseña
        </h2>
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default ChangePassword;
