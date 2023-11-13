import { AthleteUserList } from "@/domain/models/AthleteUserList";
import { GetAthleteUserListUseCase } from "@/domain/useCases/AthleteUser/getAthleteUserListUseCase";
import { useState } from "react";
import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { AthleteColumns } from "@/assets/constants";
import { IAthleteUserList } from "@/presentation/interfaces/IAthlete";
import { GetAthleteUserByIdUseCase } from "@/domain/useCases/AthleteUser/getAtleteUserByIdUseCase";
import { AthleteUser } from "@/domain/entities/AthleteUser";
import { useRouter } from "next/navigation";
import { DeleteAthleteUserUseCase } from "@/domain/useCases/AthleteUser/deleteAthleteUserUseCase";

const ViewModel = () => {
  const router = useRouter();

  const [athletesList, setAthletesList] = useState<IAthleteUserList>({
    totalRecords: 0,
    items: [],
  });

  const [athleteUser, setAthleteUser] = useState<AthleteUser>({
    athleteName: "",
    athleteLastName: "",
    email: "",
    phoneNumber: "",
    birthDate: "",
    genre: "",
    idGym: 0,
    gymName: "",
    registerDate: "",
    status: true,
  });

  const [openModal, setOpenModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);

  const handleSubmit = async (params: Partial<AthleteUserList>) => {
    try {
      const getAthleteUserListUseCase =
        container.get<GetAthleteUserListUseCase>(
          TYPES.GetAthleteUserListUseCase
        );

      const response = await getAthleteUserListUseCase.execute({
        numRecordsPage: 7,
        ...params,
      });

      if (!response) {
        console.log("error");
        return;
      }

      setAthletesList(response);
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

      setAthleteUser(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetNumPage = async (numPage: number) => {
    await handleSubmit({ numPage });
  };

  const handleSetTextFilter = async (textFilter: string) => {
    await handleSubmit({ textFilter, numFilter: 1 });
  };

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const handleOpenModal = async (athleteId: number) => {
    await getAthleteUserById(athleteId);
    setOpenModal(true);
  };

  const handleRedirect = (athleteId: number) => {
    router.push(`/create-user/${athleteId}`);
  };

  const handleOpenInfoModal = async (athleteId: number) => {
    await getAthleteUserById(athleteId);
    setOpenInfoModal(true);
  };

  const handleInfoModal = () => {
    setOpenInfoModal(!openInfoModal);
  };

  const deleteAthleteUser = async (athleteId: number) => {
    try {
      const deleteAthleteUserUseCase = container.get<DeleteAthleteUserUseCase>(
        TYPES.DeleteAthleteUserUseCase
      );

      const response = await deleteAthleteUserUseCase.execute(athleteId);

      if (!response) {
        console.log("error");
        return;
      }

      await handleSubmit({});
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleSetNumPage,
    handleSetTextFilter,
    handleModal,
    handleOpenModal,
    handleRedirect,
    handleOpenInfoModal,
    handleInfoModal,
    deleteAthleteUser,
    openModal,
    openInfoModal,
    athletesList,
    AthleteColumns,
    athleteUser,
  };
};

export default ViewModel;
