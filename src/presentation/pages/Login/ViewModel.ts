import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const ViewModel = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const router = useRouter();

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
