import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      isSuccess: string;
      message: string;
      data: any;
    };
  }
}
