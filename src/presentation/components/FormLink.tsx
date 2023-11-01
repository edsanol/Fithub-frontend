"use client";

import { Link } from "@nextui-org/react";
import React from "react";

interface FormLinkProps {
  text: string;
  href: string;
  className?: string;
}

const FormLink = ({ text, href, className }: FormLinkProps) => {
  return (
    <Link href={href} className={className || ""}>
      {text}
    </Link>
  );
};

export default FormLink;
