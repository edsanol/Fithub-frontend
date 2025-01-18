import Image from "next/image";
import emoji from "@/assets/images/emoji-gray2.png";
import { useEffect, useRef } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import SendIcon from "@/assets/svg/SendIcon";

interface MessageInputProps {
  textMessage: string;
  openEmojiPicker: boolean;
  onTextMessageChange: (text: string) => void;
  onEmojiClick: (event: EmojiClickData) => void;
  onSendMessage: () => void;
  setOpenEmojiPicker: (open: boolean) => void;
}

const MessageInput = ({
  textMessage,
  openEmojiPicker,
  onTextMessageChange,
  onEmojiClick,
  onSendMessage,
  setOpenEmojiPicker,
}: MessageInputProps) => {
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setOpenEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSendMessage();
    }
  };

  const handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const target = event.target as HTMLTextAreaElement;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
  };

  return (
    <section className="flex flex-col justify-end">
      <div className="w-[98%] border-t border-gray-700 p-3 flex items-end gap-3 self-center">
        <div className="flex-1 flex items-center gap-3">
          <textarea
            placeholder="Escribe un mensaje..."
            className="flex flex-1 border-0 outline-0 p-2 rounded-lg resize-none bg-transparent text-white max-h-[50px] overflow-auto"
            value={textMessage}
            onChange={(e) => onTextMessageChange(e.target.value)}
            onKeyDown={(event) => handleKeyDown(event)}
            onInput={(event) => handleInput(event)}
          />

          <div className="flex items-center gap-2 relative">
            <button onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>
              <Image
                src={emoji}
                width={28}
                height={28}
                alt="Seleccionar emoji"
              />
            </button>
            {openEmojiPicker && (
              <div
                ref={emojiPickerRef}
                className="absolute bottom-12 right-[-90px] md:right-0 z-10"
              >
                <EmojiPicker
                  open={openEmojiPicker}
                  onEmojiClick={(event: EmojiClickData) => onEmojiClick(event)}
                />
              </div>
            )}
          </div>
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#3669FC]"
            onClick={onSendMessage}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MessageInput;
