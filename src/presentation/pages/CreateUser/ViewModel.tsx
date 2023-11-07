import {
  isNotEmpty,
  isValidEmail,
  isValidGenre,
  isValidName,
  isValidPhone,
} from "@/presentation/helpers";
import {
  IAthlete,
  IAthleteValidation,
} from "@/presentation/interfaces/IAthlete";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";

const ViewModel = () => {
  const [athleteData, setAthleteData] = useState<IAthlete>({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    genre: "",
    birthDate: "",
  });

  const [athleteDataError, setAthleteDataError] = useState<IAthleteValidation>({
    nameError: false,
    lastNameError: false,
    emailError: false,
    phoneNumberError: false,
    genreError: false,
    birthDateError: false,
  });

  const router = useRouter();

  const handleIsValidForm = async () => {
    const errors: IAthleteValidation = {
      emailError: !isValidEmail(athleteData.email),
      nameError: !isValidName(athleteData.name),
      lastNameError: !isValidName(athleteData.lastName),
      phoneNumberError: !isValidPhone(athleteData.phoneNumber),
      genreError: !isValidGenre(athleteData.genre),
      birthDateError: !isNotEmpty(athleteData.birthDate),
    };

    setAthleteDataError(errors);

    return Promise.resolve(errors);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const errors = await handleIsValidForm();

      if (Object.values(errors).some(Boolean)) {
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetName = (event: string) => {
    setAthleteData({ ...athleteData, name: event });
  };

  const handleSetLastName = (event: string) => {
    setAthleteData({ ...athleteData, lastName: event });
  };

  const handleSetEmail = (event: string) => {
    setAthleteData({ ...athleteData, email: event });
  };

  const handleSetPhoneNumber = (event: string) => {
    setAthleteData({ ...athleteData, phoneNumber: event });
  };

  const handleSetBirthDate = (event: string) => {
    setAthleteData({ ...athleteData, birthDate: event });
  };

  const handleSetGenre = (event: string) => {
    setAthleteData({ ...athleteData, genre: event });
  };

  return {
    handleSubmit,
    handleSetName,
    handleSetLastName,
    handleSetEmail,
    handleSetPhoneNumber,
    handleSetBirthDate,
    handleSetGenre,
    athleteDataError,
  };
};

export default ViewModel;
