export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/create-user",
    "/dashboard",
    "/discounts",
    "/gym-profile",
    "/membership",
    "/user-list",
    "/user-progress",
  ],
};
