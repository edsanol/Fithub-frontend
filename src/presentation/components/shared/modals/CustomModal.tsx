"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";

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
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight < 500) {
        setKeyboardOpen(true);
        document.body.style.overflow = "hidden";
      } else {
        setKeyboardOpen(false);
        document.body.style.overflow = "auto";
      }
    };
  
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleFocusIn = (event: FocusEvent) => {
      if (modalRef.current) {
        const inputElement = event.target as HTMLElement;
        const modalRect = modalRef.current.getBoundingClientRect();
        const inputRect = inputElement.getBoundingClientRect();
  
        const offset = inputRect.top - modalRect.top - 20;
  
        modalRef.current.scrollTo({
          top: modalRef.current.scrollTop + offset,
          behavior: "smooth",
        });
      }
    };
  
    const handleResize = () => {
      if (window.innerHeight < 500) {
        setKeyboardOpen(true);
        document.body.style.overflow = "hidden";
      } else {
        setKeyboardOpen(false);
        document.body.style.overflow = "auto";
      }
    };
  
    window.addEventListener("focusin", handleFocusIn);
    window.addEventListener("resize", handleResize);
  
    return () => {
      window.removeEventListener("focusin", handleFocusIn);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{base: `dark ${keyboardOpen ? "h-[90vh]" : "h-auto"}`, body: "overflow-y-auto max-h-[70vh]"}}
        size={size}
        ref={modalRef}
        placement="top-center"
        scrollBehavior={isSmallScreen ? "inside" : "outside"}
        className="modal-container"
      >
        <ModalContent className="modal-content">
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
