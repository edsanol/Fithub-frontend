import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

interface CustomModalProps {
  isOpen: boolean;
  onOpenChange: (state: boolean) => void;
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
}

const CustomModal = ({
  isOpen,
  onOpenChange,
  size,
  content,
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
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex justify-center">
                  <h1 className="text-3xl text-[#3669FC] font-black">FitHub</h1>
                </div>
              </ModalHeader>
              <ModalBody>{content}</ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="ghost"
                  onPress={() => onOpenChange(false)}
                >
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
