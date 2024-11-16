import { Category } from "@/domain/entities/Category";
import { MembershipByGymId } from "@/domain/models/MembershipByGymId";

export const cleanAndFormatCurrency = (
  value: number,
  locale = "es-CO",
  currency = "COP"
) => {
  const cleanValue = value.toString().replace(/[^0-9]/g, "");

  const number = parseFloat(cleanValue);
  if (isNaN(number)) {
    return "Invalid value";
  }

  return number.toLocaleString(locale, {
    style: "currency",
    currency,
  });
};

export const formatMembershipElements = (memberships: MembershipByGymId[]) => {
  return memberships.map((membership) => ({
    value: membership.membershipID,
    label: membership.membershipName,
  }));
};

export const formatCategoryElements = (categories: Category[]) => {
  return categories.map((category) => ({
    value: category.categoryId,
    label: category.categoryName,
  }));
};
