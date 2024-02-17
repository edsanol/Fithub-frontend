import { MeasurementsProgress } from "@/domain/entities/MeasurementsProgress";

export const customRenderCell = (
  record: MeasurementsProgress,
  columnKey: React.Key
) => {
  const cellValue = record[columnKey as keyof MeasurementsProgress];

  switch (columnKey) {
    case "date":
      return <p className="text-bold text-sm capitalize">{cellValue}</p>;
    case "weight":
      return <p className="text-bold text-sm capitalize">{cellValue}</p>;
    case "height":
      return <p className="text-bold text-sm capitalize">{cellValue}</p>;
    case "gluteus":
      return <p className="text-bold text-sm capitalize">{cellValue}</p>;
    case "biceps":
      return <p className="text-bold text-sm capitalize">{cellValue}</p>;
    case "chest":
      return <p className="text-bold text-sm capitalize">{cellValue}</p>;
    case "waist":
      return <p className="text-bold text-sm capitalize">{cellValue}</p>;
    case "thigh":
      return <p className="text-bold text-sm capitalize">{cellValue}</p>;
    case "calf":
      return <p className="text-bold text-sm capitalize">{cellValue}</p>;
    case "shoulders":
      return <p className="text-bold text-sm capitalize">{cellValue}</p>;
    case "forearm":
      return <p className="text-bold text-sm capitalize">{cellValue}</p>;
    // case "actions":
    //   return (
    //     <div className="relative flex items-center gap-2">
    //       <Tooltip content="Ver detalle" classNames={{ base: "dark" }}>
    //         <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
    //           <EyeIcon
    //             clickHandler={() =>
    //               handleOpenModal(user.athleteId!, "detailsModal")
    //             }
    //           />
    //         </span>
    //       </Tooltip>
    //       <Tooltip content="Editar usuario" classNames={{ base: "dark" }}>
    //         <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
    //           <EditIcon clickHandler={() => handleRedirect(user.athleteId!)} />
    //         </span>
    //       </Tooltip>
    //       {!user.endDate ||
    //       !user.startDate ||
    //       user.stateAthlete === "Inactivo" ? (
    //         <Tooltip content="Editar membresía" classNames={{ base: "dark" }}>
    //           <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
    //             <MembershipIcon
    //               clickHandler={() =>
    //                 handleOpenModal(user.athleteId!, "editMembershipModal")
    //               }
    //             />
    //           </span>
    //         </Tooltip>
    //       ) : null}
    //       <Tooltip color="danger" content="Eliminar usuario">
    //         <span className="text-lg text-danger cursor-pointer active:opacity-50">
    //           <DeleteIcon
    //             clickHandler={() =>
    //               handleOpenModal(user.athleteId!, "deleteModal")
    //             }
    //           />
    //         </span>
    //       </Tooltip>
    //     </div>
    //   );
    default:
      return cellValue;
  }
};
