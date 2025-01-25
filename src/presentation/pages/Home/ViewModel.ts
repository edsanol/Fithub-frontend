import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { GymUser } from "@/domain/entities/GymUser";
import { GetGymUserByIdUseCase } from "@/domain/useCases/GymUser/getGymUserByIdUseCase";
import { useEffect, useState } from "react";

const ViewModel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [gymData, setGymData] = useState<GymUser>({
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
  });

  useEffect(() => {
    loadGymUserData();
  }, []);

  const loadGymUserData = async () => {
    try {
      setIsLoading(true);

      const getGymUserByIdUseCase = container.get<GetGymUserByIdUseCase>(
        TYPES.GetGymUserByIdUseCase
      );

      const response = await getGymUserByIdUseCase.execute();

      if (!response) {
        return;
      }

      setGymData(response);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    gymData,
    isLoading,
    setGymData,
  };
};

export default ViewModel;
