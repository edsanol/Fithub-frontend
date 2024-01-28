/* eslint-disable react-hooks/exhaustive-deps */
import { AthleteColumns } from "@/assets/constants";
import { AthleteUser } from "@/domain/entities/AthleteUser";
import { DeleteAthleteUserUseCase } from "@/domain/useCases/AthleteUser/deleteAthleteUserUseCase";
import { GetAthleteUserByIdUseCase } from "@/domain/useCases/AthleteUser/getAtleteUserByIdUseCase";
import { GetAthleteUserListUseCase } from "@/domain/useCases/AthleteUser/getAthleteUserListUseCase";
import { GetMembershipByGymIdUseCase } from "@/domain/useCases/Membership/getMembershipByGymIdUseCase";
import { MembershipByGymId } from "@/domain/models/MembershipByGymId";
import { PaginateData } from "@/domain/models/PaginateData";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import { TYPES } from "@/config/types";
import { UpdateMembershipToAthlete } from "@/domain/models/UpdateMembershipToAthlete";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import container from "@/config/inversifyContainer";
import { UpdateMembershipToAthleteUseCase } from "@/domain/useCases/AthleteUser/updateMembershipToAthlete";

const ViewModel = () => {
  const { data: session } = useSession();
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

  const [updateMembershipToAthlete, setUpdateMembershipToAthlete] =
    useState<UpdateMembershipToAthlete>({
      athleteId: 0,
      membershipId: 0,
    });

  const [membership, setMembership] = useState<MembershipByGymId[]>([]);
  const [idGym, setIdGym] = useState<number>(0);

  const [isModalOpen, setIsModalOpen] = useState({
    detailsModal: false,
    deleteModal: false,
    editMembershipModal: false,
  });

  useEffect(() => {
    if (session && session.user.gymId !== idGym) {
      setIdGym(session.user.gymId);
    }
  }, [session]);

  useEffect(() => {
    if (idGym !== 0) {
      getMembershipByGymId();
    }
  }, [idGym]);

  const handleSubmit = async (params: Partial<PaginateData>) => {
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
      athleteUser.stateAthlete = "Inactivo";
      return;
    }

    const startDate = new Date(athleteUser.startDate);
    const endDate = new Date(athleteUser.endDate);

    if (startDate > endDate) {
      athleteUser.stateAthlete = "Inactivo";
    }

    athleteUser.stateAthlete = "Activo";
  };

  const updateMembership = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const updateMembership = container.get<UpdateMembershipToAthleteUseCase>(
        TYPES.UpdateMembershipToAthleteUseCase
      );

      const response = await updateMembership.execute(
        updateMembershipToAthlete
      );

      if (!response) {
        console.log("error");
        return;
      }

      await handleSubmit({});

      setIsModalOpen({
        detailsModal: false,
        deleteModal: false,
        editMembershipModal: false,
      });
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

  const deleteAthleteUser = async (athleteId: number) => {
    try {
      const deleteAthleteUserUseCase = container.get<DeleteAthleteUserUseCase>(
        TYPES.DeleteAthleteUserUseCase
      );

      const response = await deleteAthleteUserUseCase.execute(athleteId);

      setIsModalOpen({
        detailsModal: false,
        deleteModal: false,
        editMembershipModal: false,
      });

      if (!response) {
        console.log("error");
        return;
      }

      await handleSubmit({});
    } catch (error) {
      console.log(error);
    }
  };

  const getMembershipByGymId = async () => {
    try {
      const GetMembershipByGymId = container.get<GetMembershipByGymIdUseCase>(
        TYPES.GetMembershipByGymIdUseCase
      );

      const response = await GetMembershipByGymId.execute(idGym);

      if (!response) {
        console.log("error");
        return;
      }

      setMembership(response);
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

  const handleRedirect = (athleteId: number) => {
    router.push(`/create-user/${athleteId}`);
  };

  const handleSetIdMembership = (event: string) => {
    setUpdateMembershipToAthlete({
      ...updateMembershipToAthlete,
      membershipId: Number(event),
    });
  };

  const handleSetIdAthlete = (event: number) => {
    setUpdateMembershipToAthlete({
      ...updateMembershipToAthlete,
      athleteId: event,
    });
  };

  const toggleModal = (
    modalName: "detailsModal" | "deleteModal" | "editMembershipModal"
  ) => {
    setIsModalOpen((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  const handleOpenModal = async (
    athleteId: number,
    modalName: "detailsModal" | "deleteModal" | "editMembershipModal"
  ) => {
    await getAthleteUserById(athleteId);
    toggleModal(modalName);

    if (modalName === "editMembershipModal") {
      handleSetIdAthlete(athleteId);
    }
  };

  return {
    AthleteColumns,
    athletesList,
    athleteUser,
    isModalOpen,
    membership,
    deleteAthleteUser,
    handleOpenModal,
    handleRedirect,
    handleSetIdMembership,
    handleSetNumPage,
    handleSetTextFilter,
    toggleModal,
    updateMembership,
  };
};

export default ViewModel;
