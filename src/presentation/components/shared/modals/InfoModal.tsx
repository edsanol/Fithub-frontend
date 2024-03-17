"use client";

import WarningIcon from "@/assets/svg/WarningIcon";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

interface CustomModalProps {
  onOpenChange: (state: boolean) => void;
  isOpen: boolean;
  message: string;
}

const CustomModal = ({ onOpenChange, isOpen, message }: CustomModalProps) => {
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
        size="2xl"
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
            <ModalBody>
              <>
                <div className="mt-3 flex flex-col justify-center">
                  <div className="mx-auto">
                    <WarningIcon />
                  </div>
                  <p className="text-lg text-center text-default-400 mt-5">
                    {message}
                  </p>
                </div>
              </>
            </ModalBody>
            <ModalFooter>
              <>
                <Button
                  color="primary"
                  variant="ghost"
                  onPress={() => onOpenChange(false)}
                >
                  Cerrar
                </Button>
              </>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
