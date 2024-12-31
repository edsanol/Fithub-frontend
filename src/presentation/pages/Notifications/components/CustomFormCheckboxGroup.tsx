import { CheckboxGroup } from "@nextui-org/react";
import CustomFormCheckbox from "./CustomFormCheckbox";
import { AthleteUser } from "@/domain/entities/AthleteUser";

interface CustomFormCheckboxGroupProps {
  selectedUsers: string[];
  items: AthleteUser[];
  onUserSelection: (value: string[]) => void;
}

const CustomFormCheckboxGroup = ({
  selectedUsers,
  items,
  onUserSelection,
}: CustomFormCheckboxGroupProps) => {
  return (
    <CheckboxGroup
      classNames={{ base: "w-full" }}
      value={selectedUsers}
      onChange={(value) => onUserSelection(value)}
    >
      {items.map((athlete, index) => (
        <CustomFormCheckbox
          key={index}
          user={athlete}
          value={athlete.athleteId!.toString()}
        />
      ))}
    </CheckboxGroup>
  );
};

export default CustomFormCheckboxGroup;
