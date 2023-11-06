import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import container from "@/config/inversifyContainer";
import { RegisterGymUserUseCase } from "@/domain/useCases/GymUser/registerGymUserUseCase";
import { TYPES } from "@/config/types";

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
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
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
  };
};

export default ViewModel;
