"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

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
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{ base: "dark" }}
        size={size}
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
