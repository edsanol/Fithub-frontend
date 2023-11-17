import { useState } from "react";
import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { AthleteColumns } from "@/assets/constants";
import { useRouter } from "next/navigation";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import { Membership } from "@/domain/entities/Membership";
import { IMembershipValidation } from "@/presentation/interfaces/IMembership";
import { isNotEmpty, isValidName, isValidNumber } from "@/presentation/helpers";
import { RegisterMembershipUseCase } from "@/domain/useCases/Membership/registerMembershipUseCase";
import { useSession } from "next-auth/react";
import { GetMembershipListUseCase } from "@/domain/useCases/Membership/getMembershipListUseCase";
import { MembershipColumns } from "@/assets/constants";
import { useEffect } from "react";

const ViewModel = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [idGym, setIdGym] = useState<number>(0);

  const [membershipList, setMembershipList] = useState<PaginateResponseList>({
    totalRecords: 0,
    items: [],
  });

  const [membership, setMembership] = useState<Membership>({
    membershipName: "",
    cost: 0,
    durationInDays: 0,
    description: "",
  });

  const [membershipError, setMembershipError] = useState<IMembershipValidation>(
    {
      membershipNameError: false,
      costError: false,
      durationInDaysError: false,
      descriptionError: false,
    }
  );

  const [isModalOpen, setIsModalOpen] = useState({
    createModal: false,
    detailsModal: false,
    deleteModal: false,
    editModal: false,
  });

  const handleIsValidForm = () => {
    const errors: IMembershipValidation = {
      membershipNameError: !isValidName(membership.membershipName),
      costError: !isValidNumber(membership.cost.toString()),
      durationInDaysError: !isValidNumber(membership.durationInDays.toString()),
      descriptionError: !isNotEmpty(membership.description),
    };

    setMembershipError(errors);

    return Promise.resolve(errors);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const errors = await handleIsValidForm();

      if (Object.values(errors).some(Boolean)) {
        return;
      }

      if (idGym === 0) {
        console.log("error");
        return;
      }

      const registerMembershipUseCase =
        container.get<RegisterMembershipUseCase>(
          TYPES.RegisterMembershipUseCase
        );

      const response = await registerMembershipUseCase.execute({
        ...membership,
        idGym,
      });

      if (!response) {
        console.log("error");
        return;
      }

      setIsModalOpen({
        createModal: false,
        detailsModal: false,
        deleteModal: false,
        editModal: false,
      });

      await getPaginateMembershipList();
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
        numRecordsPage: 7,
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
    }
  }, [session]);

  useEffect(() => {
    if (idGym !== 0) {
      getPaginateMembershipList();
    }
  }, [idGym]);

  const toggleModal = (
    modalName: "createModal" | "detailsModal" | "deleteModal" | "editModal"
  ) => {
    setIsModalOpen((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  const handleOpenModal = async (
    athleteId: number,
    modalName: "createModal" | "detailsModal" | "deleteModal" | "editModal"
  ) => {
    toggleModal(modalName);
  };

  const handleSetMembershipName = (event: string) => {
    setMembership({ ...membership, membershipName: event });
  };

  const handleSetCost = (event: string) => {
    setMembership({ ...membership, cost: Number(event) });
  };

  const handleSetDurationInDays = (event: string) => {
    setMembership({ ...membership, durationInDays: Number(event) });
  };

  const handleSetDescription = (event: string) => {
    setMembership({ ...membership, description: event });
  };

  return {
    handleSubmit,
    handleSetMembershipName,
    handleSetCost,
    handleSetDurationInDays,
    handleSetDescription,
    handleOpenModal,
    toggleModal,
    MembershipColumns,
    membershipError,
    membershipList,
    AthleteColumns,
    isModalOpen,
  };
};

export default ViewModel;
