"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cipherData } from "@/config/secureData";
import Cookies from "js-cookie";

const ViewModel = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setEmailError(true);
      setPasswordError(true);
      return;
    }
    setEmailError(false);
    setPasswordError(false);

    router.push("/dashboard");
  };

  useEffect(() => {
    if (session?.user.token) {
      Cookies.set("authToken", session.user.token, { expires: 1 });
      const tokenEncrypted = cipherData(session?.user.refreshToken);
      Cookies.set("refreshToken", tokenEncrypted, { expires: 1 });
    }
  }, [session]);

  const handleSetEmail = (event: string) => {
    setEmail(event);
  };

  const handleSetPassword = (event: string) => {
    setPassword(event);
  };

  return {
    handleSubmit,
    handleSetEmail,
    handleSetPassword,
    emailError,
    passwordError,
  };
};

export default ViewModel;
