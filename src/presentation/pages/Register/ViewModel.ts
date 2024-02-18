import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import container from "@/config/inversifyContainer";
import { RegisterGymUserUseCase } from "@/domain/useCases/GymUser/registerGymUserUseCase";
import { TYPES } from "@/config/types";
import {
  isNotEmpty,
  isValidEmail,
  isValidName,
  isValidNit,
  isValidPassword,
  isValidPhone,
} from "@/presentation/helpers";
import { IGymDataValidation } from "@/presentation/interfaces";
import { GymUser } from "@/domain/entities/GymUser";
import { cipherData } from "@/config/secureData";
import Cookies from "js-cookie";

const ViewModel = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [gymData, setGymData] = useState<GymUser>({
    gymName: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
    registerDate: new Date().toISOString(),
    subscriptionPlan: "Premium",
    comments: "",
    nit: "",
  });
  const [gymDataError, setGymDataError] = useState<IGymDataValidation>({
    gymNameError: false,
    emailError: false,
    passwordError: false,
    addressError: false,
    phoneNumberError: false,
    nitError: false,
  });

  const handleIsValidForm = () => {
    const errors: IGymDataValidation = {
      emailError: !isValidEmail(gymData.email),
      passwordError: !isValidPassword(gymData.password!),
      gymNameError: !isValidName(gymData.gymName),
      phoneNumberError: !isValidPhone(gymData.phoneNumber),
      nitError: !isValidNit(gymData.nit),
      addressError: !isNotEmpty(gymData.address),
    };

    setGymDataError(errors);

    return Promise.resolve(errors);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const errors = await handleIsValidForm();

      if (Object.values(errors).some(Boolean)) {
        return;
      }

      const registerGymUserUseCase = container.get<RegisterGymUserUseCase>(
        TYPES.RegisterGymUserUseCase
      );
      const response = await registerGymUserUseCase.execute(gymData);

      if (!response) {
        console.log("error");
        return;
      }

      const responseNextAuth = await signIn("credentials", {
        email: gymData.email,
        password: gymData.password,
        redirect: false,
      });

      if (responseNextAuth?.error) {
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session?.user.token) {
      Cookies.set("authToken", session.user.token, { expires: 1 });
      const tokenEncrypted = cipherData(session?.user.refreshToken);
      Cookies.set("refreshToken", tokenEncrypted, { expires: 1 });
    }
  }, [session]);

  const handleSetGymName = (event: string) => {
    setGymData({ ...gymData, gymName: event });
  };

  const handleSetEmail = (event: string) => {
    setGymData({ ...gymData, email: event });
  };

  const handleSetPassword = (event: string) => {
    setGymData({ ...gymData, password: event });
  };

  const handleSetAddress = (event: string) => {
    setGymData({ ...gymData, address: event });
  };

  const handleSetPhoneNumber = (event: string) => {
    setGymData({ ...gymData, phoneNumber: event });
  };

  const handleSetRegisterDate = (event: string) => {
    setGymData({ ...gymData, registerDate: event });
  };

  const handleSetSubscriptionPlan = (event: string) => {
    setGymData({ ...gymData, subscriptionPlan: event });
  };

  const handleSetComments = (event: string) => {
    setGymData({ ...gymData, comments: event });
  };

  const handleSetNit = (event: string) => {
    setGymData({ ...gymData, nit: event });
  };

  return {
    handleSubmit,
    handleSetGymName,
    handleSetEmail,
    handleSetPassword,
    handleSetAddress,
    handleSetPhoneNumber,
    handleSetRegisterDate,
    handleSetSubscriptionPlan,
    handleSetComments,
    handleSetNit,
    gymDataError,
  };
};

export default ViewModel;
