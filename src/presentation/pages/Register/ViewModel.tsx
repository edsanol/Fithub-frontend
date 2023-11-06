import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  isNotEmpty,
  isValidEmail,
  isValidName,
  isValidNit,
  isValidPassword,
  isValidPhone,
} from "@/presentation/helpers";
import { IGymData, IGymDataValidation } from "@/presentation/interfaces/IAuth";

const ViewModel = () => {
  const [gymData, setGymData] = useState<IGymData>({
    gymName: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
    registerDate: "2023-11-01T02:30:20.934Z",
    subscriptionPlan: "",
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
  const router = useRouter();

  const handleIsValidForm = async () => {
    const errors: IGymDataValidation = {
      emailError: !isValidEmail(gymData.email),
      passwordError: !isValidPassword(gymData.password),
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

    const errors = await handleIsValidForm();

    if (Object.values(errors).some(Boolean)) {
      return;
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Gym/Register`,
      gymData
    );

    console.log("response status", response.status);
    console.log("response", response.data);

    if (response.status !== 200) {
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
  };

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
