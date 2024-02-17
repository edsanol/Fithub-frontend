import { Input } from "@nextui-org/react";
import { SearchIcon } from "./SearchIconV2";

interface PersonasInterface {
  id: number;
  nombre: string;
}

interface FormSearchInputProps {
  label: string;
  placeholder: string;
  suggestions: PersonasInterface[];
  showSuggestions: boolean;
  value?: string;
  onChange: (event: string) => void;
  onSelectSuggestion: (user: string) => void;
}

const FormSearchInput = ({
  label,
  placeholder,
  suggestions,
  showSuggestions,
  value,
  onChange,
  onSelectSuggestion,
}: FormSearchInputProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleSelectSuggestion = (userSelected: string) => {
    onSelectSuggestion(userSelected);
  };

  return (
    <>
      <div className="w-full">
        <Input
          label={label}
          value={value || ""}
          onChange={handleInputChange}
          radius="lg"
          classNames={{
            base: "dark",
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "shadow-xl",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focused=true]:bg-default-200/50",
              "dark:group-data-[focused=true]:bg-default/60",
              "!cursor-text",
            ],
          }}
          placeholder={placeholder}
          startContent={
            <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
        />

        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-10 w-[90%] bg-[#18181B] shadow-lg rounded-lg max-h-60 overflow-auto md:w-[95%]">
            {suggestions.map((record) => (
              <li
                key={record.id}
                className="p-2 hover:bg-[#2A2E30] cursor-pointer"
                onMouseDown={() => {
                  handleSelectSuggestion(record.nombre);
                }}
              >
                {record.nombre}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default FormSearchInput;
