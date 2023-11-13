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
  onOpenChange: (state: boolean) => void;
  onAction?: (athleteId: number) => void;
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
  data?: any;
}

const CustomModal = ({
  isOpen,
  onOpenChange,
  onAction,
  size,
  content,
  data,
}: CustomModalProps) => {
  console.log(data);
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
                {onAction ? (
                  <Button
                    color="danger"
                    onPress={
                      onAction
                        ? () => {
                            onAction(data.athleteId);
                            onOpenChange(false);
                          }
                        : () => onOpenChange(false)
                    }
                  >
                    Si, eliminar
                  </Button>
                ) : null}
                <Button
                  color="primary"
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
