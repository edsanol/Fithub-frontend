import SearchIcon from "@/assets/svg/SearchIcon";
import { Channel } from "@/domain/entities/Channel";
import { FormInput } from "@/presentation/components";
import { Spinner } from "@nextui-org/react";

interface ChannelListProps {
  channelsList: Channel[];
  isLoading: boolean;
  onChatClick: (channelId: number) => void;
  onTruncateText: (text: string, length: number) => string;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  onTextFilter: (value: string) => void;
}

const ChannelList = ({
  channelsList,
  isLoading,
  onChatClick,
  onTruncateText,
  onScroll,
  onTextFilter
}: ChannelListProps) => {
  return (
    <>
      <FormInput
        type="text"
        placeholder="Buscar canal..."
        customInputClass="mt-3"
        startContent={<SearchIcon />}
        size="md"
        onChange={onTextFilter}
      />
      <section
        className="mt-3 space-y-2 min-h-[50vh] max-h-[50vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800"
        onScroll={onScroll}
      >
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
                {item.lastMessage !== "" ? onTruncateText(item.lastMessage!, 30) : "No hay mensajes"}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <span className="flex justify-center w-full">
            <Spinner />
          </span>
        )}
      </section>
    </>
  );
};

export default ChannelList;
