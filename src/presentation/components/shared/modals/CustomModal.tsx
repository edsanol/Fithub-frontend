"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

interface CustomModalProps {
  onOpenChange: (state: boolean) => void;
  isOpen: boolean;
  size:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full";
  content: React.ReactNode;
  footerContent?: React.ReactNode;
}

const CustomModal = ({
  onOpenChange,
  isOpen,
  size,
  content,
  footerContent,
}: CustomModalProps) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{ base: "dark" }}
        size={size}
        placement="top-center"
        scrollBehavior={isSmallScreen ? "inside" : "outside"}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex justify-center">
                <h1 className="text-3xl text-[#3669FC] font-black">FitHub</h1>
              </div>
            </ModalHeader>
            <ModalBody>{content}</ModalBody>
            <ModalFooter>{footerContent}</ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
