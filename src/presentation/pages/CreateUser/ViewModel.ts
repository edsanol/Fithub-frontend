import {
  isNotEmpty,
  isValidEmail,
  isValidGenre,
  isValidName,
  isValidPhone,
} from "@/presentation/helpers";
import { IAthleteValidation } from "@/presentation/interfaces/IAthlete";
import { useRouter } from "next/navigation";
import React, { useEffect, useCallback } from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { RegisterAthleteUserUseCase } from "@/domain/useCases/AthleteUser/registerAthleteUserUseCase";
import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { AthleteUser } from "@/domain/entities/AthleteUser";

const ViewModel = () => {
  const { data: session } = useSession();

  const [athleteData, setAthleteData] = useState<AthleteUser>({
    athleteName: "",
    athleteLastName: "",
    email: "",
    phoneNumber: "",
    genre: "",
    birthDate: "",
    registerDate: new Date().toISOString(),
    idGym: 0,
    gymName: "",
    status: true,
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
      nameError: !isValidName(athleteData.athleteName),
      lastNameError: !isValidName(athleteData.athleteLastName),
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

      const registerAthleteUserUseCase =
        container.get<RegisterAthleteUserUseCase>(
          TYPES.RegisterAthleteUserUseCase
        );

      const response = await registerAthleteUserUseCase.execute(athleteData);

      if (!response) {
        console.log("error");
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetGymData = useCallback(() => {
    if (!session) {
      return;
    }

    setAthleteData((prevAthleteData) => ({
      ...prevAthleteData,
      idGym: session.user.gymId,
      gymName: session.user.gymName,
    }));
  }, [session, setAthleteData]);

  useEffect(() => {
    handleSetGymData();
  }, [handleSetGymData]);

  const handleSetName = (event: string) => {
    setAthleteData({ ...athleteData, athleteName: event });
  };

  const handleSetLastName = (event: string) => {
    setAthleteData({ ...athleteData, athleteLastName: event });
  };

  const handleSetEmail = (event: string) => {
    setAthleteData({ ...athleteData, email: event });
  };

  const handleSetPhoneNumber = (event: string) => {
    setAthleteData({ ...athleteData, phoneNumber: event });
  };

  const handleSetBirthDate = (event: string) => {
    const birthDate = new Date(event).toISOString();

    setAthleteData({ ...athleteData, birthDate: birthDate });
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
