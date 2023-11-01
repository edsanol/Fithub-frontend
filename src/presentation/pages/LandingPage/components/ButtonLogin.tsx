"use client";

import { Button } from "@nextui-org/button";
import { signIn } from "next-auth/react";

const ButtonLogin = () => {
  return (
    <Button
      size="md"
      radius="sm"
      color="secondary"
      variant="bordered"
      onClick={() => signIn()}
    >
      <p className="text-white font-semibold">Inicia sesión</p>
    </Button>
  );
};
export default ButtonLogin;
