import { PaginateData } from "@/domain/models/PaginateData";
import { GetAthleteUserListUseCase } from "@/domain/useCases/AthleteUser/getAthleteUserListUseCase";
import { useState } from "react";
import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { AthleteColumns } from "@/assets/constants";
import { GetAthleteUserByIdUseCase } from "@/domain/useCases/AthleteUser/getAtleteUserByIdUseCase";
import { useRouter } from "next/navigation";
import { DeleteAthleteUserUseCase } from "@/domain/useCases/AthleteUser/deleteAthleteUserUseCase";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import { AthleteUser } from "@/domain/entities/AthleteUser";

const ViewModel = () => {
  const router = useRouter();

  const [athletesList, setAthletesList] = useState<PaginateResponseList>({
    totalRecords: 0,
    items: [],
  });

  const [athleteUser, setAthleteUser] = useState<AthleteUser>({
    athleteId: 0,
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
    membershipName: "",
  });

  const [isModalOpen, setIsModalOpen] = useState({
    detailsModal: false,
    deleteModal: false,
  });

  const handleSubmit = async (params: Partial<PaginateData>, token: string) => {
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

      response.items.map((athlete) => {
        mapperAthleteUser(athlete);
      });

      setAthletesList(response);
    } catch (error) {
      console.log(error);
    }
  };

  const mapperAthleteUser = (athleteUser: AthleteUser) => {
    if (!athleteUser.startDate || !athleteUser.endDate) {
      return;
    }

    const startDate = new Date(athleteUser.startDate);
    const endDate = new Date(athleteUser.endDate);

    if (startDate > endDate) {
      athleteUser.stateAthlete = "Inactivo";
    }

    athleteUser.stateAthlete = "Activo";
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

  const deleteAthleteUser = async (athleteId: number) => {
    try {
      const deleteAthleteUserUseCase = container.get<DeleteAthleteUserUseCase>(
        TYPES.DeleteAthleteUserUseCase
      );

      const response = await deleteAthleteUserUseCase.execute(athleteId);

      setIsModalOpen({ detailsModal: false, deleteModal: false });

      if (!response) {
        console.log("error");
        return;
      }

      await handleSubmit({}, "");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetNumPage = async (numPage: number, token: string) => {
    await handleSubmit({ numPage }, token);
  };

  const handleSetTextFilter = async (textFilter: string, token: string) => {
    await handleSubmit({ textFilter, numFilter: 1 }, token);
  };

  const handleRedirect = (athleteId: number) => {
    router.push(`/create-user/${athleteId}`);
  };

  const toggleModal = (modalName: "detailsModal" | "deleteModal") => {
    setIsModalOpen((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  const handleOpenModal = async (
    athleteId: number,
    modalName: "detailsModal" | "deleteModal"
  ) => {
    await getAthleteUserById(athleteId);
    toggleModal(modalName);
  };

  return {
    handleSetNumPage,
    handleSetTextFilter,
    handleOpenModal,
    handleRedirect,
    deleteAthleteUser,
    toggleModal,
    athletesList,
    AthleteColumns,
    athleteUser,
    isModalOpen,
  };
};

export default ViewModel;
