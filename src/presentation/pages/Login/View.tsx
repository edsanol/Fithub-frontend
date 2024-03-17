import { AuthHeader, FormLink } from "@/presentation/components";
import { LoginForm } from "./components/login-form/LoginForm";

const Login = () => {
  return (
    <div className="w-full h-full bg-[#000]">
      <AuthHeader />
      <div className="w-11/12 mx-auto my-12 bg-[#121417] rounded-xl p-5 md:w-9/12 md:p-10 lg:w-7/12 xxl:w-2/5">
        <h2 className="text-2xl text-white text-center md:font-bold lg:text-3xl">
          Bienvenido de vuelta
        </h2>
        <LoginForm />
        <div className="w-full flex justify-center">
          <FormLink
            href="/register"
            text="¿Todavía no tienes una cuenta? Crea una ahora"
            customLinkClass="mt-20 text-sm md:mt-10 xl:text-base"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
