import { AuthHeader } from "@/presentation/components";
import RegisterForm from "./components/register-form/RegisterForm";

const Register = () => {
  return (
    <>
      <div className="h-full bg-[#000]">
        <AuthHeader />
        <div className="w-11/12 mx-auto bg-[#121417] my-10 rounded-xl p-5 md:w-9/12 md:p-10 lg:w-8/12 xxl:w-1/2">
          <RegisterForm />
        </div>
      </div>
    </>
  );
};

export default Register;
