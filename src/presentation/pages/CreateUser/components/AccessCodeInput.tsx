import { AthleteUser } from "@/domain/entities/AthleteUser";
import { FormInput } from "@/presentation/components";
import { IAthleteValidation } from "@/presentation/interfaces/Athlete/IAthlete";

interface AccessCodeInputProps {
  athleteDataError: IAthleteValidation;
  athleteData: AthleteUser;
  handleSetCardAccessCode: (value: string) => void;
}

const AccessCodeInput = ({
  athleteDataError,
  athleteData,
  handleSetCardAccessCode,
}: AccessCodeInputProps) => {
  return (
    <FormInput
      isRequired
      isInvalid={athleteDataError?.cardAccessCodeError}
      color={athleteDataError?.cardAccessCodeError ? "danger" : "default"}
      errorMessage={
        athleteDataError?.cardAccessCodeError
          ? "Por favor ingresa un código de acceso válido"
          : ""
      }
      type="text"
      label="Código de acceso"
      size="lg"
      classNames={{ base: "dark" }}
      customInputClass="mt-5"
      onChange={(value) => handleSetCardAccessCode(value)}
      value={athleteData?.cardAccessCode}
    />
  );
};

export default AccessCodeInput;
