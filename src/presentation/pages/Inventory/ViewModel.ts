import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { Category } from "@/domain/entities/Category";
import { Product } from "@/domain/entities/Product";
import { GetCategoriesUseCase } from "@/domain/useCases/Category/getCategoriesUseCase";
import { RegisterCategoryUseCase } from "@/domain/useCases/Category/registerCategoryUseCase";
import { RegisterProductUseCase } from "@/domain/useCases/Product/registerProductUseCase";
import { useSkuGenerate } from "@/hooks/useSkuGenerate";
import { isNotEmpty, isValidName, isValidSku } from "@/presentation/helpers";
import {
  ICategoryValidation,
  IProductValidation,
} from "@/presentation/interfaces";
import { useEffect, useReducer, useState } from "react";
import { useSession } from "next-auth/react";

interface State {
  category: Category;
  categoryList: Category[];
  categoryError: ICategoryValidation;
  product: Product;
  productError: IProductValidation;
  isModalOpen: {
    createModal: boolean;
    detailsModal: boolean;
    deleteModal: boolean;
    editModal: boolean;
    infoModal: boolean;
    categoryModal: boolean;
  };
  modalMode: "create" | "edit" | "view";
}

type Value = string | boolean | number;

type Action =
  | { type: "SET_FIELD_CATEGORY"; field: keyof Category; value: Value }
  | { type: "SET_CATEGORY"; category: Category }
  | { type: "SET_CATEGORY_LIST"; categoryList: Category[] }
  | { type: "SET_CATEGORY_ERROR"; categoryError: ICategoryValidation }
  | { type: "SET_FIELD"; field: keyof Product; value: Value }
  | { type: "SET_PRODUCT"; product: Product }
  | { type: "SET_PRODUCT_ERROR"; productError: IProductValidation }
  | { type: "TOGGLE_MODAL"; modalName: string; value?: boolean }
  | { type: "SET_MODAL_MODE"; modalMode: "create" | "edit" | "view" };

const initialState: State = {
  category: {
    categoryId: 0,
    categoryName: "",
  },
  categoryList: [],
  categoryError: {
    categoryNameError: false,
  },
  product: {
    name: "",
    description: "",
    idCategory: 0,
    basePrice: 0,
    idGym: 0,
    sku: "",
    price: 0,
    stockQuantity: 0,
    productId: 0,
    categoryId: 0,
    categoryName: "",
  },
  productError: {
    nameError: false,
    descriptionError: false,
    basePriceError: false,
    skuError: false,
    priceError: false,
    stockQuantityError: false,
    idCategoryError: false,
  },
  isModalOpen: {
    createModal: false,
    detailsModal: false,
    deleteModal: false,
    editModal: false,
    infoModal: false,
    categoryModal: false,
  },
  modalMode: "create",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_FIELD_CATEGORY":
      return {
        ...state,
        category: {
          ...state.category,
          [action.field]: action.value,
        },
      };
    case "SET_CATEGORY":
      return {
        ...state,
        category: action.category,
      };
    case "SET_CATEGORY_LIST":
      return {
        ...state,
        categoryList: action.categoryList,
      };
    case "SET_CATEGORY_ERROR":
      return {
        ...state,
        categoryError: action.categoryError,
      };
    case "SET_FIELD":
      return {
        ...state,
        product: {
          ...state.product,
          [action.field]: action.value,
        },
      };
    case "SET_PRODUCT":
      return {
        ...state,
        product: action.product,
      };
    case "SET_PRODUCT_ERROR":
      return {
        ...state,
        productError: action.productError,
      };
    case "TOGGLE_MODAL":
      return {
        ...state,
        isModalOpen: {
          ...state.isModalOpen,
          [action.modalName]:
            action.value ??
            !state.isModalOpen[action.modalName as keyof State["isModalOpen"]],
        },
      };
    case "SET_MODAL_MODE":
      return {
        ...state,
        modalMode: action.modalMode,
      };
    default:
      return state;
  }
}

