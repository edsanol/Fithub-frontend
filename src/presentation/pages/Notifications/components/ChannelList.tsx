import { Channel } from "@/domain/entities/Channel";

interface ChannelListProps {
  channelsList: Channel[];
  onChatClick: (channelId: number) => void;
  onTruncateText: (text: string, length: number) => string;
}

const ChannelList = ({ channelsList, onChatClick, onTruncateText }: ChannelListProps) => {
  return (
    <section className="mt-3 space-y-2 min-h-[60vh] max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
      {channelsList.map((item) => (
        <div
          key={item.channelId}
          onClick={() => onChatClick(item.channelId!)}
          className="flex items-center gap-3 p-4 rounded-lg hover:bg-[#121417] cursor-pointer"
        >
          <div className="min-w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full">
            <span className="text-lg">💬</span>
          </div>
          <div className="flex-1">
            <h5 className="text-sm font-bold text-white">
              {onTruncateText(item.channelName!, 40)}
            </h5>
            <p className="text-xs text-gray-400 truncate">
              { item.lastMessage !== "" ? onTruncateText(item.lastMessage!, 30) : "No hay mensajes" }
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ChannelList;
