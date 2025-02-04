export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/home",
    "/create-user",
    "/dashboard",
    "/discounts",
    "/gym-profile",
    "/membership",
    "/notifications",
    "/user-list",
    "/user-progress",
    "/notifications",
    "/create-routine",
    "/routines",
    "/send-routines",
  ],
};