const ViewModel = () => {
  const [
    {
      isModalOpen,
      modalMode,
      category,
      categoryError,
      categoryList,
      product,
      productError,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const { data: session } = useSession();
  const generatedSku = useSkuGenerate();

  const [idGym, setIdGym] = useState<number>(0);
  const [selectedCheckbox, setSelectedCheckbox] = useState<boolean>(false);

  useEffect(() => {
    if (session && session.user.gymId !== idGym) {
      setIdGym(session.user.gymId);
    }
  }, [session]);

  useEffect(() => {
    getCategoriesList();
  }, []);

  useEffect(() => {
    if (selectedCheckbox) {
      handleGenerateSku();
    } else {
      dispatch({
        type: "SET_PRODUCT",
        product: { ...product, sku: "" },
      });

      setField("sku", "");
    }
  }, [selectedCheckbox]);

  const handleIsValidCategoryForm = () => {
    const errors: ICategoryValidation = {
      categoryNameError: !isValidName(category.categoryName),
    };

    dispatch({ type: "SET_CATEGORY_ERROR", categoryError: errors });
    return errors;
  };

  const handleIsValidForm = () => {
    const errors: IProductValidation = {
      nameError: !isNotEmpty(product.name),
      descriptionError: !isNotEmpty(product.description),
      basePriceError: product.basePrice <= 0,
      priceError: product.price <= 0,
      stockQuantityError: product.stockQuantity <= 0,
      skuError: !isValidSku(product.sku),
      idCategoryError: String(product.idCategory) === "default",
    };

    dispatch({ type: "SET_PRODUCT_ERROR", productError: errors });
    return errors;
  };

  const handleRegisterCategory = async () => {
    try {
      const errors = handleIsValidCategoryForm();

      if (Object.values(errors).some(Boolean)) {
        return;
      }

      const registerCategoryUseCase = container.get<RegisterCategoryUseCase>(
        TYPES.RegisterCategoryUseCase
      );

      const response = await registerCategoryUseCase.execute({
        categoryName: category.categoryName,
      });

      if (!response) {
        console.log("error");
        return;
      }

      toggleModal("categoryModal", false);

      const updatedCategoryList = await getCategoriesList();

      if (!updatedCategoryList) {
        console.log("error al obtener la lista de categorías");
        return;
      }

      const recentlyAddedCategory = updatedCategoryList.find(
        (categoryItem) =>
          categoryItem.categoryName.toLowerCase().trim() ===
          category.categoryName.toLowerCase().trim()
      );

      if (recentlyAddedCategory) {
        dispatch({
          type: "SET_PRODUCT",
          product: {
            ...product,
            idCategory: recentlyAddedCategory.categoryId!,
          },
        });

        setField("idCategory", recentlyAddedCategory.categoryId!);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const errors = handleIsValidForm();

      if (Object.values(errors).some(Boolean)) {
        return;
      }

      if (idGym === 0) {
        console.log("error");
        return;
      }

      const registerProductUseCase = container.get<RegisterProductUseCase>(
        TYPES.RegisterProductUseCase
      );

      const response = await registerProductUseCase.execute({
        name: product.name,
        description: product.description,
        idCategory: Number(product.idCategory),
        basePrice: Number(product.basePrice),
        idGym: idGym,
        sku: product.sku,
        price: Number(product.price),
        stockQuantity: Number(product.stockQuantity),
      });

      if (!response) {
        console.log("error");
        return;
      }

      toggleModal("createModal", false);
    } catch (error: any) {
      console.log(error);
    }
  };

  const getCategoriesList = async () => {
    try {
      const getCategoriesUseCase = container.get<GetCategoriesUseCase>(
        TYPES.GetCategoriesUseCase
      );

      const response = await getCategoriesUseCase.execute();

      if (!response) {
        console.log("error");
        return;
      }

      dispatch({ type: "SET_CATEGORY_LIST", categoryList: response });

      return response;
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleGenerateSku = () => {
    dispatch({
      type: "SET_PRODUCT",
      product: { ...product, sku: generatedSku },
    });

    setField("sku", generatedSku);
  };

  const handleSkuChange = (value: string) => {
    if (!selectedCheckbox) {
      const uppercasedValue = value.toUpperCase();
      setField("sku", uppercasedValue);
      dispatch({
        type: "SET_PRODUCT",
        product: { ...product, sku: uppercasedValue },
      });
    }
  };

  const handleCheckboxChange = () => {
    setSelectedCheckbox(!selectedCheckbox);
  };

  const toggleModal = (modalName: string, value?: boolean) => {
    dispatch({ type: "TOGGLE_MODAL", modalName, value });
  };

  const setModalMode = (modalMode: "create" | "edit" | "view") => {
    dispatch({ type: "SET_MODAL_MODE", modalMode });
  };

  const handleOpenModal = async (modalName: string) => {
    switch (modalName) {
      case "editModal":
        setModalMode("edit");
        break;
      case "createModal":
        dispatch({ type: "SET_PRODUCT", product: initialState.product });
        setSelectedCheckbox(false);
        setModalMode("create");
        break;
      case "detailsModal":
        setModalMode("view");
        break;
      case "deleteModal":
        break;
    }

    toggleModal(modalName);
  };

  const setFieldCategory = (field: keyof Category, value: Value) => {
    dispatch({ type: "SET_FIELD_CATEGORY", field, value });
  };

  const setField = (field: keyof Product, value: Value) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  return {
    isModalOpen,
    categoryList,
    categoryError,
    product,
    productError,
    selectedCheckbox,
    handleSkuChange,
    handleCheckboxChange,
    handleSubmit,
    setField,
    setFieldCategory,
    handleRegisterCategory,
    handleOpenModal,
    toggleModal,
  };
};

export default ViewModel;
