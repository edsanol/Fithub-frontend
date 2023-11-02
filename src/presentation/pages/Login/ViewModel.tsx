import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { isValidEmail, isValidPassword } from "@/presentation/helpers";

const ViewModel = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const router = useRouter();

  const handleValidateEmail = (email: string) => {
    if (!isValidEmail(email)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
  };

  const handleValidatePassword = (password: string) => {
    if (!isValidPassword(password)) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleValidateEmail(email);
    handleValidatePassword(password);

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      return;
    }

    router.push("/dashboard");
  };

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
