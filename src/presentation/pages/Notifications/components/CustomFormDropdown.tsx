import styles from "./styles.module.css";
import { FormDropdown } from "@/presentation/components";
import { DropdownItem, User } from "@nextui-org/react";

interface CustomFormDropdownProps {
  athletes: { athleteId: number; athleteName: string }[];
}

const CustomFormDropdown = ({ athletes }: CustomFormDropdownProps) => {
  return (
    <FormDropdown
      dropdownMenuClassName={styles.customDropdownMenu}
      trigger={
        <div className="cursor-pointer w-auto h-auto p-1 rounded-md absolute right-0">
          <User avatarProps={{ size: "sm" }} name={athletes.length} />
        </div>
      }
      content={athletes.map((athlete, index) => (
        <DropdownItem key={index}>
          <User avatarProps={{ size: "sm" }} name={athlete.athleteName} />
        </DropdownItem>
      ))}
    />
  );
};

export default CustomFormDropdown;
