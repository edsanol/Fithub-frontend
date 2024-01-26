interface IDashboardHeaderProps {
  title: string;
  description: string;
  customClassName?: string;
}

const DashboardHeader = ({
  title,
  description,
  customClassName,
}: IDashboardHeaderProps) => {
  return (
    <>
      <h1 className="w-full flex justify-center font-black text-3xl mb-3 text-center">
        {title}
      </h1>
      <p className={`text-sm text-center text-default-400 ${customClassName}`}>
        {description}
      </p>
    </>
  );
};

export default DashboardHeader;
