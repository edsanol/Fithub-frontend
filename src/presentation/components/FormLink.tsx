import { Link } from "@nextui-org/react";
import React from "react";

interface FormLinkProps {
  customLinkClass?: string;
  href: string;
  text: string;
}

const FormLink = ({ customLinkClass, href, text }: FormLinkProps) => {
  return (
    <Link href={href} className={customLinkClass || ""}>
      {text}
    </Link>
  );
};

export default FormLink;
