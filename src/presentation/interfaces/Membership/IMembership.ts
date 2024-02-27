export interface IMembershipValidation {
  membershipNameError: boolean;
  costError: boolean;
  durationInDaysError: boolean;
  descriptionError: boolean;
}

export type IMembershipModal = "createModal" | "detailsModal" | "deleteModal" | "editModal" | "infoModal";
