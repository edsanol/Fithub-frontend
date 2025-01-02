interface MessageBubbleProps {
  message: string;
  sendAt?: string;
}

const MessageBubble = ({ message, sendAt }: MessageBubbleProps) => {
  return (
    <>
      <div className="flex flex-col items-end mb-2">
        <div className="bg-[#3669FC] text-white p-2 rounded-lg max-w-[80%] break-words">
          {message}
        </div>
        {sendAt && (
          <span className="text-xs text-gray-400 mt-1">
            {new Date(sendAt).toLocaleString()}
          </span>
        )}
      </div>
    </>
  );
};

export default MessageBubble;
