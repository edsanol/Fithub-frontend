import { use, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { GymUser } from "@/domain/entities/GymUser";
import { IGymDataValidation } from "@/presentation/interfaces/IAuth";
import { useRouter } from "next/navigation";
import {
  isNotEmpty,
  isValidEmail,
  isValidName,
  isValidNit,
  isValidPhone,
} from "@/presentation/helpers";
import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { EditGymUserUseCase } from "@/domain/useCases/GymUser/editGymUserUseCase";

const ViewModel = () => {
  const { data: session } = useSession();

  const gymUser = session?.user;

  const [isClicked, setIsClicked] = useState(false);
  const [gymData, setGymData] = useState<GymUser>({
    gymName: "",
    email: "",
    address: "",
    phoneNumber: "",
    registerDate: new Date().toISOString(),
    subscriptionPlan: "",
    comments: "",
    nit: "",
  });

  const [gymDataError, setGymDataError] = useState<IGymDataValidation>({
    gymNameError: false,
    emailError: false,
    addressError: false,
    phoneNumberError: false,
    nitError: false,
  });

  const router = useRouter();

  useEffect(() => {
    if (gymUser) {
      setGymData({
        ...gymData,
        gymName: gymUser.gymName,
        email: gymUser.email,
        address: gymUser.address,
        phoneNumber: gymUser.phoneNumber,
        nit: gymUser.nit,
        comments: gymUser.comments,
        subscriptionPlan: gymUser.subscriptionPlan,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gymUser]);

  const handleIsValidForm = async () => {
    const errors: IGymDataValidation = {
      emailError: !isValidEmail(gymData.email),
      gymNameError: !isValidName(gymData.gymName),
      phoneNumberError: !isValidPhone(gymData.phoneNumber),
      nitError: !isValidNit(gymData.nit),
      addressError: !isNotEmpty(gymData.address),
    };

    setGymDataError(errors);

    return Promise.resolve(errors);
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const errors = await handleIsValidForm();

      if (Object.values(errors).some(Boolean)) {
        return;
      }

      const editGymUserUseCase = container.get<EditGymUserUseCase>(
        TYPES.EditGymUserUseCase
      );

      const response = await editGymUserUseCase.execute(
        gymUser?.gymId!,
        gymData
      );

      if (!response) {
        console.log("error");
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

  const handleSetAddress = (event: string) => {
    setGymData({ ...gymData, address: event });
  };

  const handleSetPhoneNumber = (event: string) => {
    setGymData({ ...gymData, phoneNumber: event });
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
    handleSetAddress,
    handleSetPhoneNumber,
    handleSetComments,
    handleSetNit,
    handleClick,
    isClicked,
    gymData,
    gymDataError,
  };
};

export default ViewModel;
