import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import { GetMembershipListUseCase } from "@/domain/useCases/Membership/getMembershipListUseCase";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const ViewModel = () => {
  const { data: session } = useSession();

  const [idGym, setIdGym] = useState<number>(0);

  const [membershipList, setMembershipList] = useState<PaginateResponseList>({
    totalRecords: 0,
    items: [],
  });

  const [isModalOpen, setIsModalOpen] = useState({
    createModal: false,
    detailsModal: false,
    deleteModal: false,
    editModal: false,
  });

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

  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">(
    "create"
  );

  const toggleModal = (
    modalName: "createModal" | "detailsModal" | "deleteModal" | "editModal"
  ) => {
    setIsModalOpen((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  const handleOpenModal = async (
    modalName: "createModal" | "detailsModal" | "deleteModal" | "editModal",
    id?: number
  ) => {
    toggleModal(modalName);
  };

  return {
    isModalOpen,
    modalMode,
    membershipList,
    toggleModal,
    handleOpenModal,
  };
};

export default ViewModel;
