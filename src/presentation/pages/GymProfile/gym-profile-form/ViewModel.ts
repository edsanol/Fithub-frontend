/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { GymUser } from "@/domain/entities/GymUser";
import { IGymDataValidation } from "@/presentation/interfaces";
import { useRouter } from "next/navigation";
import {
  isNotEmpty,
  isValidEmail,
  isValidName,
  isValidNit,
  isValidPhone,
} from "@/presentation/helpers";
import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { EditGymUserUseCase } from "@/domain/useCases/GymUser/editGymUserUseCase";
import { GetGymUserByIdUseCase } from "@/domain/useCases/GymUser/getGymUserByIdUseCase";
import { GetAccessTypesUseCase } from "@/domain/useCases/GymUser/getAccessTypesUseCase";
import { AccessTypes } from "@/domain/models/AccessTypes";

interface State {
  gymUserData: GymUser;
  gymUserDataError: IGymDataValidation;
  accessTypes: AccessTypes[];
}

type Action =
  | {
      type: "SET_FIELD";
      field: keyof GymUser;
      value: string | number | number[];
    }
  | { type: "SET_GYM_USER_DATA"; gymUserData: GymUser }
  | { type: "SET_ERROR"; errors: IGymDataValidation }
  | { type: "SET_ACCESS_TYPES"; accessTypes: AccessTypes[] };

const initialState: State = {
  gymUserData: {
    encryptedId: "",
    gymName: "",
    email: "",
    address: "",
    phoneNumber: "",
    registerDate: new Date().toISOString(),
    subscriptionPlan: "",
    comments: "",
    nit: "",
    accessTypes: [{ accessTypeID: 0, accessTypeName: "" }],
    accessTypeIds: [],
  },
  gymUserDataError: {
    gymNameError: false,
    emailError: false,
    addressError: false,
    phoneNumberError: false,
    nitError: false,
    accessTypeIdsError: false,
  },
  accessTypes: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        gymUserData: {
          ...state.gymUserData,
          [action.field]: action.value,
        },
      };
    case "SET_GYM_USER_DATA":
      return {
        ...state,
        gymUserData: {
          ...action.gymUserData,
          accessTypeIds: action.gymUserData.accessTypes!.map(
            (type) => type.accessTypeID
          ),
        },
      };
    case "SET_ERROR":
      return {
        ...state,
        gymUserDataError: action.errors,
      };
    case "SET_ACCESS_TYPES":
      return {
        ...state,
        accessTypes: action.accessTypes,
      };
    default:
      return state;
  }
}

const ViewModel = () => {
  const { data: session } = useSession();
  const [{ gymUserData, gymUserDataError, accessTypes }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);
  const [idGym, setIdGym] = useState<number>(0);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");
  const [toogleModal, setToogleModal] = useState(false);
  const [encryptedId, setEncryptedId] = useState("");
  const qrRef = useRef<HTMLDivElement | null>(null);

  const handleDownloadQR = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      if (canvas) {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "qrcode.png";
        link.click();
      }
    }
  };

  const handleShareQR = async () => {
    if (navigator.share) {
      const canvas = qrRef.current?.querySelector("canvas");
      if (canvas) {
        const blob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob((blob) => resolve(blob), "image/png");
        });

        if (blob) {
          const file = new File([blob], "qrcode.png", { type: "image/png" });
          try {
            await navigator.share({
              title: "Código QR",
              text: "¡Escanea este código QR para registrarse en nuestro sitio web!",
              files: [file],
            });
          } catch (err) {
            console.error("Error al compartir:", err);
          }
        }
      }
    } else {
      alert("La API de compartir no está soportada en este navegador.");
    }
  };

  useEffect(() => {
    if (session && session.user.gymId !== idGym) {
      setIdGym(session.user.gymId);
      setEncryptedId(session.user.encryptedId);
    }
  }, [session]);

  useEffect(() => {
    loadGymUserData();
  }, []);

  useEffect(() => {
    getAccessTypes();
  }, []);

  const formattedAccessTypes = useMemo(() => {
    return new Set(gymUserData.accessTypeIds?.map((id) => id.toString()));
  }, [gymUserData.accessTypeIds]);

  const loadGymUserData = async () => {
    try {
      const getGymUserByIdUseCase = container.get<GetGymUserByIdUseCase>(
        TYPES.GetGymUserByIdUseCase
      );

      const response = await getGymUserByIdUseCase.execute();

      if (!response) {
        setError("Error");
        console.log("error");
        return;
      }

      dispatch({ type: "SET_GYM_USER_DATA", gymUserData: response });
    } catch (error: any) {
      console.log(error);
      setErrorModal(true);
      setErrorMessage(error.response.data.message);
    }
  };

  const getAccessTypes = async () => {
    try {
      const getAccessTypesUseCase = container.get<GetAccessTypesUseCase>(
        TYPES.GetAccessTypesUseCase
      );

      const response = await getAccessTypesUseCase.execute();

      if (!response) {
        setError("Error al obtener los tipos de acceso");
        return;
      }

      dispatch({ type: "SET_ACCESS_TYPES", accessTypes: response });
    } catch (error) {
      console.log(error);
    }
  };

  const handleIsValidForm = async () => {
    const errors: IGymDataValidation = {
      emailError: !isValidEmail(gymUserData.email),
      gymNameError: !isValidName(gymUserData.gymName),
      phoneNumberError: !isValidPhone(gymUserData.phoneNumber),
      nitError: !isValidNit(gymUserData.nit),
      addressError: !isNotEmpty(gymUserData.address),
      accessTypeIdsError: gymUserData.accessTypeIds!.length === 0,
    };

    dispatch({ type: "SET_ERROR", errors });
    return errors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const errors = await handleIsValidForm();

      if (Object.values(errors).some(Boolean)) {
        return;
      }

      if (idGym === 0) {
        setError("Error");
        console.log("error");
        return;
      }

      const { accessTypes, ...data } = gymUserData;

      const editGymUserUseCase = container.get<EditGymUserUseCase>(
        TYPES.EditGymUserUseCase
      );

      const response = await editGymUserUseCase.execute(data);

      if (!response) {
        setError("Error");
        console.log("error");
        return;
      }

      router.push("/dashboard");
    } catch (error: any) {
      console.log(error);
      setErrorModal(true);
      setErrorMessage(error.response.data.message);
    }
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const setField = (
    field: keyof GymUser,
    value: string | number | number[]
  ) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  const setFieldAccessTypes = (value: string | number | number[]) => {
    dispatch({ type: "SET_FIELD", field: "accessTypeIds", value });
  };

  return {
    handleSubmit,
    setField,
    handleClick,
    setErrorModal,
    setFieldAccessTypes,
    setToogleModal,
    handleDownloadQR,
    handleShareQR,
    idGym,
    encryptedId,
    qrRef,
    toogleModal,
    isClicked,
    gymUserData,
    gymUserDataError,
    errorModal,
    errorMessage,
    error,
    accessTypes,
    formattedAccessTypes,
  };
};

export default ViewModel;
