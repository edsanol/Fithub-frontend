import { AthleteUser } from "@/domain/entities/AthleteUser";
import { Checkbox, Link, User, cn } from "@nextui-org/react";

interface CustomFormCheckboxProps {
  user: AthleteUser;
  value: string;
}

const CustomFormCheckbox = ({ user, value }: CustomFormCheckboxProps) => {
  return (
    <Checkbox
      aria-label={user.athleteName}
      classNames={{
        base: cn(
          "inline-flex max-w-md w-full bg-content1 m-0",
          "hover:bg-content1 items-center justify-start",
          "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary"
        ),
        label: "w-full",
      }}
      value={value}
      className="bg-content2 mx-auto"
    >
      <div className="w-full flex flex-col md:flex-row md:justify-between gap-2 items-start">
        <User
          avatarProps={{ size: "md" }}
          description={
            <Link isExternal size="sm">
              {user.email}
            </Link>
          }
          name={user.athleteName}
        />
        <div className="flex flex-col items-end gap-1">
          <span className="text-tiny text-default-500">
            {user.membershipName || "Inactivo"}
          </span>
        </div>
      </div>
    </Checkbox>
  );
};

export default CustomFormCheckbox;
