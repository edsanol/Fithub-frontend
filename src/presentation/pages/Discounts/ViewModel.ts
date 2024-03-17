import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { Discounts } from "@/domain/entities/Discounts";
import { PaginateResponseList } from "@/domain/models/PaginateResponseList";
import { GetDiscountsListUseCase } from "@/domain/useCases/Discounts/getDiscountsList";
import { RegisterDiscountUseCase } from "@/domain/useCases/Discounts/registerDiscounts";
import { GetMembershipListUseCase } from "@/domain/useCases/Membership/getMembershipListUseCase";
import { isNotEmpty, isValidNumber } from "@/presentation/helpers";
import { IDiscountValidation } from "@/presentation/interfaces";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { DiscountsColumns } from "@/assets/constants";
import { GetDiscountByIdUseCase } from "@/domain/useCases/Discounts/getDiscountById";
import { EditDiscountUseCase } from "@/domain/useCases/Discounts/editDiscount";
import { DeleteDiscountUseCase } from "@/domain/useCases/Discounts/deleteDiscount";

const ViewModel = () => {
  const { data: session } = useSession();

  const [idGym, setIdGym] = useState<number>(0);

  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">(
    "create"
  );

  const [membershipList, setMembershipList] = useState<PaginateResponseList>({
    totalRecords: 0,
    items: [],
  });

  const [discountsList, setDiscountsList] = useState<PaginateResponseList>({
    totalRecords: 0,
    items: [],
  });

  const [discount, setDiscount] = useState<Discounts>({
    discountId: 0,
    discountPercentage: 0,
    startDate: "",
    endDate: "",
    idMembership: 0,
    comments: "",
  });

  const [discountError, setDiscountError] = useState<IDiscountValidation>({
    discountPercentageError: false,
    startDateError: false,
    endDateError: false,
    idMembershipError: false,
    commentsError: false,
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
      getPaginateDiscountList();
    }
  }, [idGym]);

  const handleIsValidForm = () => {
    const errors: IDiscountValidation = {
      discountPercentageError: !isValidNumber(
        discount.discountPercentage.toString()
      ),
      startDateError: !isNotEmpty(discount.startDate),
      endDateError: !isNotEmpty(discount.endDate),
      idMembershipError: !isNotEmpty(discount.idMembership!.toString()),
      commentsError: !isNotEmpty(discount.comments),
    };

    setDiscountError(errors);

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

      let response;

      if (modalMode === "edit") {
        const editDiscountUseCase = container.get<EditDiscountUseCase>(
          TYPES.EditDiscountUseCase
        );

        response = await editDiscountUseCase.execute(discount.discountId!, {
          ...discount,
          idGym,
          status: true,
        });
      } else {
        const registerDiscount = container.get<RegisterDiscountUseCase>(
          TYPES.RegisterDiscountUseCase
        );

        response = await registerDiscount.execute({
          ...discount,
          idGym,
        });
      }

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

      await getPaginateDiscountList();
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

  const getPaginateDiscountList = async () => {
    try {
      const getDiscontsListUseCase = container.get<GetDiscountsListUseCase>(
        TYPES.GetDiscountsListUseCase
      );

      const response = await getDiscontsListUseCase.execute({
        textFilter: idGym.toString(),
        numRecordsPage: 7,
      });

      if (!response) {
        console.log("error");
        return;
      }

      setDiscountsList(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getDiscountById = async (id: number) => {
    try {
      const getDiscountByIdUseCase = container.get<GetDiscountByIdUseCase>(
        TYPES.GetDiscountByIdUseCase
      );

      const response = await getDiscountByIdUseCase.execute(id);

      if (!response) {
        console.log("error");
        return;
      }

      setDiscount(response);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDiscount = async (id: number) => {
    try {
      const deleteDiscountUseCase = container.get<DeleteDiscountUseCase>(
        TYPES.DeleteDiscountUseCase
      );

      const response = await deleteDiscountUseCase.execute(id);

      if (!response) {
        console.log("error");
        return;
      }

      await getPaginateDiscountList();
    } catch (error) {
      console.log(error);
    }
  };

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
    switch (modalName) {
      case "editModal":
        await getDiscountById(id!);
        setModalMode("edit");
        break;
      case "createModal":
        setDiscount({
          discountId: 0,
          discountPercentage: 0,
          startDate: "",
          endDate: "",
          idMembership: 0,
          comments: "",
        });
        setModalMode("create");
        break;
      case "detailsModal":
        await getDiscountById(id!);
        setModalMode("view");
        break;
      case "deleteModal":
        await getDiscountById(id!);
        break;
    }

    toggleModal(modalName);
  };

  const handleSetDiscountPercentage = (event: string) => {
    setDiscount({ ...discount, discountPercentage: Number(event) });
  };

  const handleSetStartDate = (event: string) => {
    const startDate = new Date(event).toISOString();
    setDiscount({ ...discount, startDate: startDate });
  };

  const handleSetEndDate = (event: string) => {
    const endDate = new Date(event).toISOString();
    setDiscount({ ...discount, endDate: endDate });
  };

  const handleSetIdMembership = (event: string) => {
    setDiscount({ ...discount, idMembership: Number(event) });
  };

  const handleSetComments = (event: string) => {
    setDiscount({ ...discount, comments: event });
  };

  return {
    handleSubmit,
    deleteDiscount,
    handleSetDiscountPercentage,
    handleSetStartDate,
    handleSetEndDate,
    handleSetIdMembership,
    handleSetComments,
    toggleModal,
    handleOpenModal,
    discount,
    DiscountsColumns,
    discountsList,
    discountError,
    isModalOpen,
    modalMode,
    membershipList,
  };
};

export default ViewModel;
