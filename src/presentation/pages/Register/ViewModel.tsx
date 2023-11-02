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

const ViewModel = () => {
  const [gymData, setGymData] = useState<any>({
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
  const [gymDataError, setGymDataError] = useState<any>({
    gymNameError: false,
    emailError: false,
    passwordError: false,
    addressError: false,
    phoneNumberError: false,
    nitError: false,
  });
  const router = useRouter();

  const handleIsValidForm = (gymData: any) => {
    const newErrors = {
      emailError: false,
      passwordError: false,
      gymNameError: false,
      phoneNumberError: false,
      nitError: false,
      addressError: false,
    };

    if (!isValidEmail(gymData.email)) {
      newErrors.emailError = true;
    }

    if (!isValidPassword(gymData.password)) {
      newErrors.passwordError = true;
    }

    if (!isValidName(gymData.gymName)) {
      newErrors.gymNameError = true;
    }

    if (!isValidPhone(gymData.phoneNumber)) {
      newErrors.phoneNumberError = true;
    }

    if (!isValidNit(gymData.nit)) {
      newErrors.nitError = true;
    }

    if (!isNotEmpty(gymData.address)) {
      newErrors.addressError = true;
    }

    setGymDataError(newErrors);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleIsValidForm(gymData);

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
