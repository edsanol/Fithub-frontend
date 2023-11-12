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

  const handleModal = async () => {
    setOpenModal(!openModal);
  };

  const handleOpenModal = async (athleteId: number) => {
    await getAthleteUserById(athleteId);
    setOpenModal(true);
  };

  const handleRedirect = (athleteId: number) => {
    router.push(`/create-user/${athleteId}`);
  };

  return {
    handleSetNumPage,
    handleSetTextFilter,
    handleModal,
    handleOpenModal,
    handleRedirect,
    openModal,
    athletesList,
    AthleteColumns,
    athleteUser,
  };
};

export default ViewModel;
