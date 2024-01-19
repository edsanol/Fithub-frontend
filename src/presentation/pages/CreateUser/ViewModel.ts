/* eslint-disable react-hooks/exhaustive-deps */
import {
  isNotEmpty,
  isValidEmail,
  isValidGenre,
  isValidName,
  isValidPhone,
} from "@/presentation/helpers";
import { IAthleteValidation } from "@/presentation/interfaces/IAthlete";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { RegisterAthleteUserUseCase } from "@/domain/useCases/AthleteUser/registerAthleteUserUseCase";
import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { AthleteUser } from "@/domain/entities/AthleteUser";
import { GetAthleteUserByIdUseCase } from "@/domain/useCases/AthleteUser/getAtleteUserByIdUseCase";
import { usePathname } from "next/navigation";
import { EditAthleteUserUseCase } from "@/domain/useCases/AthleteUser/editAthleteUserUseCase";
import { GetMembershipListUseCase } from "@/domain/useCases/Membership/getMembershipListUseCase";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";

const ViewModel = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const athleteId = pathname.match(/\/create-user\/(.*)/);

  const athleteIdValue = athleteId ? athleteId[1] : null;

  const [idGym, setIdGym] = useState<number>(0);
  const [gymName, setGymName] = useState<string>("");
  const [athleteData, setAthleteData] = useState<AthleteUser>({
    athleteName: "",
    athleteLastName: "",
    email: "",
    phoneNumber: "",
    genre: "",
    birthDate: "",
    registerDate: new Date().toISOString(),
    status: true,
    startDate: "",
    endDate: "",
    membershipName: "",
    cost: 0,
    membershipId: 0,
  });
  const [athleteDataError, setAthleteDataError] = useState<IAthleteValidation>({
    nameError: false,
    lastNameError: false,
    emailError: false,
    phoneNumberError: false,
    genreError: false,
    birthDateError: false,
  });
  const [membershipList, setMembershipList] = useState<PaginateResponseList>({
    totalRecords: 0,
    items: [],
  });

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

      if (idGym === 0 || gymName === "") {
        console.log("error");
        return;
      }

      let response;

      if (athleteIdValue) {
        const editAthleteUserUseCase = container.get<EditAthleteUserUseCase>(
          TYPES.EditAthleteUserUseCase
        );

        response = await editAthleteUserUseCase.execute(
          Number(athleteIdValue),
          {
            athleteName: athleteData.athleteName,
            athleteLastName: athleteData.athleteLastName,
            email: athleteData.email,
            phoneNumber: athleteData.phoneNumber,
            birthDate: athleteData.birthDate,
            genre: athleteData.genre,
            idGym,
            gymName,
            registerDate: athleteData.registerDate,
            status: athleteData.status,
            membershipId: athleteData.membershipId,
          }
        );
      } else {
        const registerAthleteUserUseCase =
          container.get<RegisterAthleteUserUseCase>(
            TYPES.RegisterAthleteUserUseCase
          );

        response = await registerAthleteUserUseCase.execute({
          athleteName: athleteData.athleteName,
          athleteLastName: athleteData.athleteLastName,
          email: athleteData.email,
          phoneNumber: athleteData.phoneNumber,
          birthDate: athleteData.birthDate,
          genre: athleteData.genre,
          idGym,
          gymName,
          registerDate: athleteData.registerDate,
          status: athleteData.status,
          membershipId: athleteData.membershipId,
        });
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
        membershipName: response.membershipName,
        membershipId: response.membershipId,
        endDate: response.endDate,
        startDate: response.startDate,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getPaginateMembershipList = async () => {
    try {
      const getMembershipListUseCase = container.get<GetMembershipListUseCase>(
        TYPES.GetMembershipListUseCase
      );

      const response = await getMembershipListUseCase.execute({
        textFilter: idGym.toString(),
      });

      if (!response) {
        console.log("error");
        return;
      }

      setMembershipList(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session && session.user.gymId !== idGym) {
      setIdGym(session.user.gymId);
      setGymName(session.user.gymName);
    }
  }, [session]);

  useEffect(() => {
    if (idGym !== 0) {
      getPaginateMembershipList();
    }
  }, [idGym]);

  useEffect(() => {
    if (athleteIdValue) {
      getAthleteUserById(Number(athleteIdValue));
    }
  }, [athleteIdValue]);

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

  const handleSetIdMembership = (event: string) => {
    setAthleteData({ ...athleteData, membershipId: Number(event) });
  };

  return {
    handleSubmit,
    handleSetName,
    handleSetLastName,
    handleSetEmail,
    handleSetPhoneNumber,
    handleSetBirthDate,
    handleSetGenre,
    handleSetIdMembership,
    getAthleteUserById,
    athleteIdValue,
    athleteData,
    athleteDataError,
    membershipList,
  };
};

export default ViewModel;
