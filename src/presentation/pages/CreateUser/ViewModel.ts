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
import { GetAthleteUserByIdUseCase } from "@/domain/useCases/AthleteUser/getAtleteUserByIdUseCase";
import { usePathname } from "next/navigation";
import { EditAthleteUserUseCase } from "@/domain/useCases/AthleteUser/editAthleteUserUseCase";

const ViewModel = () => {
  const { data: session } = useSession();

  const pathname = usePathname();

  const athleteId = pathname.match(/\/create-user\/(.*)/);

  const athleteIdValue = athleteId ? athleteId[1] : null;

  const [athleteData, setAthleteData] = useState<AthleteUser>({
    athleteName: "",
    athleteLastName: "",
    email: "",
    phoneNumber: "",
    genre: "",
    birthDate: "",
    registerDate: new Date().toISOString(),
    idGym: session ? session.user.gymId : 0,
    gymName: session ? session.user.gymName : "",
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

      let response;

      if (
        athleteIdValue &&
        athleteData.gymName !== "" &&
        athleteData.idGym !== 0
      ) {
        const editAthleteUserUseCase = container.get<EditAthleteUserUseCase>(
          TYPES.EditAthleteUserUseCase
        );

        response = await editAthleteUserUseCase.execute(
          Number(athleteIdValue),
          athleteData
        );
      } else {
        const registerAthleteUserUseCase =
          container.get<RegisterAthleteUserUseCase>(
            TYPES.RegisterAthleteUserUseCase
          );

        response = await registerAthleteUserUseCase.execute(athleteData);
      }

      if (!response) {
        console.log("error");
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const getAthleteUserById = async (id: number) => {
    try {
      const getAthleteUserById = container.get<GetAthleteUserByIdUseCase>(
        TYPES.GetAthleteUserByIdUseCase
      );

      const response = await getAthleteUserById.execute(id);

      if (!response) {
        console.log("error");
        return;
      }

      setAthleteData({
        ...athleteData,
        athleteName: response.athleteName,
        athleteLastName: response.athleteLastName,
        email: response.email,
        phoneNumber: response.phoneNumber,
        genre: response.genre,
        birthDate: response.birthDate,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (athleteIdValue) {
      getAthleteUserById(Number(athleteIdValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    getAthleteUserById,
    athleteData,
    athleteDataError,
  };
};

export default ViewModel;
